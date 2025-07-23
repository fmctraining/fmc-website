import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { Prose } from './Prose'
import { groupby } from '@/lib/groupby'

export function UpcomingClasses() {
  const pageData = r.ctx.pageContext?.pageData
  const title = pageData?.attrs?.name || pageData?.attrs?.title || 'Upcoming Classes'

  const courseData = r.ctx.pageContext?.courseData
  const byGroup = groupby(courseData, 'groupname', (course) => !!course.sched)
  const groupNames = Object.keys(byGroup)

  return (
    <ContentLayout>
      <h1 className="max-w-3xl m-auto text-3xl sm:text-4xl md:text-5xl">{title}</h1>
      <ContentHtml />
      <Prose>
        {groupNames.map((groupname) => (
          <div key={groupname} className="">
            <hr className="mt-8!" />
            <h3 className="text-white!">{groupname}</h3>
            {byGroup[groupname].map((course) => (
              <div key={course.courseid} className="">
                <h4 className="mb-0!">
                  {course.name}
                  {course.duration && <span className="ml-2 text-sm font-normal text-gray-300">{course.duration}</span>}
                </h4>
                {course.sched &&
                  course.sched.map((s) => (
                    <div key={s.l}>
                      <span className="text-sm">{s.l}:</span> {s.s.map((s) => s.d).join(', ')}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </Prose>
    </ContentLayout>
  )
}
