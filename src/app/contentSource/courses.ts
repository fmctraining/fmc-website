import type { CourseData } from './types'
import { requestInfo } from 'rwsdk/worker'
import { env } from 'cloudflare:workers'

const coursesCacheKey = 'fmc-courses'

let coursesMemo: null | CourseData[] = null

export function zapCoursesCache() {
  coursesMemo = null
}

// Fetch array of course data from source
export async function getCourses(noCache: boolean = false): Promise<CourseData[]> {
  let courses: CourseData[] = []

  if (!noCache) {
    if (coursesMemo) return coursesMemo

    const cachedContent = await env.PAGEDATA_CACHE.get(coursesCacheKey)
    if (cachedContent !== null) {
      coursesMemo = JSON.parse(cachedContent) as CourseData[]
      return coursesMemo
    }
  }

  const url = 'https://www.fmctraining.com/fmc/courses.json'
  const resp = await fetch(url)
  if (resp.ok) {
    // TODO: validate json
    courses = (await resp.json()) as CourseData[]
    courses.forEach(c => {
      c.duration = formatDuration(c.duration)
    })
    console.log('getCourses', url, 'ok', courses.length, 'courses')
  } else {
    console.error('getCourses', url, resp.status, resp.statusText)
  }

  if (courses?.length) {
    coursesMemo = courses
    requestInfo.cf.waitUntil(env.PAGEDATA_CACHE.put(coursesCacheKey, JSON.stringify(courses)))
  } else {
    courses = []
  }
  return courses
}

function formatDuration(d?: string) {
  if (!d) return undefined
  const num = Number(d)
  return (num > 1 || num < 1) ? d + ' days'
       : num == 1  ? '1 day'
       : d;
}
