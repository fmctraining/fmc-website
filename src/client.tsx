import { initClient, initClientNavigation } from 'rwsdk/client'

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('404')) {
    initClient()
    initClientNavigation()
  }
})
