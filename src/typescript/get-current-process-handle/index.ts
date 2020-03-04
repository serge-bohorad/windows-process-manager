const pm = require('bindings')('windows-process-manager')

export function getCurrentProcessHandle(): Buffer {
  return pm.getCurrentProcessHandle()
}
