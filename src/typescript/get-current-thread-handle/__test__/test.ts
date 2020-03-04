import { getCurrentThreadHandle } from '../'

describe('getCurrentThreadHandle', () => {
  test('default.', () => {
    expect(Buffer.isBuffer(getCurrentThreadHandle())).toBeTruthy()
  })
})
