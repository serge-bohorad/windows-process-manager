const pm = require('bindings')('windows-process-manager')

export function closeHandle(handle: Buffer): void {
  if (!Buffer.isBuffer(handle)) {
    throw TypeError('Unable to close handle! The first argument is not a Buffer.')
  }

  return pm.closeHandle(handle)
}
