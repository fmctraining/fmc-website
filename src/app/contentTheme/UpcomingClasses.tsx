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
                  <a
                    href={course.page}
                    className="inline-block no-underline hover:underline active:underline decoration-2 font-semibold text-accent"
                  >
                    {course.name}
                  </a>
                  {course.duration && <span className="ml-2 text-sm font-normal text-gray-300">{course.duration}</span>}
                </h4>
                {course.sched &&
                  course.sched.map((location) => (
                    <div key={location.l}>
                      <span className="mr-2">{location.l}:</span>{' '}
                      {location.s.map((schedule, index) => (
                        <span key={index}>
                          <a
                            href={course.page}
                            className="inline-block text-sm text-slate-200 no-underline hover:underline active:underline decoration-2"
                          >
                            {schedule.d}
                          </a>
                          {schedule.k && <span className="text-sm"> {schedule.k}</span>}
                          {index < location.s.length - 1 && ', '}
                        </span>
                      ))}
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
