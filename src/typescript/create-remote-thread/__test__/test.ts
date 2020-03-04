import { exePath } from '../../create-process/__test__/data'
import { threadInfo, dllPath } from './data'

import { createEmptyBuffer } from '../../utils'
import { createProcess, CREATE_NEW_CONSOLE } from '../../create-process'
import { getProcAddress } from '../../get-proc-address'
import { getModuleHandle } from '../../get-module-handle'
import { virtualAllocEx } from '../../virtual-alloc-ex'
import { writeProcessMemory } from '../../write-process-memory'
import { createRemoteThread } from '../'

describe('createRemoteThread', () => {
  const emptyBuffer = createEmptyBuffer()

  test('default.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return createRemoteThread(processHandle, emptyBuffer, { parameter: emptyBuffer }).then(
      result => {
        expect(result).toMatchObject(threadInfo)
      }
    )
  })

  test('when the options object is not passed.', async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return createRemoteThread(processHandle, emptyBuffer).then(result => {
      expect(result).toMatchObject(threadInfo)
    })
  })

  test("when options types don't match expected types.", async () => {
    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })

    return createRemoteThread(processHandle, emptyBuffer, {
      parameter: {} as Buffer,
      stackSize: {} as number,
      flags: {} as number
    }).then(result => {
      expect(result).toMatchObject(threadInfo)
    })
  })

  test('when manually injected dll.', async () => {
    const pathBuffer = Buffer.from(dllPath, 'utf16le')

    const { processHandle } = await createProcess(exePath, { flags: CREATE_NEW_CONSOLE })
    const LoadLibraryW = getProcAddress(getModuleHandle('kernel32.dll'), 'LoadLibraryW')

    const addressSpace = virtualAllocEx(processHandle, pathBuffer.byteLength)
    writeProcessMemory(processHandle, addressSpace, pathBuffer, pathBuffer.byteLength)

    return createRemoteThread(processHandle, LoadLibraryW, { parameter: addressSpace }).then(
      result => {
        expect(result).toMatchObject(threadInfo)
      }
    )
  })

  test('when the process handle is not a Buffer.', () => {
    return createRemoteThread({} as Buffer, emptyBuffer).catch(({ message }) => {
      expect(message).toEqual('Unable to create remote thread! The first argument is not a Buffer.')
    })
  })

  test('when the start address is not a Buffer.', () => {
    return createRemoteThread(emptyBuffer, {} as Buffer).catch(({ message }) => {
      expect(message).toEqual(
        'Unable to create remote thread! The second argument is not a Buffer.'
      )
    })
  })

  test('when the start address is not a Buffer.', () => {
    return createRemoteThread(emptyBuffer, {} as Buffer).catch(({ message }) => {
      expect(message).toEqual(
        'Unable to create remote thread! The second argument is not a Buffer.'
      )
    })
  })

  test('when invalid args are passed.', () => {
    return createRemoteThread(emptyBuffer, emptyBuffer).catch(({ message }) => {
      expect(message).toMatch(/^Unable to create remote thread. Error code: [0-9]+$/)
    })
  })
})
