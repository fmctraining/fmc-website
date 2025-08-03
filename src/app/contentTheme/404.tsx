import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { ButtonLink } from './ButtonLink'

// h1 #id is set to 404 to signal client.tsx not to run initClient
// See https://github.com/redwoodjs/sdk/issues/568#issuecomment-3038822673
export function NotFound() {
  const url = new URL(r.request.url)
  return (
    <ContentLayout>
      <div className="prose prose-invert mx-auto max-w-3xl text-center">
        <h1>Page not found</h1>
        <p className="text-xl">{url.origin + url.pathname}</p>
        <ButtonLink href="/" text="Courses Home" />
      </div>
    </ContentLayout>
  )
}
