const pm = require('bindings')('windows-process-manager')

export function getCurrentThreadId(): number {
  return pm.getCurrentThreadId()
}
