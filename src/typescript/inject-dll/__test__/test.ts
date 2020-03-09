import { exePath } from '../../create-process/__test__/data'
import { dllPath, threadInfo } from '../../create-remote-thread/__test__/data'

import { CREATE_NEW_CONSOLE, createProcess } from '../../create-process'
import { injectDll } from '../'

describe('injectDll', () => {
  test('default.', async () => {
    const { processId } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return injectDll(processId, dllPath, { waitingTimeout: 0 }).then(result => {
      expect(result).toBeGreaterThan(0)
    })
  })

  test('when the process id is not a number.', () => {
    return injectDll({} as number, '').catch(({ message }) => {
      expect(message).toEqual('Unable to inject dll! The first argument is not a number.')
    })
  })

  test('when the dll file is not a string.', () => {
    return injectDll(0, {} as string).catch(({ message }) => {
      expect(message).toEqual('Unable to inject dll! The second argument is not a string.')
    })
  })

  test('when an invalid process id is passed.', () => {
    return injectDll(0, dllPath).catch(({ message }) => {
      expect(message).toMatch(/^Unable to inject dll. Failed to open process. Error code: [0-9]+$/)
    })
  })

  test('when an invalid dll file is passed.', async () => {
    const { processId } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return injectDll(processId, '').catch(({ message }) => {
      expect(message).toMatch(
        /^Unable to inject dll. Failed to allocate memory. Error code: [0-9]+$/
      )
    })
  })
})
