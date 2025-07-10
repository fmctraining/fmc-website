import { requestInfo as r } from 'rwsdk/worker'

export function DirList() {
  const pageData = r.ctx.pageContext?.pageData
  return pageData?.dir ? (
    <ul>
      {pageData.dir.map((d) => (
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
    </ul>
  ) : null
}
