import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { DirList } from './DirList'

export function Page() {
  return (
    <ContentLayout>
      <ContentHtml />
      <DirList />
    </ContentLayout>
  )
}
