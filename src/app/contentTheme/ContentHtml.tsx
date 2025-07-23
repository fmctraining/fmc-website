import { requestInfo as r } from 'rwsdk/worker'
import { Prose } from './Prose'

export function ContentHtml() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <Prose>
      <div dangerouslySetInnerHTML={{ __html: pageData?.html ?? '[empty page]' }} />
    </Prose>
  )
}
