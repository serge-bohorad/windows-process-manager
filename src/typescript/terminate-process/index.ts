const pm = require('bindings')('windows-process-manager')

import { isNumber } from '../utils'

export async function terminateProcess(processHandle: Buffer, exitCode?: number): Promise<void> {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to terminate process! The first argument is not a Buffer.')
  }

  const finalExitCode = isNumber(exitCode) ? exitCode : 0

  return pm.terminateProcess(processHandle, finalExitCode)
}
