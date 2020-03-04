const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export * from './timeouts'
export * from './indicators'

export async function waitForSingleObject(
  objectHandle: Buffer,
  milliseconds: number
): Promise<number> {
  if (!Buffer.isBuffer(objectHandle)) {
    throw TypeError('Unable to wait single object! The first argument is not a Buffer.')
  }

  if (!isNumber(milliseconds)) {
    throw TypeError('Unable to wait single object! The second argument is not a number.')
  }

  return pm.waitForSingleObject(objectHandle, milliseconds)
}
