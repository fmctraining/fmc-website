// @ts-nocheck
import { initClient, initClientNavigation } from 'rwsdk/client'

initClient()
// initClientNavigation()

// initClientNavigation(({
//   onNavigate: () => Observer.start()
// })

const Observer = {
  observer: null,
  delayBetweenAnimations: 100,
  animationCounter: 0,

  start() {
    const elements = Array.from(document.querySelectorAll('.intersect'))

    elements.forEach((el) => {
      el.setAttribute('no-intersect', '')
    })

    const callback = (entries) => {
      entries.forEach((entry) => {
        requestAnimationFrame(() => {
          const target = entry.target
          const intersectionRatio = entry.intersectionRatio
          const threshold = 0.25

          if (intersectionRatio >= threshold) {
            if (!target.hasAttribute('data-animated')) {
              target.removeAttribute('no-intersect')
              target.setAttribute('data-animated', 'true')

              const delay = this.animationCounter * this.delayBetweenAnimations
              this.animationCounter++

              target.style.transitionDelay = `${delay}ms`
              target.style.animationDelay = `${delay}ms`

              if (target.classList.contains('intersect-once')) {
                this.observer.unobserve(target)
              }
            }
          } else {
            target.setAttribute('no-intersect', '')
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

Observer.start()
