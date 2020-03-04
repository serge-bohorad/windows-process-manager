import { exePath } from '../../create-process/__test__/data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { terminateProcess } from '../'

describe('terminateProcess', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateProcess(processHandle).then(result => {
      expect(result).toBeUndefined()
    })
  })

  test('when a valid error code is passed.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateProcess(processHandle, 1).then(result => {
      expect(result).toBeUndefined()
    })
  })

  test('when the process handle is not a Buffer.', () => {
    return terminateProcess({} as Buffer).catch(({ message }) => {
      expect(message).toEqual('Unable to terminate process! The first argument is not a Buffer.')
    })
  })

  test('when an invalid process handle is passed.', () => {
    return terminateProcess(emptyBuffer).catch(({ message }) => {
      expect(message).toMatch(/^Unable to terminate process! Error code: [0-9]+$/)
    })
  })

  test('when the error code is not a number.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return terminateProcess(processHandle, {} as number).then(result => {
      expect(result).toBeUndefined()
    })
  })
})
