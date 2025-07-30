import type { PageData, ParentData } from '../types'
import { parseFrontmatter } from './parse-frontmatter'
import { parseMarkdown } from './parse-markdown'
import { getDirData, getDirs } from './get-dirs'
import { IS_DEV } from '@/lib/dev'
import { env } from 'cloudflare:workers'
import { requestInfo } from 'rwsdk/worker'
import pLimit from 'p-limit'

const limit = pLimit(10)

// memoize to speed up homeContent().attrs for Nav
let homePage: PageData | null = null

let sourceMemo: Record<string, string> = {}

async function filePath(path: string): Promise<string> {
  let dirs = await getDirs()
  if (path in dirs) {
    path += (path === '/' ? '' : '/') + 'index'
  }
  return `${path}.md`
}

async function queuedFetch(url: string, options: RequestInit): Promise<Response> {
  return limit(() => fetch(url, options))
}

async function getSourceText(path: string, noCache: boolean = false): Promise<string | null> {
  if (!noCache && path in sourceMemo) return sourceMemo[path]
  const filepath = await filePath(path)
  let resp: Response
  let source = 'github'
  if (IS_DEV && !env.GH_TEST) {
    const origin = new URL(requestInfo.request.url).origin
    source = `_content`
    resp = await fetch(`${origin}/${source}${filepath}`)
  } else {
    // https://docs.github.com/en/rest/repos/contents
    resp = await queuedFetch(
      `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/${env.GH_PATH}${filepath}?ref=${env.GH_BRANCH}`,
      {
        headers: {
          Accept: 'application/vnd.github.raw+json',
          Authorization: `Bearer ${env.GH_PAT}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'fmc-website-worker'
        }
      }
    )
  }
  console.log('getSourceText', path, source, resp.status)
  if (!resp.ok) return null
  const text = await resp.text()
  sourceMemo[path] = text
  return text
}

// get pathname for parent pages not including '/'
async function getParentData(path: string): Promise<ParentData[]> {
  const data: ParentData[] = []
  while (true) {
    path = path.slice(0, path.lastIndexOf('/'))
    if (path.length <= 1) break
    const parentPage = await getPageData({ path, noDir: true })
    if (parentPage?.attrs.pathname) {
      data.unshift({ path, name: parentPage.attrs.pathname })
    }
  }
  return data
}

function max(a: number, b: number) {
  return a > b ? a : b
}

// Return unstyled HTML content for a page
// Fetches and parses markdown from source, if not cached.
export async function getPageData(opts: {
  path: string
  noCacheRead?: boolean
  noDir?: boolean
  dirDepth?: number
}): Promise<PageData | null> {
  let { path, noCacheRead = false, noDir = false, dirDepth = 0 } = opts
  const isHome = opts.path === '/'

  if (!noCacheRead) {
    if (isHome && homePage) return homePage
    const cachedContent = await env.PAGEDATA_CACHE.get(opts.path)
    if (cachedContent !== null) {
      console.log('getPageData: from cache', opts.path)
      return JSON.parse(cachedContent) as PageData
    }
  }

  const sourceText = await getSourceText(opts.path, noCacheRead)
  if (!sourceText) return null
  const parsedFrontmatter = parseFrontmatter(sourceText)
  const attrs = parsedFrontmatter.attrs
  dirDepth = max(attrs.dirDepth ?? 0, dirDepth)
  const dirData =
    dirDepth > 0 && !noDir
      ? await getDirData({
          dirPath: opts.path,
          dirDepth: max(dirDepth - 1, 0),
          sortBy: attrs.sortby || 'sort',
          reverse: attrs.sortreverse
        })
      : undefined
  const parentData = await getParentData(opts.path)
  const pageData = {
    path: opts.path,
    attrs,
    md: parsedFrontmatter.body,
    html: attrs.error
      ? errorHtml(attrs.error, await filePath(path))
      : parseMarkdown(parsedFrontmatter.body, {
          hashPrefix: env.IMAGE_KEY
        }),
    dir: dirData,
    crumbs: parentData
  }

  if (dirDepth === 0 || !noDir) {
    requestInfo.cf.waitUntil(env.PAGEDATA_CACHE.put(opts.path, JSON.stringify(pageData)))
    if (isHome) {
      homePage = pageData
    }
  }
  console.log('getPageData: from source', opts.path)
  return pageData
}

function errorHtml(error: unknown, path: string) {
  return `<pre>${escapeHtml(path)}\n${escapeHtml('' + error)}</pre>`
}

function escapeHtml(s: string) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
}
