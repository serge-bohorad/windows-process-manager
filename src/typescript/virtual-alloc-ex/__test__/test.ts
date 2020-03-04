import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { virtualAllocEx } from '../'

describe('virtualAllocEx', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    expect(Buffer.isBuffer(virtualAllocEx(processHandle, 100))).toBeTruthy()
  })

  test("when options types don't match expected types.", async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    expect(
      Buffer.isBuffer(
        virtualAllocEx(processHandle, 100, {
          address: {} as Buffer,
          allocationType: {} as number,
          protectType: {} as number
        })
      )
    ).toBeTruthy()
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => virtualAllocEx({} as Buffer, 0)).toThrowError(
      'Unable to allocate virtual memory! The first argument is not a Buffer.'
    )
  })

  test('when size is not a number.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    expect(() => virtualAllocEx(processHandle, {} as number)).toThrowError(
      'Unable to allocate virtual memory! The second argument is not a number.'
    )
  })

  test('when invalid args are passed.', () => {
    expect(() => virtualAllocEx(emptyBuffer, -1)).toThrowError(
      /^Unable to allocate virtual memory! Error code: [0-9]+$/
    )
  })
})
