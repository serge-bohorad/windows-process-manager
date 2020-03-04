import { getModuleHandle } from '../'

describe('getModuleHandle', () => {
  test('default.', () => {
    expect(Buffer.isBuffer(getModuleHandle('kernel32.dll'))).toBeTruthy()
  })

  test('when the module name is not a string.', () => {
    expect(() => getModuleHandle({} as string)).toThrowError(
      'Unable to get module handle! The first argument is not a string.'
    )
  })

  test('when an invalid module name is passed.', () => {
    expect(() => getModuleHandle('-random-')).toThrowError(
      /^Unable to get module handle! Error code: [0-9]+$/
    )
  })
})
