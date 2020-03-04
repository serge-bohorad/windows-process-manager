import { getCurrentThreadId } from '../../get-current-thread-id'

import { openThread } from '../'

describe('openThread', () => {
  test('default.', () => {
    return openThread(getCurrentThreadId()).then(result => {
      expect(Buffer.isBuffer(result)).toBeTruthy()
    })
  })

  test('when the thread id is not a number.', () => {
    return openThread({} as number).catch(({ message }) => {
      expect(message).toEqual('Unable to open thread! The first argument is not a number.')
    })
  })

  test("when options types don't match expected types.", () => {
    return openThread(getCurrentThreadId(), {
      accessRights: {} as number,
      inheritHandle: {} as boolean
    }).then(result => {
      expect(Buffer.isBuffer(result)).toBeTruthy()
    })
  })

  test('when an invalid thread id is passed.', () => {
    return openThread(0).catch(({ message }) => {
      expect(message).toMatch(/^Unable to open thread. Error code: [0-9]+$/)
    })
  })
})
