import { getPagePaths } from './markdown/get-dirs'
import { getManifest } from './manifest'
import { getPageData } from './markdown/get-markdown'
import { getStatic } from './static'
import { getRedirects } from './redirects'
import { type ContentPageContext } from './types'
import { type RequestInfo } from 'rwsdk/worker'
import { match } from '@/lib/match'
import { getCourses } from './courses'

export type contentMiddlewareOptions = {
  ignore?: string | string[]
}

function acceptRaw(accept: string | null) {
  if (!accept) return false
  accept = accept.toLowerCase()

  const html = accept.indexOf('text/html')
  const plain = accept.indexOf('text/plain')
  const markdown = accept.indexOf('text/markdown')

  if (plain === -1 && markdown === -1) return false
  if (html === -1 || (html > plain && html > markdown)) return true
  return false
}

export const contentMiddleware = ({ ignore }: contentMiddlewareOptions = {}) => {
  return async ({ request, ctx }: RequestInfo): Promise<Response | void> => {
    const noCacheRead =
      request.headers.get('cache-control')?.includes('no-cache') || request.headers.get('pragma')?.includes('no-cache')
    const url = new URL(request.url)
    const prefersRaw = url.searchParams.has('raw') || acceptRaw(request.headers.get('accept'))
    const pathname = url.pathname
    const search = url.search

    if (match(pathname, ignore)) return

    // redirect trailing slashes
    // TODO: should be configurable
    if (pathname.endsWith('/') && pathname.length > 1) {
      return Response.redirect(url.origin + pathname.slice(0, -1) + search, 301)
    }

    // serve static content from manifest
    // only bypass manifest cache when reloading the home page
    const isHome = pathname === '/'
    const manifest = await getManifest(noCacheRead && isHome)
    if (manifest.includes(pathname)) {
      const resp = await getStatic(pathname, noCacheRead)
      if (resp) {
        console.log('static', pathname)
        return resp
      }
    }

    // redirects take precedence over markdown pages
    const redirects = await getRedirects()
    if (pathname in redirects) {
      return Response.redirect(url.origin + redirects[pathname].redirect + search, redirects[pathname].status)
    }
    const pagePaths = await getPagePaths()
    const courseData = await getCourses(noCacheRead && isHome)

    const pageContext: ContentPageContext = {
      pathname,
      pageData: pathname in pagePaths ? (await getPageData({ path: pathname, noCacheRead })) || undefined : undefined,
      dirData:
        pathname.startsWith('/press/') && '/press' in pagePaths
          ? (await getPageData({ path: '/press' }))?.dir?.find((p) => p.path === pathname)
          : undefined,
      siteData: '/' in pagePaths ? (await getPageData({ path: '/' }))?.attrs : undefined,
      courseData
    }
    if (url.searchParams.has('json')) return Response.json(pageContext)
    if (prefersRaw) {
      // imperfect raw rendering - does not include /terms /press etc.
      let markdown = ''
      if (pageContext.pageData?.attrs?.name || pageContext.pageData?.attrs?.title) {
        markdown += '# ' + (pageContext.pageData?.attrs?.name || pageContext.pageData?.attrs?.title) + '\n\n'
      }
      if (pageContext.pageData?.md) {
        markdown += pageContext.pageData.md
      }
      if (pageContext.pageData?.attrs?.classes?.length) {
        markdown +=
          '\n\n### classes\n' +
          pageContext.pageData.attrs.classes.map((entry) => `- [${entry.name}](${entry.href})`).join('\n')
      }
      if (pageContext.pageData?.dir?.length) {
        markdown +=
          '\n\n### links\n' +
          pageContext.pageData.dir.map((entry) => `- [${entry.attrs?.title || entry.path}](${entry.path})`).join('\n')
      }
      if (pageContext.pageData?.attrs?.footer?.links.length) {
        markdown += '\n\n ### links\n' +
        pageContext.pageData.attrs.footer.links.map((entry) => `- [${entry.text}](${entry.href})`).join('\n')
      }
      if (pageContext.pageData?.attrs?.footer?.social?.length) {
        markdown += '\n\n ### social\n' +
        pageContext.pageData.attrs.footer.social.map((entry) => `- [${entry.text}](${entry.href})`).join('\n')
      }
      if (pageContext.siteData?.footer?.terms?.length) {
        markdown += '\n\n ### terms\n' +
        pageContext.siteData.footer.terms.map((entry) => `- [${entry.text}](${entry.href})`).join('\n')
      }
      return markdown ? new Response(markdown) : new Response('not found', { status: 404 })
    }
    ctx.pageContext = pageContext
  }
}
