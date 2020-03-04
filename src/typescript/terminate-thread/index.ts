const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export async function terminateThread(threadHandle: Buffer, exitCode?: number): Promise<void> {
  if (!Buffer.isBuffer(threadHandle)) {
    throw TypeError('Unable to terminate thread! The first argument is not a Buffer.')
  }

  const finalExitCode = isNumber(exitCode) ? exitCode : 0

  return pm.terminateThread(threadHandle, finalExitCode)
}
