import markdownit from 'markdown-it'
import markdownitAnchor from 'markdown-it-anchor'
import { Options, imagePlugin } from './image-plugin'

export function parseMarkdown(s: string, options: Options = {}) {
  const md = markdownit({
    linkify: true,
    html: true
  })
    .use(imagePlugin, options)
    .use(markdownitAnchor, {
      permalink: false,
      tabIndex: false,
      level: [1, 2, 3]
    })
  return md.render(s)
}
