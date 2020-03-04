import { createEmptyBuffer } from '../../utils'
import { getCurrentThreadHandle } from '../../get-current-thread-handle'
import { getExitCodeThread } from '../'

describe('getExitCodeThread', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const threadHandle = getCurrentThreadHandle()

    expect(getExitCodeThread(threadHandle)).toBeGreaterThan(0)
  })

  test('when the thread handle is not a Buffer.', () => {
    expect(() => getExitCodeThread({} as Buffer)).toThrowError(
      'Unable to get exit code thread. The first argument is not a Buffer.'
    )
  })

  test('when an invalid thread handle is passed.', () => {
    expect(() => getExitCodeThread(emptyBuffer)).toThrowError(
      /^Unable to get exit code thread. Error code: [0-9]+$/
    )
  })
})
