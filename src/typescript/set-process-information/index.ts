const pm = require('bindings')('windows-process-manager')

export const MEMORY_PRIORITY_VERY_LOW = 1
export const MEMORY_PRIORITY_LOW = 2
export const MEMORY_PRIORITY_MEDIUM = 3
export const MEMORY_PRIORITY_BELOW_NORMAL = 4
export const MEMORY_PRIORITY_NORMAL = 5

export function setProcessMemoryPriority(processHandle: Buffer, priority: number): void {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to set memory priority! The first argument is not a Buffer.')
  }

  pm.setProcessMemoryPriority(processHandle, priority)
}

export function setProcessPowerThrottling(processHandle: Buffer, ecoPower: boolean): void {
  if (!Buffer.isBuffer(processHandle)) {
    throw TypeError('Unable to set power throttling! The first argument is not a Buffer.')
  }
  if (!pm.setProcessPowerThrottling) {
    throw Error('Unable to set power throttling, this requires Windows 11 or higher.')
  }

  pm.setProcessPowerThrottling(processHandle, ecoPower)
}
