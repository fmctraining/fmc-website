import { requestInfo as r } from 'rwsdk/worker'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { HomeBanner } from './HomeBanner'
import { Breadcrumbs } from './Breadcrumbs'
import { Footer } from './Footer'

export function ContentLayout({ children }: { children: React.ReactNode }) {
  const path = new URL(r.request.url).pathname
  const isHome = path === '/'
  return (
    <div className="max-w-[1300px] mx-auto overflow-x-hidden">
      <Metadata />
      <Menu />
      {isHome ? <HomeBanner /> : <Breadcrumbs />}
      <div className="hidden md:motion-reduce:block absolute top-0 right-0 text-xs text-gray-300 uppercase">Reduced motion</div>
      <main className="mx-2 min-h-[69vh]">{children}</main>
      <Footer />
    </div>
  )
}
