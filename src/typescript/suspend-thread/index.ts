const pm = require('bindings')('windows-process-manager')

export function suspendThread(threadHandle: Buffer): number {
  if (!Buffer.isBuffer(threadHandle)) {
    throw TypeError('Unable to suspend thread! The first argument is not a Buffer.')
  }

  return pm.suspendThread(threadHandle)
}
