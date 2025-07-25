import { requestInfo as r } from 'rwsdk/worker'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { HomeBanner } from './HomeBanner'
import { Breadcrumbs } from './Breadcrumbs'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function ContentLayout({ children }: { children: React.ReactNode }) {
  const path = new URL(r.request.url).pathname
  const isHome = path === '/'
  return (
    <div className="max-w-[1300px] mx-auto overflow-x-hidden">
      <Metadata />
      <Menu />
      {isHome ? <HomeBanner /> : <Breadcrumbs />}
      <main className="mx-2 min-h-[69vh] swoop">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
