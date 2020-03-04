export interface Options {
  parameter?: Buffer
  stackSize?: number
  flags?: number
}

export interface ThreadInfo {
  threadId: number
  threadHandle: Buffer
}
