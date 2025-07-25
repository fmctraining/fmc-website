'use client'

import { useLayoutEffect } from 'react'

// https://discord.com/channels/679514959968993311/679514959968993476/1396963062111797328
export function ScrollToTop() {
  useLayoutEffect(() => {
    let popStateWasCalled = false

    const observer = new MutationObserver(() => {
      if (!popStateWasCalled) {
        const main = document.querySelector('main')
        if (main) {
          main.classList.remove('swoop')
          // Force reflow to restart the animation
          void main.offsetWidth
          main.classList.add('swoop')
        }
        window.scrollTo(0, 0)
      }
      popStateWasCalled = false
    })

    function handlePopState() {
      popStateWasCalled = true
    }

    const main = document.querySelector('main')

    if (main) {
      window.addEventListener('popstate', handlePopState)
      observer.observe(main, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
      observer.disconnect()
    }
  }, [])

  return null
}
