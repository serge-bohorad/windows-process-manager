const pm = require('bindings')('windows-process-manager')

import { Options } from './types'

import { PROCESS_ALL_ACCESS } from './access-rights'

import { isNumber, isPlainObject, isBoolean } from '../utils'

export * from './access-rights'

export async function openProcess(processId: number, options?: Options): Promise<Buffer> {
  if (!isNumber(processId)) {
    throw TypeError('Unable to open process! The first argument is not a number.')
  }

  if (!isPlainObject(options)) {
    return pm.openProcess(processId, PROCESS_ALL_ACCESS, false)
  }

  const { accessRights, inheritHandle } = options!

  const finalAccessRights = isNumber(accessRights) ? accessRights : PROCESS_ALL_ACCESS
  const finalInheritHandle = isBoolean(inheritHandle) ? inheritHandle : false

  return pm.openProcess(processId, finalAccessRights, finalInheritHandle)
}
