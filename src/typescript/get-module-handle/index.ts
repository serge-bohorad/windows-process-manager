const pm = require('bindings')('windows-process-manager')

import { isString } from '../utils'

export function getModuleHandle(moduleName: string): Buffer {
  if (!isString(moduleName)) {
    throw TypeError('Unable to get module handle! The first argument is not a string.')
  }

  return pm.getModuleHandle(moduleName)
}
