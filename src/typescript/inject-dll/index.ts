const pm = require('bindings')('windows-process-manager')

import { Options } from './types'
import { ThreadInfo } from '../create-remote-thread/types'

import { INFINITE } from '../wait-for-single-object'

import { isNumber, isString, isPlainObject } from '../utils'

export async function injectDll(
  processId: number,
  dllFile: string,
  options?: Options
): Promise<ThreadInfo> {
  if (!isNumber(processId)) {
    throw TypeError('Unable to inject dll! The first argument is not a number.')
  }

  if (!isString(dllFile)) {
    throw TypeError('Unable to inject dll! The second argument is not a string.')
  }

  if (!isPlainObject(options)) {
    return pm.injectDll(processId, dllFile, INFINITE)
  }

  const { waitingTimeout } = options!

  const finalWaitingTimeout = isNumber(waitingTimeout) ? waitingTimeout : INFINITE

  return pm.injectDll(processId, dllFile, finalWaitingTimeout)
}
