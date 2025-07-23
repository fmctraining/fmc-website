import { defineApp } from 'rwsdk/worker'
import { Document } from './app/Document'
import { render, route } from 'rwsdk/router'

import type { ContentPageContext } from './app/contentSource/types'
import { contentMiddleware } from './app/contentSource/contentMiddleware'
import { ContentTheme } from './app/contentTheme/ContentTheme'
import { contentApiRoutes } from './app/contentSource/api-routes'

export type AppContext = {
  pageContext?: ContentPageContext
}

const app = defineApp([
  contentMiddleware({ ignore: ['/api/', '/server/', '/admin/'] }),
  contentApiRoutes,
  render(Document, [route('*', [ContentTheme])])
])

export default {
  fetch: app.fetch
}
