import { requestInfo as r } from 'rwsdk/worker'

export function ContentHtml() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <div
      className="prose prose-lg prose-invert prose-headings:text-primary prose-h1:font-semibold prose-h1:italic prose-p:text-white prose-li:text-white prose-hr:border-primary prose-hr:my-2 max-w-none"
      dangerouslySetInnerHTML={{ __html: pageData?.html ?? '[empty page]' }}
    />
  )
}
