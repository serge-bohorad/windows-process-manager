import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { virtualAllocEx, PAGE_READWRITE, PAGE_READONLY } from '../../virtual-alloc-ex'
import { virtualProtectEx } from '../'

describe('virtualProtectEx', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const size = 100

    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const addressSpace = virtualAllocEx(processHandle, size, { protectType: PAGE_READWRITE })

    expect(virtualProtectEx(processHandle, addressSpace, size, PAGE_READONLY)).toBe(PAGE_READWRITE)
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => virtualProtectEx({} as Buffer, emptyBuffer, 0, 0)).toThrowError(
      'Unable to protect virtual memory! The first argument is not a Buffer.'
    )
  })

  test('when the address is not a Buffer.', () => {
    expect(() => virtualProtectEx(emptyBuffer, {} as Buffer, 0, 0)).toThrowError(
      'Unable to protect virtual memory! The second argument is not a Buffer.'
    )
  })

  test('when size is not a number.', () => {
    expect(() => virtualProtectEx(emptyBuffer, emptyBuffer, {} as number, 0)).toThrowError(
      'Unable to protect virtual memory! The third argument is not a number.'
    )
  })

  test('when protect type is not a number.', () => {
    expect(() => virtualProtectEx(emptyBuffer, emptyBuffer, 0, {} as number)).toThrowError(
      'Unable to protect virtual memory! The fourth argument is not a number.'
    )
  })

  test('when invalid args are passed.', () => {
    expect(() => virtualProtectEx(emptyBuffer, emptyBuffer, -1, -1)).toThrowError(
      /^Unable to protect virtual memory! Error code: [0-9]+$/
    )
  })
})
