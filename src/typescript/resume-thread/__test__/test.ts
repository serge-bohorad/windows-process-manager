import { createEmptyBuffer } from '../../utils'
import { getCurrentThreadHandle } from '../../get-current-thread-handle'
import { resumeThread } from '../'

describe('resumeThread', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const threadHandle = getCurrentThreadHandle()

    expect(resumeThread(threadHandle)).toBeGreaterThan(-1)
  })

  test('when the thread handle is not a Buffer.', () => {
    expect(() => resumeThread({} as Buffer)).toThrowError(
      'Unable to resume thread! The first argument is not a Buffer.'
    )
  })

  test('when an invalid thread handle is passed.', () => {
    expect(() => resumeThread(emptyBuffer)).toThrowError(
      /^Unable to resume thread! Error code: [0-9]+$/
    )
  })
})
