const pm = require('bindings')('windows-process-manager')

import { Options, ProcessInfo } from './types'

import { isString, isBoolean, isNumber, isPlainObject } from '../utils'

export * from './flags'

export async function createProcess(exeFile: string, options?: Options): Promise<ProcessInfo> {
  if (!isString(exeFile)) {
    throw TypeError('Unable to create process! The first argument is not a string.')
  }

  if (!isPlainObject(options)) {
    return pm.createProcess(exeFile, '', false, 0, process.cwd())
  }

  const { args, inheritHandles, flags, cwd } = options!

  const finalArgs = isString(args) ? args : ''
  const finalInheritHandles = isBoolean(inheritHandles) ? inheritHandles : false
  const finalFlags = isNumber(flags) ? flags : 0
  const finalCwd = isString(cwd) ? cwd : process.cwd()

  return pm.createProcess(exeFile, finalArgs, finalInheritHandles, finalFlags, finalCwd)
}
