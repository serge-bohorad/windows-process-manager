const pm = require('bindings')('windows-process-manager')

export function resumeThread(threadHandle: Buffer): number {
  if (!Buffer.isBuffer(threadHandle)) {
    throw TypeError('Unable to resume thread! The first argument is not a Buffer.')
  }

  return pm.resumeThread(threadHandle)
}
