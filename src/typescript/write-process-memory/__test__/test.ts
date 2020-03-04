import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { virtualAllocEx } from '../../virtual-alloc-ex'
import { writeProcessMemory } from '../'

describe('writeProcessMemory', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const data = Buffer.from('Test string', 'utf16le')

    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const addressSpace = virtualAllocEx(processHandle, data.byteLength)

    expect(writeProcessMemory(processHandle, addressSpace, data, data.byteLength)).toBe(
      data.byteLength
    )
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => writeProcessMemory({} as Buffer, {} as Buffer, {} as Buffer, 0)).toThrowError(
      'Unable to write process memory! The first argument is not a Buffer.'
    )
  })

  test('when the base address is not a Buffer.', () => {
    expect(() => writeProcessMemory(emptyBuffer, {} as Buffer, {} as Buffer, 0)).toThrowError(
      'Unable to write process memory! The second argument is not a Buffer.'
    )
  })

  test('when the data is not a Buffer.', () => {
    expect(() => writeProcessMemory(emptyBuffer, emptyBuffer, {} as Buffer, 0)).toThrowError(
      'Unable to write process memory! The third argument is not a Buffer.'
    )
  })

  test('when size is not a number.', () => {
    expect(() =>
      writeProcessMemory(emptyBuffer, emptyBuffer, emptyBuffer, {} as number)
    ).toThrowError('Unable to write process memory! The fourth argument is not a number.')
  })

  test('when invalid args are passed.', () => {
    expect(() => writeProcessMemory(emptyBuffer, emptyBuffer, emptyBuffer, -1)).toThrowError(
      /^Unable to write process memory! Error code: [0-9]+$/
    )
  })
})
