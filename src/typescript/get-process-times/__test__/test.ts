import { exePath } from '../../create-process/__test__/data'
import { defaultTimes } from './data'

import { createEmptyBuffer } from '../../utils'
import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { getProcessTimes } from '../'

describe('getProcessTimes', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return getProcessTimes(processHandle).then(result => {
      expect(result).toMatchObject(defaultTimes)
    })
  })

  test('when the process handle is not a Buffer.', () => {
    return getProcessTimes({} as Buffer).catch(({ message }) => {
      expect(message).toEqual('Unable to get process times! The first argument is not a Buffer.')
    })
  })

  test('when an invalid process handle is passed.', () => {
    return getProcessTimes(emptyBuffer).catch(({ message }) => {
      expect(message).toMatch(/^Unable to get process times! Error code: [0-9]+$/)
    })
  })
})
