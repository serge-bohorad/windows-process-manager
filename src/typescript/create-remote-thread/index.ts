const pm = require('bindings')('windows-process-manager')

import { Options, ThreadInfo } from './types'

import { isNumber, isPlainObject, getMaxAddressSize } from '../utils'

export * from './flags'

export async function createRemoteThread(
  processHandle: Buffer,
  startAddress: Buffer,
  options?: Options
): Promise<ThreadInfo> {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to create remote thread! The first argument is not a Buffer.')
  }

  if (!Buffer.isBuffer(startAddress)) {
    throw TypeError('Unable to create remote thread! The second argument is not a Buffer.')
  }

  if (!isPlainObject(options)) {
    return pm.createRemoteThread(
      processHandle,
      startAddress,
      Buffer.alloc(getMaxAddressSize()),
      0,
      0
    )
  }

  const { parameter, stackSize, flags } = options!

  const finalParameter = Buffer.isBuffer(parameter) ? parameter : Buffer.alloc(getMaxAddressSize())
  const finalStackSize = isNumber(stackSize) ? stackSize : 0
  const finalFlags = isNumber(flags) ? flags : 0

  return pm.createRemoteThread(
    processHandle,
    startAddress,
    finalParameter,
    finalStackSize,
    finalFlags
  )
}
