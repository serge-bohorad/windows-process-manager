const pm = require('bindings')('windows-process-manager')

import { ProcessEntry } from './types'

import { isString } from '../utils'

export async function getProcessEntry(processName: string): Promise<ProcessEntry> {
  if (!isString(processName)) {
    throw TypeError('Unable to get process entry! The first argument is not a string.')
  }

  return pm.getProcessEntry(processName)
}
