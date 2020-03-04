import { resolve } from 'path'

import { ProcessInfo } from '../types'

export const processInfo: ProcessInfo = {
  processId: expect.any(Number),
  threadId: expect.any(Number),
  processHandle: expect.any(Buffer),
  threadHandle: expect.any(Buffer)
}

const root = process.cwd()

export const exe32Name = 'test32.exe'
export const exe64Name = 'test64.exe'
export const exe32Path = resolve(root, `misc/${exe32Name}`)
export const exe64Path = resolve(root, `misc/${exe64Name}`)

export const exeName = process.arch === 'ia32' ? exe32Name : exe64Name
export const exePath = process.arch === 'ia32' ? exe32Path : exe64Path
