import { type RequestInfo, renderToStream } from 'rwsdk/worker'
import { Document } from '@/app/Document'
import { NotFound } from './404'
import { Page } from './Page'
import { Home } from './Home'
import { Course } from './Course'
import { CourseGroup } from './CourseGroup'
import { Vendor } from './Vendor'
import { UpcomingClasses } from './UpcomingClasses'

export async function ContentTheme({ ctx, request }: RequestInfo) {
  const pageData = ctx.pageContext?.pageData
  const layout = pageData?.attrs?.layout
  if (pageData) {
    switch (layout) {
      case 'home':
        return <Home />
      case 'vendor':
        return <Vendor />
      case 'group':
        return <CourseGroup />
      case 'course':
        return <Course />
      case 'location':
        return <UpcomingClasses />
      default:
        return <Page />
    }
  } else {
    // TODO: replace with requestInfo.status = 404 when available
    // https://github.com/redwoodjs/sdk/issues/568
    console.log(`404: ${request.url}`)
    const url = new URL(request.url)
    if (url.searchParams.has('__rsc')) {
      return <NotFound />
    }
    return new Response(await renderToStream(<NotFound />, { Document }), {
      status: 404
    })
  }
}
