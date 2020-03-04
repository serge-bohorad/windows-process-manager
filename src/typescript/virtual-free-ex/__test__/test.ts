import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { virtualAllocEx } from '../../virtual-alloc-ex'
import { MEM_DECOMMIT, virtualFreeEx } from '../'

describe('virtualFreeEx', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const addressSpace = virtualAllocEx(processHandle, 100)

    expect(virtualFreeEx(processHandle, addressSpace, 0)).toBeUndefined()
  })

  test('when a valid freeType is passed.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const addressSpace = virtualAllocEx(processHandle, 100)

    expect(virtualFreeEx(processHandle, addressSpace, 100, MEM_DECOMMIT)).toBeUndefined()
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => virtualFreeEx({} as Buffer, {} as Buffer, 0)).toThrowError(
      'Unable to free virtual memory! The first argument is not a Buffer.'
    )
  })

  test('when the address is not a Buffer.', () => {
    expect(() => virtualFreeEx(emptyBuffer, {} as Buffer, 0)).toThrowError(
      'Unable to free virtual memory! The second argument is not a Buffer.'
    )
  })

  test('when size is not a number.', () => {
    expect(() => virtualFreeEx(emptyBuffer, emptyBuffer, {} as number)).toThrowError(
      'Unable to free virtual memory! The third argument is not a number.'
    )
  })

  test('when invalid args are passed.', () => {
    expect(() => virtualFreeEx(emptyBuffer, emptyBuffer, -1)).toThrowError(
      /^Unable to free virtual memory! Error code: [0-9]+$/
    )
  })
})
