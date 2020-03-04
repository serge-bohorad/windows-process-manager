export function isString(data): boolean {
  return typeof data === 'string'
}

export function isNumber(data): boolean {
  return typeof data === 'number'
}

export function isBoolean(data): boolean {
  return typeof data === 'boolean'
}

export function isPlainObject(data): boolean {
  return !!data && Object.prototype.toString.call(data) === '[object Object]'
}

export function getMaxAddressSize(): number {
  return (process.arch === 'ia32' && 4) || 8
}

export function createEmptyBuffer(size: number = getMaxAddressSize()): Buffer {
  return Buffer.alloc(size)
}
