import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

const borderColors = ['border-green-300', 'border-cyan-300', 'border-violet-300']
const textColors = ['text-green-200', 'text-cyan-200', 'text-violet-200']

export function Home() {
  const pageData = r.ctx.pageContext?.pageData

  return (
    <ContentLayout>
      <ContentHtml />
      <h1 className="max-w-4xl m-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Future Media Courses</h1>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {pageData?.attrs?.classes?.map((classData, index) => (
          <div
            className={`w-full ms:w-sm border-4 rounded-2xl hover:bg-black/30 ${
              borderColors[index % borderColors.length]
            } p-4 intersect intersect-once opacity-0`}
            key={index}
          >
            <h2
              className={`text-3xl ${textColors[index % textColors.length]} italic uppercase tracking-wider font-bold`}
            >
              {classData.href ? (
                <a href={classData.href} className="block hover:underline active:underline decoration-2">
                  {classData.name}
                </a>
              ) : (
                classData.name
              )}
            </h2>
            <ul
              className={`rounded-2xl mt-2 ${textColors[index % textColors.length]} italic px-3 py-2 max-w-sm text-xl`}
            >
              {classData.groups.map((groupData) => (
                <li className="triangle-pink py-1" key={groupData.href}>
                  <a href={groupData.href} className="block hover:underline active:underline decoration-2">
                    {groupData.name}
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
