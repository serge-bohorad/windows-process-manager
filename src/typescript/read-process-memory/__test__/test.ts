import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { virtualAllocEx } from '../../virtual-alloc-ex'
import { readProcessMemory } from '../'

describe('readProcessMemory', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const addressSpace = virtualAllocEx(processHandle, 100)

    expect(Buffer.isBuffer(readProcessMemory(processHandle, addressSpace, 100))).toBeTruthy()
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => readProcessMemory({} as Buffer, emptyBuffer, 1)).toThrowError(
      'Unable to read process memory! The first argument is not a Buffer.'
    )
  })

  test('when the base address is not a Buffer.', () => {
    expect(() => readProcessMemory(emptyBuffer, {} as Buffer, 1)).toThrowError(
      'Unable to read process memory! The second argument is not a Buffer.'
    )
  })

  test('when size is not a number.', () => {
    expect(() => readProcessMemory(emptyBuffer, emptyBuffer, {} as number)).toThrowError(
      'Unable to read process memory! The third argument is not a number.'
    )
  })

  test('when size is less than 1.', () => {
    expect(() => readProcessMemory(emptyBuffer, emptyBuffer, 0)).toThrowError(
      'Unable to read process memory! Size must be greater than 0.'
    )
  })

  test('when invalid args are passed.', () => {
    expect(() => readProcessMemory(emptyBuffer, emptyBuffer, 1)).toThrowError(
      /^Unable to read process memory! Error code: [0-9]+$/
    )
  })
})
