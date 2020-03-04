import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { terminateThread } from '../'

describe('terminateThread', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { threadHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateThread(threadHandle).then(result => {
      expect(result).toBeUndefined()
    })
  })

  test('when a valid error code is passed.', async () => {
    const { threadHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateThread(threadHandle, 1).then(result => {
      expect(result).toBeUndefined()
    })
  })

  test('when the thread handle is not a Buffer.', () => {
    return terminateThread({} as Buffer).catch(({ message }) => {
      expect(message).toEqual('Unable to terminate thread! The first argument is not a Buffer.')
    })
  })

  test('when the error code is not a number.', async () => {
    const { threadHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateThread(threadHandle, {} as number).then(result => {
      expect(result).toBeUndefined()
    })
  })

  test('when an invalid thread handle is passed.', () => {
    return terminateThread(emptyBuffer).catch(({ message }) => {
      expect(message).toMatch(/^Unable to terminate thread! Error code: [0-9]+$/)
    })
  })
})
