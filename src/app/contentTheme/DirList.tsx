import { requestInfo as r } from 'rwsdk/worker'

export function DirList() {
  const pageData = r.ctx.pageContext?.pageData
  return pageData?.dir ? (
    <ul className="max-w-3xl m-auto">
      {pageData.dir.map((d) => (
        <li key={d.path} className="triangle-yellow text-lg py-1 my-4">
          <a href={d.path} className="hover:underline">
            {d.attrs?.name || d.attrs?.title || d.path}
          </a>
        </li>
      ))}
    </ul>
  ) : null
}
