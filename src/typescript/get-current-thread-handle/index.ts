const pm = require('bindings')('windows-process-manager')

export function getCurrentThreadHandle(): Buffer {
  return pm.getCurrentThreadHandle()
}
