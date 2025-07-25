import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

const borderColors = ['border-green-300', 'border-cyan-300', 'border-violet-300']
const textColors = ['text-green-200', 'text-cyan-200', 'text-violet-200']

export function Vendor() {
  const pageData = r.ctx.pageContext?.pageData

  return (
    <ContentLayout>
      <h1 className="text-3xl sm:text-4xl md:text-5xl">{pageData?.attrs?.pathname || pageData?.attrs?.name} Courses</h1>
      <ContentHtml />
      <div className="flex flex-col items-center gap-8">
        {pageData?.dir?.map((groupData, index) => (
          <div
            className={`w-full md:max-w-3xl border-4 rounded-2xl hover:bg-black/30 ${borderColors[index % borderColors.length]} p-4`}
            key={groupData.path}
          >
            <h2
              className={`text-3xl ${textColors[index % textColors.length]} italic uppercase tracking-wider font-bold`}
            >
              <a href={groupData.path} className="hover:underline active:underline decoration-2">
                {groupData.attrs?.name || groupData.attrs?.title || groupData.path}
              </a>
            </h2>
            <ul className={`rounded-2xl mt-2 ${textColors[index % textColors.length]} italic px-3 py-2 text-xl`}>
              {groupData.dir?.map((courseData) => (
                <li className="triangle-pink py-1" key={courseData.path}>
                  <a href={courseData.path} className="hover:underline active:underline decoration-2">
                    {courseData.attrs?.name || courseData.attrs?.title || courseData.path}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentLayout>
  )
}
