const pm = require('bindings')('windows-process-manager')

import { Options } from './types'

import { THREAD_ALL_ACCESS } from './access-rights'

import { isNumber, isPlainObject, isBoolean } from '../utils'

export * from './access-rights'

export async function openThread(threadId: number, options?: Options): Promise<Buffer> {
  if (!isNumber(threadId)) {
    throw TypeError('Unable to open thread! The first argument is not a number.')
  }

  if (!isPlainObject(options)) {
    return pm.openThread(threadId, THREAD_ALL_ACCESS, false)
  }

  const { accessRights, inheritHandle } = options!

  const finalAccessRights = isNumber(accessRights) ? accessRights : THREAD_ALL_ACCESS
  const finalInheritHandle = isBoolean(inheritHandle) ? inheritHandle : false

  return pm.openThread(threadId, finalAccessRights, finalInheritHandle)
}
