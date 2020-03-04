const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export function writeProcessMemory(
  processHandle: Buffer,
  baseAddress: Buffer,
  data: Buffer,
  size: number
): number {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to write process memory! The first argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(baseAddress)) {
    throw TypeError('Unable to write process memory! The second argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(data)) {
    throw TypeError('Unable to write process memory! The third argument is not a Buffer.')
  }

  if (!isNumber(size)) {
    throw TypeError('Unable to write process memory! The fourth argument is not a number.')
  }

  return pm.writeProcessMemory(processHandle, baseAddress, data, size)
}
