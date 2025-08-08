// @ts-nocheck
import { initClient, initClientNavigation } from 'rwsdk/client'

initClient()

const Observer = {
  observer: null,
  delayBetweenAnimations: 100,
  animationCounter: 0,
  reducedMotion: window?.matchMedia('(prefers-reduced-motion: reduce)').matches,

  start() {
    const elements = Array.from(document.querySelectorAll('.intersect-animate'))
    elements.forEach((el) => {
      el.setAttribute('data-wait-for-animation', '')
    })
    console.log('intersect-animate', elements.length, 'elements')
    const callback = (entries) => {
      entries.forEach((entry) => {
        requestAnimationFrame(() => {
          const target = entry.target

          if (entry.intersectionRatio >= 0.25) {
            if (!target.hasAttribute('data-animated')) {
              console.log('intersect-animate', this.animationCounter)
              target.removeAttribute('data-wait-for-animation')
              target.setAttribute('data-animated', 'true')

              const delay = this.animationCounter++ * this.delayBetweenAnimations
              target.style.animationDelay = `${delay}ms`
              // only animate once
              this.observer.unobserve(target)
            }
          } else {
            target.setAttribute('data-wait-for-animation', '')
            target.removeAttribute('data-animated')
            target.style.transitionDelay = ''
            target.style.animationDelay = ''

            this.animationCounter = 0
          }
        })
      })
    }

    this.observer = new IntersectionObserver(callback.bind(this), { threshold: [0, 0.25, 0.5, 0.99] })

    elements.forEach((el) => {
      this.observer.observe(el)
    })
  }
}

if (!Observer.reducedMotion) {
  Observer.start()
} else {
  console.log('reduced motion')
}
