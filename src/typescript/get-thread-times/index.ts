const pm = require('bindings')('windows-process-manager')

import { Times } from '../get-process-times/types'

export async function getThreadTimes(threadHandle: Buffer): Promise<Times> {
  if (!Buffer.isBuffer(threadHandle)) {
    throw TypeError('Unable to get thread times! The first argument is not a Buffer.')
  }

  return pm.getThreadTimes(threadHandle)
}
