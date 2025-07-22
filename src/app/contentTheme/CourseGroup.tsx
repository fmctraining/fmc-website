import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

const borderColors = ['border-green-300', 'border-cyan-300', 'border-violet-300']
const textColors = ['text-green-200', 'text-cyan-200', 'text-violet-200']

export function CourseGroup() {
  const pageData = r.ctx.pageContext?.pageData

  return (
    <ContentLayout>
      <ContentHtml />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">{pageData?.attrs?.name || pageData?.attrs?.title} Courses</h1>
        <ul className={`rounded-2xl mt-2 ${textColors[2]} italic px-3 py-2 text-xl`}>
          {pageData?.dir?.map((courseData) => (
            <li className="triangle-pink py-1" key={courseData.path}>
              <a href={courseData.path} className="hover:underline decoration-2">
                {courseData.attrs?.name || courseData.attrs?.title || courseData.path}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ContentLayout>
  )
}
