import { openProcess } from '../'

describe('openProcess', () => {
  test('default.', async () => {
    return openProcess(process.pid).then(result => {
      expect(Buffer.isBuffer(result)).toBeTruthy()
    })
  })

  test('when the process id is not a number.', () => {
    return openProcess({} as number).catch(({ message }) => {
      expect(message).toEqual('Unable to open process! The first argument is not a number.')
    })
  })

  test("when options types don't match expected types.", async () => {
    return openProcess(process.pid, {
      accessRights: {} as number,
      inheritHandle: {} as boolean
    }).then(result => {
      expect(Buffer.isBuffer(result)).toBeTruthy()
    })
  })

  test('when an invalid process id is passed.', async () => {
    return openProcess(0).catch(({ message }) => {
      expect(message).toMatch(/^Unable to open process. Error code: [0-9]+$/)
    })
  })
})
