'use client'

import { useLayoutEffect } from 'react'

// https://discord.com/channels/679514959968993311/679514959968993476/1396963062111797328
export function ScrollToTop() {
  useLayoutEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    let popStateWasCalled = false

    const observer = new MutationObserver(() => {
      if (!popStateWasCalled) {
        window.scrollTo(0, 0)
      }
      popStateWasCalled = false
      // Force reflow to restart the swoop animation
      main.classList.remove('swoop')
      void main.offsetWidth
      main.classList.add('swoop')
    })

    function handlePopState() {
      popStateWasCalled = true
    }

    window.addEventListener('popstate', handlePopState)
    observer.observe(main, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('popstate', handlePopState)
      observer.disconnect()
    }
  }, [])

  return null
}
