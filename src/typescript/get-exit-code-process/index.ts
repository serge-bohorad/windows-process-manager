const pm = require('bindings')('windows-process-manager')

export function getExitCodeProcess(processHandle: Buffer): number {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to get exit code process. The first argument is not a Buffer.')
  }

  return pm.getExitCodeProcess(processHandle)
}
