import { getCurrentThreadHandle } from '../../get-current-thread-handle'
import { setThreadMemoryPriority } from '../'
import { MEMORY_PRIORITY_LOW, MEMORY_PRIORITY_BELOW_NORMAL } from '../../set-process-information'

describe('setThreadInformation', () => {
  test('default.', async () => {
    setThreadMemoryPriority(getCurrentThreadHandle(), MEMORY_PRIORITY_LOW)
    setThreadMemoryPriority(getCurrentThreadHandle(), MEMORY_PRIORITY_BELOW_NORMAL)
  })
})
