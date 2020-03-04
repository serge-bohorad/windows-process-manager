import { resolve } from 'path'

import { ThreadInfo } from '../types'

export const threadInfo: ThreadInfo = {
  threadId: expect.any(Number),
  threadHandle: expect.any(Buffer)
}

const root = process.cwd()

export const dll32Name = 'msg-box32.dll'
export const dll64Name = 'msg-box64.dll'
export const dll32Path = resolve(root, `misc/${dll32Name}`)
export const dll64Path = resolve(root, `misc/${dll64Name}`)

export const dllName = process.arch === 'ia32' ? dll32Name : dll64Name
export const dllPath = process.arch === 'ia32' ? dll32Path : dll64Path
