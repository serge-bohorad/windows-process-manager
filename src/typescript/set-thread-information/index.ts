const pm = require('bindings')('windows-process-manager')

export function setThreadMemoryPriority(ThreadHandle: Buffer, priority: number): void {
  if (!Buffer.isBuffer(ThreadHandle)) {
    throw TypeError('Unable to set memory priority! The first argument is not a Buffer.')
  }

  pm.setThreadMemoryPriority(ThreadHandle, priority)
}
