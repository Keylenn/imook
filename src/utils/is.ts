// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function is(x: any, y: any): boolean {
  const nativeIs = Object.is
  if (nativeIs) return nativeIs(x, y)

  // fix: +0 === -0
  if (x === y) return x !== 0 || 1 / x === 1 / y

  // fix: NaN !== NaN
  return x !== x && y !== y
}
