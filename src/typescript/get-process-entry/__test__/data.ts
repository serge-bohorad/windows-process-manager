import { ProcessEntry } from '../types'

export const processEntry: ProcessEntry = {
  processId: expect.any(Number),
  threadCount: expect.any(Number),
  parentProcessId: expect.any(Number),
  threadPriority: expect.any(Number)
}
