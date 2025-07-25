'use client'

import { useLayoutEffect } from 'react'

// https://discord.com/channels/679514959968993311/679514959968993476/1396963062111797328
export function ScrollToTop() {
  useLayoutEffect(() => {
    let popStateWasCalled = false

    const observer = new MutationObserver(() => {
      // avoid scrolling to top after popstate events
      if (!popStateWasCalled) {
        // TODO: remove console.log
        console.log('scroll to top')
        window.scrollTo(0, 0)
      }
      popStateWasCalled = false
    })

    const main = document.querySelector('main')

    if (main) {
      window.addEventListener('popstate', () => (popStateWasCalled = true))
      observer.observe(main, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  return null
}
