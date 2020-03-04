const pm = require('bindings')('windows-process-manager')

import { Times } from './types'

export async function getProcessTimes(processHandle: Buffer): Promise<Times> {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to get process times! The first argument is not a Buffer.')
  }

  return pm.getProcessTimes(processHandle)
}
