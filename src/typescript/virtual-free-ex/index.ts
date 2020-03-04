const pm = require('bindings')('windows-process-manager')

import { MEM_RELEASE } from './free-types'

import { isNumber } from '../utils'

export * from './free-types'

export function virtualFreeEx(
  processHandle: Buffer,
  address: Buffer,
  size: number,
  freeType?: number
): void {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to free virtual memory! The first argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(address)) {
    throw TypeError('Unable to free virtual memory! The second argument is not a Buffer.')
  }

  if (!isNumber(size)) {
    throw TypeError('Unable to free virtual memory! The third argument is not a number.')
  }

  const finalFreeType = isNumber(freeType) ? freeType : MEM_RELEASE

  return pm.virtualFreeEx(processHandle, address, size, finalFreeType)
}
