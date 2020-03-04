import { createEmptyBuffer } from '../../utils'
import { getModuleHandle } from '../../get-module-handle'
import { getProcAddress } from '../'

describe('getProcAddress', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', () => {
    const moduleHandle = getModuleHandle('kernel32.dll')

    expect(Buffer.isBuffer(getProcAddress(moduleHandle, 'CreateProcessW'))).toBeTruthy()
  })

  test('when the module handle is not a Buffer.', () => {
    expect(() => getProcAddress({} as Buffer, '')).toThrowError(
      'Unable to get procedure address! The first argument is not a Buffer.'
    )
  })

  test('when the procedure name is not a string.', () => {
    expect(() => getProcAddress(emptyBuffer, {} as string)).toThrowError(
      'Unable to get procedure address! The second argument is not a string.'
    )
  })

  test('when invalid args are passed.', () => {
    expect(() => getProcAddress(emptyBuffer, '')).toThrowError(
      /^Unable to get procedure address! Error code: [0-9]+$/
    )
  })
})
