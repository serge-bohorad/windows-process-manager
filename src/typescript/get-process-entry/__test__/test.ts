import { exePath, exeName } from '../../create-process/__test__/data'
import { processEntry } from './data'

import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'

import { getProcessEntry } from '../'

describe('getProcessEntry', () => {
  test('default.', async () => {
    await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return getProcessEntry(exeName).then(result => {
      expect(result).toMatchObject(processEntry)
    })
  })

  test('when the process name is not a string.', () => {
    return getProcessEntry({} as string).catch(({ message }) => {
      expect(message).toEqual('Unable to get process entry! The first argument is not a string.')
    })
  })

  test('when an invalid process name is passed.', () => {
    return getProcessEntry('-random-').catch(({ message }) => {
      expect(message).toEqual('Unable to get process entry! Process not found.')
    })
  })
})
