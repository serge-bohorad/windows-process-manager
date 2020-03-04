import { defaultTimes } from '../../get-process-times/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { getCurrentThreadHandle } from '../../get-current-thread-handle'
import { getThreadTimes } from '../'

describe('getThreadTimes', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', () => {
    return getThreadTimes(getCurrentThreadHandle()).then(result => {
      expect(result).toMatchObject(defaultTimes)
    })
  })

  test('when the thread handle is not a Buffer.', () => {
    return getThreadTimes({} as Buffer).catch(({ message }) => {
      expect(message).toEqual('Unable to get thread times! The first argument is not a Buffer.')
    })
  })

  test('when an invalid thread handle is passed.', () => {
    return getThreadTimes(emptyBuffer).catch(({ message }) => {
      expect(message).toMatch(/^Unable to get thread times! Error code: [0-9]+$/)
    })
  })
})
