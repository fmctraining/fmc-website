/**
 * convert an array of objects to an object with:
 * - keys: unique values of keyProp
 * - values: array of objects with that value for keyProp
 *
 * optional filterFn filters out objects before grouping
 * ignores objects with undefined or falsy keyProp values
 *
 * https://grok.com/share/bGVnYWN5_6864f7cd-70be-42f6-92b0-47c3b6ae4164
 **/
export function groupby<T extends Record<string, any>, K extends keyof T>(
  arr: T[] | undefined,
  keyProp: K,
  filterFn?: (obj: T) => boolean
): Record<string, T[]> {
  return (arr || []).reduce(
    (acc, obj) => {
      const key = obj[keyProp] as string
      if (!key || (filterFn && !filterFn(obj))) return acc
      ;(acc[key] ||= []).push(obj)
      return acc
    },
    {} as Record<string, T[]>
  )
}
