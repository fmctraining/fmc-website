import { requestInfo } from 'rwsdk/worker'
import { NotFound } from './404'
import { Page } from './Page'
import { Home } from './Home'
import { Course } from './Course'
import { CourseGroup } from './CourseGroup'
import { Vendor } from './Vendor'
import { UpcomingClasses } from './UpcomingClasses'

export async function ContentTheme() {
  const pageData = requestInfo.ctx.pageContext?.pageData
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
    requestInfo.response.status = 404
    return requestInfo.request.method === 'GET' ? <NotFound /> : new Response('Not found', { status: 404 })
  }
}
