import { getPagePaths } from './markdown/get-dirs'
import { getManifest } from './manifest'
import { getPageData } from './markdown/get-markdown'
import { getStatic } from './static'
import { getRedirects } from './redirects'
import { type ContentPageContext } from './types'
import { type RequestInfo } from 'rwsdk/worker'
import { match } from '@/lib/match'

export type contentMiddlewareOptions = {
  ignore?: string | string[]
}

export const contentMiddleware = ({ ignore }: contentMiddlewareOptions = {}) => {
  return async ({ request, ctx }: RequestInfo): Promise<Response | void> => {
    const noCacheRead =
      request.headers.get('cache-control')?.includes('no-cache') || request.headers.get('pragma')?.includes('no-cache')
    const url = new URL(request.url)
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
    const pageContext: ContentPageContext = {
      pathname,
      pageData: pathname in pagePaths ? (await getPageData({ path: pathname, noCacheRead })) || undefined : undefined,
      dirData:
        pathname.startsWith('/press/') && '/press' in pagePaths
          ? (await getPageData({ path: '/press' }))?.dir?.find((p) => p.path === pathname)
          : undefined,
      siteData: '/' in pagePaths ? (await getPageData({ path: '/' }))?.attrs : undefined
    }
    if (url.searchParams.has('json')) return Response.json(pageContext)
    ctx.pageContext = pageContext
  }
}
