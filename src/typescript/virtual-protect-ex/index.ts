const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export function virtualProtectEx(
  processHandle: Buffer,
  address: Buffer,
  size: number,
  protectType: number
): number {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to protect virtual memory! The first argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(address)) {
    throw TypeError('Unable to protect virtual memory! The second argument is not a Buffer.')
  }

  if (!isNumber(size)) {
    throw TypeError('Unable to protect virtual memory! The third argument is not a number.')
  }

  if (!isNumber(protectType)) {
    throw TypeError('Unable to protect virtual memory! The fourth argument is not a number.')
  }

  return pm.virtualProtectEx(processHandle, address, size, protectType)
}
