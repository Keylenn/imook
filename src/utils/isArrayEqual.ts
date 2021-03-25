import isEqual from 'lodash/isEqual'
import is from './is'

export type AnyArr = any[]

export default function isArrayEqual(arr1: AnyArr, arr2: AnyArr, isDeepEqual = false): boolean {
  return isDeepEqual ? isEqual(arr1, arr2) : shallowArrayEqual(arr1, arr2)
}

function shallowArrayEqual(arr1: AnyArr, arr2: AnyArr): boolean {
  if (arr1.length !== arr2.length) return false

  for (const idx in arr1) {
    if (!is(arr1[idx], arr2[idx])) return false
  }

  return true
}
