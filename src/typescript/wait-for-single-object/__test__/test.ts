import { exePath } from '../../create-process/__test__/data'
import { INFINITE } from '../timeouts'

import { createEmptyBuffer } from '../../utils'
import { createProcess, CREATE_NEW_CONSOLE } from '../../create-process'
import { createRemoteThread } from '../../create-remote-thread'
import { waitForSingleObject } from '../'

describe('waitForSingleObject', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const { threadHandle } = await createRemoteThread(processHandle, emptyBuffer)

    return waitForSingleObject(threadHandle, INFINITE).then(result => {
      expect(result).toBeGreaterThan(-1)
    })
  })

  test('when the object handle is not a Buffer.', () => {
    return waitForSingleObject({} as Buffer, 0).catch(({ message }) => {
      expect(message).toEqual('Unable to wait single object! The first argument is not a Buffer.')
    })
  })

  test('when milliseconds is not a number.', () => {
    return waitForSingleObject(emptyBuffer, {} as number).catch(({ message }) => {
      expect(message).toEqual('Unable to wait single object! The second argument is not a number.')
    })
  })

  test('when invalid args are passed.', async () => {
    return waitForSingleObject(emptyBuffer, 0).catch(({ message }) => {
      expect(message).toMatch(/^Unable to wait for single object. Error code: [0-9]+$/)
    })
  })
})
