import { createEmptyBuffer } from '../../utils'
import { getCurrentProcessHandle } from '../../get-current-process-handle'
import { getExitCodeProcess } from '../'

describe('getExitCodeProcess', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    expect(getExitCodeProcess(getCurrentProcessHandle())).toBeGreaterThan(0)
  })

  test('when the process handle is not a Buffer.', () => {
    expect(() => getExitCodeProcess({} as Buffer)).toThrowError(
      'Unable to get exit code process. The first argument is not a Buffer.'
    )
  })

  test('when an invalid process handle is passed.', () => {
    expect(() => getExitCodeProcess(emptyBuffer)).toThrowError(
      /^Unable to get exit code process. Error code: [0-9]+$/
    )
  })
})
