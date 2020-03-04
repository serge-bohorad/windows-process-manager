import { getCurrentProcessHandle } from '../'

describe('getCurrentProcessHandle', () => {
  test('default.', () => {
    expect(Buffer.isBuffer(getCurrentProcessHandle())).toBeTruthy()
  })
})
