// convert array of objects to object with keys = unique property values
export const groupby = <T extends Record<string, any>, K extends keyof T>(
  arr: T[] | undefined,
  keyProp: K,
  filterFn?: (obj: T) => boolean
): Record<T[K] & string, T[]> =>
  (arr ?? []).reduce((acc, obj) => {
    if (filterFn && !filterFn(obj)) return acc
    return {
      ...acc,
      [obj[keyProp]]: [...(acc[obj[keyProp]] || []), obj]
    }
  }, {} as Record<T[K] & string, T[]>)
