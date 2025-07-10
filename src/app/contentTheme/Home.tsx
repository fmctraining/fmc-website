import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

export function Home() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <ContentLayout>
      <ContentHtml />
      {pageData?.dir &&
        pageData.dir.map((d) => (
          <p key={d.path} className='leading-8'>
            <a href={d.path} className="hover:underline">
              {d.path}
            </a>{' '}
            <a href={d.path + '?json='} className="text-blue-500 hover:underline">
              json
            </a>{' '}
            <span className="text-xs text-gray-500">{d.attrs?.layout || 'no-layout'}</span>
          </p>
        ))}
    </ContentLayout>
  )
}
