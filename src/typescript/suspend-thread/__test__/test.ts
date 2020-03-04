import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { suspendThread } from '../'

describe('suspendThread', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { threadHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    expect(suspendThread(threadHandle)).toBeGreaterThan(-1)
  })

  test('when the thread handle is not a Buffer.', () => {
    expect(() => suspendThread({} as Buffer)).toThrowError(
      'Unable to suspend thread! The first argument is not a Buffer.'
    )
  })

  test('when an invalid thread handle is passed.', () => {
    expect(() => suspendThread(emptyBuffer)).toThrowError(
      /^Unable to suspend thread! Error code: [0-9]+$/
    )
  })
})
