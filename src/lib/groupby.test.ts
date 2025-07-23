import { groupby } from './groupby'
import { describe, it, expect } from 'vitest'

describe('groupby', () => {
  it('groups objects by keyProp', () => {
    const arr = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 }
    ]
    expect(groupby(arr, 'type')).toEqual({
      a: [
        { type: 'a', value: 1 },
        { type: 'a', value: 3 }
      ],
      b: [{ type: 'b', value: 2 }]
    })
  })

  it('returns empty object for undefined or empty array', () => {
    expect(groupby(undefined, 'type')).toEqual({})
    expect(groupby([], 'type')).toEqual({})
  })

  it('ignores objects with undefined keyProp', () => {
    const arr = [{ type: 'a', value: 1 }, { value: 2 }, { type: undefined, value: 3 }]
    expect(groupby(arr, 'type')).toEqual({
      a: [{ type: 'a', value: 1 }]
    })
  })

  it('applies filterFn before grouping', () => {
    const arr = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 }
    ]
    const filterFn = (obj: { value: number }) => obj.value > 1
    expect(groupby(arr, 'type', filterFn)).toEqual({
      a: [{ type: 'a', value: 3 }],
      b: [{ type: 'b', value: 2 }]
    })
  })

  it('handles keyProp values that are empty strings or falsy', () => {
    const arr = [
      { type: '', value: 1 },
      { type: 0, value: 2 },
      { type: false, value: 3 },
      { type: null, value: 4 },
      { type: undefined, value: 5 }
    ]
    // Only the empty string is a string, but is falsy, so should be ignored
    expect(groupby(arr, 'type')).toEqual({})
  })

  it('handles objects with extra properties', () => {
    const arr = [
      { type: 'a', value: 1, extra: true },
      { type: 'a', value: 2, extra: false }
    ]
    expect(groupby(arr, 'type')).toEqual({
      a: [
        { type: 'a', value: 1, extra: true },
        { type: 'a', value: 2, extra: false }
      ]
    })
  })
})
