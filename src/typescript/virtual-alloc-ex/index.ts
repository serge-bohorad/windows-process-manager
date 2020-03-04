const pm = require('bindings')('windows-process-manager')

import { Options } from './types'

import { MEM_RESERVE, MEM_COMMIT } from './allocation-types'
import { PAGE_READWRITE } from './protection-types'

import { isNumber, isPlainObject, getMaxAddressSize } from '../utils'

export * from './allocation-types'
export * from './protection-types'

export function virtualAllocEx(processHandle: Buffer, size: number, options?: Options): Buffer {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to allocate virtual memory! The first argument is not a Buffer.')
  }

  if (!isNumber(size)) {
    throw TypeError('Unable to allocate virtual memory! The second argument is not a number.')
  }

  if (!isPlainObject(options)) {
    return pm.virtualAllocEx(
      processHandle,
      Buffer.alloc(getMaxAddressSize()),
      size,
      MEM_RESERVE | MEM_COMMIT,
      PAGE_READWRITE
    )
  }

  const { address, allocationType, protectType } = options!

  const finalAddress = Buffer.isBuffer(address) ? address : Buffer.alloc(getMaxAddressSize())
  const finalAllocationType = isNumber(allocationType) ? allocationType : MEM_RESERVE | MEM_COMMIT
  const finalProtectType = isNumber(protectType) ? protectType : PAGE_READWRITE

  return pm.virtualAllocEx(processHandle, finalAddress, size, finalAllocationType, finalProtectType)
}
