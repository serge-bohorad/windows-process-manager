const pm = require('bindings')('windows-process-manager')

export function getExitCodeThread(threadHandle: Buffer): number {
  if (!Buffer.isBuffer(threadHandle)) {
    throw TypeError('Unable to get exit code thread. The first argument is not a Buffer.')
  }

  return pm.getExitCodeThread(threadHandle)
}
