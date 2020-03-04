const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export function readProcessMemory(
  processHandle: Buffer,
  baseAddress: Buffer,
  size: number
): Buffer {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to read process memory! The first argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(baseAddress)) {
    throw TypeError('Unable to read process memory! The second argument is not a Buffer.')
  }

  if (!isNumber(size)) {
    throw TypeError('Unable to read process memory! The third argument is not a number.')
  }

  if (size < 1) {
    throw Error('Unable to read process memory! Size must be greater than 0.')
  }

  return pm.readProcessMemory(processHandle, baseAddress, size)
}
