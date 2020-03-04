const pm = require('bindings')('windows-process-manager')

import { isString } from '../utils'

export function getProcAddress(moduleHandle: Buffer, procName: string): Buffer {
  if (!Buffer.isBuffer(moduleHandle)) {
    throw TypeError('Unable to get procedure address! The first argument is not a Buffer.')
  }

  if (!isString(procName)) {
    throw TypeError('Unable to get procedure address! The second argument is not a string.')
  }

  return pm.getProcAddress(moduleHandle, procName)
}
