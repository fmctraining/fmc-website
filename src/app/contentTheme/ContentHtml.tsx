import { requestInfo as r } from 'rwsdk/worker'

export function ContentHtml() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <div className="prose sm:prose-lg prose-invert sm:p-4 prose-headings:text-accent prose-h1:text-white prose-h1:font-semibold prose-h1:italic prose-p:text-white prose-li:text-white prose-hr:border-primary prose-hr:my-2 max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: pageData?.html ?? '[empty page]' }}
      />
    </div>
  )
}
