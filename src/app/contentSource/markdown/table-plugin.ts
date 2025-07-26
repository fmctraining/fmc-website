import type MarkdownIt from 'markdown-it'

export function tablePlugin(md: MarkdownIt) {
  const tableOpen =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  const tableClose =
    md.renderer.rules.table_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return '<div class="overflow-x-auto">\n' + tableOpen(tokens, idx, options, env, self)
  }

  md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    return tableClose(tokens, idx, options, env, self) + '\n</div>'
  }
}
