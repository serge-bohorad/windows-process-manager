export interface Options {
  args?: string
  inheritHandles?: boolean
  flags?: number
  cwd?: string
}

export interface ProcessInfo {
  processId: number
  threadId: number
  processHandle: Buffer
  threadHandle: Buffer
}
