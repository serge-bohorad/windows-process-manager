import { CREATE_NEW_CONSOLE } from '../flags'
import { processInfo, exePath } from './data'

import { createProcess } from '../'

describe('createProcess', () => {
  test('default.', () => {
    return createProcess(exePath, { flags: CREATE_NEW_CONSOLE }).then(result => {
      expect(result).toMatchObject(processInfo)
    })
  })

  test('when the options object is not passed.', () => {
    return createProcess(exePath).then(result => {
      expect(result).toMatchObject(processInfo)
    })
  })

  test('when the path to an exe file does not exist.', () => {
    return createProcess('', { flags: CREATE_NEW_CONSOLE }).catch(({ message }) => {
      expect(message).toMatch(/^Unable to create process! Error code: [0-9]+$/)
    })
  })

  test('when the path to an exe file is not a string.', () => {
    return createProcess({} as string, { flags: CREATE_NEW_CONSOLE }).catch(({ message }) => {
      expect(message).toEqual('Unable to create process! The first argument is not a string.')
    })
  })

  test("when options types don't match expected types.", () => {
    return createProcess(exePath, {
      flags: CREATE_NEW_CONSOLE,
      args: {} as string,
      inheritHandles: {} as boolean,
      cwd: {} as string
    }).then(result => {
      expect(result).toMatchObject(processInfo)
    })
  })
})
