import { initClient, initClientNavigation } from 'rwsdk/client'

if (!document.getElementById('404')) {
  const { handleResponse } = initClientNavigation()
  initClient({ handleResponse })
}
