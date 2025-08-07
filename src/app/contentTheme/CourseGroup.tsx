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
        <div className="flex flex-col gap-6 mt-8">
          {pageData?.dir?.map((courseData, index) => (
            <a
              href={courseData.path}
              className={`group block border-4 rounded-2xl hover:bg-black/60 hover:shadow-lg hover:shadow-blue-400/30 ${
                borderColors[index % borderColors.length]
              } p-6 intersect intersect-once opacity-0`}
              key={courseData.path}
            >
              <div className="flex items-start gap-4">
                {courseData.attrs?.image && (
                  <img
                    src={courseData.attrs.image}
                    alt={courseData.attrs?.name || courseData.attrs?.title || courseData.path}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold ${
                      textColors[index % textColors.length]
                    } mb-2 group-hover:underline group-active:underline`}
                  >
                    {courseData.attrs?.name || courseData.attrs?.title || courseData.path}
                  </h3>
                  {courseData.attrs?.['meta-description'] && (
                    <p className="text-gray-300 text-sm">{courseData.attrs['meta-description']}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </ContentLayout>
  )
}
