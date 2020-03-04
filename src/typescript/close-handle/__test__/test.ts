import { exePath } from '../../create-process/__test__/data'

import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { closeHandle } from '../'

describe('closeHandle', () => {
  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    expect(closeHandle(processHandle)).toBeUndefined()
  })

  test('when the handle is not a Buffer.', () => {
    expect(() => closeHandle({} as Buffer)).toThrowError(
      'Unable to close handle! The first argument is not a Buffer.'
    )
  })

  test('when an invalid handle is passed.', () => {
    expect(() => closeHandle(Buffer.alloc(0))).toThrowError(
      /^Unable to close handle! Error code: [0-9]+$/
    )
  })
})
