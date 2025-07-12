import type { PageData, ParentData } from '../types'
import { parseFrontmatter } from './parse-frontmatter'
import { parseMarkdown } from './parse-markdown'
import { getDirData, getDirs } from './get-dirs'
import { IS_DEV } from 'rwsdk/constants'
import { env } from 'cloudflare:workers'
import { requestInfo } from 'rwsdk/worker'

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
    resp = await fetch(
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
  if (!resp.ok) return null
  const text = await resp.text()
  sourceMemo[path] = text
  return text
}

// get pathname for parent pages not including '/'
// uses noDir to avoid cycles
async function getParentData(path: string): Promise<ParentData[]> {
  const data: ParentData[] = []
  while (true) {
    path = path.slice(0, path.lastIndexOf('/'))
    if (path.length <= 1) break
    const parentPage = await getPageData(path, false, true)
    if (parentPage?.attrs.pathname) {
      data.unshift({ path, name: parentPage.attrs.pathname })
    }
  }
  return data
}

// Return unstyled HTML content for a page
// Fetches and parses markdown from source, if not cached.
export async function getPageData(
  path: string,
  noCache: boolean = false,
  noDir: boolean = false
): Promise<PageData | null> {
  const isHome = path === '/'

  if (!noCache) {
    if (isHome && homePage) return homePage
    const cachedContent = await env.PAGEDATA_CACHE.get(path)
    if (cachedContent !== null) return JSON.parse(cachedContent) as PageData
  }

  const sourceText = await getSourceText(path, noCache)
  if (!sourceText) return null
  const parsedFrontmatter = parseFrontmatter(sourceText)
  const attrs = parsedFrontmatter.attrs
  const dirData = noDir ? undefined : await getDirData(path, attrs.sortby || 'sort', attrs.sortreverse)
  const parentData = await getParentData(path)
  const pageData = {
    path,
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

  const pageHasNoDirs = (await getDirs())[path]?.length === 0
  if (!noDir || pageHasNoDirs) {
    requestInfo.cf.waitUntil(env.PAGEDATA_CACHE.put(path, JSON.stringify(pageData)))
  }
  if ((!noDir || pageHasNoDirs) && isHome) {
    homePage = pageData
  }
  return pageData
}

function errorHtml(error: unknown, path: string) {
  return `<pre>${escapeHtml(path)}\n${escapeHtml('' + error)}</pre>`
}

function escapeHtml(s: string) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
}
