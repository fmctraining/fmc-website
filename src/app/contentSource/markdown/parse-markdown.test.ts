import { expect, test } from 'vitest'
import { parseMarkdown } from './parse-markdown'

const markdown = `# markdown header
paragraph 1

paragraph 2
![alt text](https://example.com/image.png)
`

const expectedResult = `<h1 id="markdown-header">markdown header</h1>
<p>paragraph 1</p>
<p>paragraph 2
<img src="/img/1xzq9lwjinar8?og=https%3A%2F%2Fexample.com%2Fimage.png" alt="alt text"></p>
`

test('parseMarkdown', {}, () => {
  let actual = parseMarkdown(markdown)
  // console.log(actual)
  expect(actual).toEqual(expectedResult)
})

test('table plugin wraps tables in scrollable div', () => {
  const markdown = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`

  const result = parseMarkdown(markdown)

  expect(result).toContain('<div class="overflow-x-auto">')
  expect(result).toContain('<table>')
  expect(result).toContain('</table>')
  expect(result).toContain('</div>')

  // Verify the div wraps the entire table
  const divStartIndex = result.indexOf('<div class="overflow-x-auto">')
  const tableStartIndex = result.indexOf('<table>')
  const tableEndIndex = result.indexOf('</table>')
  const divEndIndex = result.indexOf('</div>')

  expect(divStartIndex).toBeLessThan(tableStartIndex)
  expect(tableEndIndex).toBeLessThan(divEndIndex)
})
