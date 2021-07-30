import { getCurrentProcessHandle } from '../../get-current-process-handle'

import { setProcessMemoryPriority, setProcessPowerThrottling, MEMORY_PRIORITY_LOW, MEMORY_PRIORITY_BELOW_NORMAL } from '../'

describe('setProcessInformation', () => {
  test('default.', async () => {
    setProcessMemoryPriority(getCurrentProcessHandle(), MEMORY_PRIORITY_LOW)
    setProcessMemoryPriority(getCurrentProcessHandle(), MEMORY_PRIORITY_BELOW_NORMAL)
  })
})
