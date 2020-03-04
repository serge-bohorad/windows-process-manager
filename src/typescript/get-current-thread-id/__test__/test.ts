import { getCurrentThreadId } from '../'

describe('getCurrentThreadId', () => {
  test('default.', () => {
    expect(getCurrentThreadId()).toBeGreaterThan(0)
  })
})
