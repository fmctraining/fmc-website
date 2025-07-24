'use client'

import { unstable_ViewTransition as ViewTransition } from 'react'

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition>
      <main className="mx-2 min-h-[69vh]">{children}</main>
    </ViewTransition>
  )
}
