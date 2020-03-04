> ⚠ Note that all functions may throw an error. Call functions only in the **try catch** block, or use the **catch** function if a function returns a promise.

## createProcess
```ts
async function createProcess(exeFile: string, options?: Options): Promise<ProcessInfo> {}
```
Creates a new process and its primary thread.
### Parameters
#### Required
*string* `exeFile` - Full path to an .exe file.  
#### Optional 
*object* `options`    
| Name           | Type       | Default       | Description                                                           |
| -------------- | ---------- | ------------- | --------------------------------------------------------------------- |
| args           | `string`   | ""            | Command line to be executed                                           |
| inheritHandles | `boolean`  | false         | Inheritance flag of the current process                               |
| flags          | `number`   | 0             | Flags that control the priority class and the creation of the process |
| cwd            | `string`   | process.cwd() | Full path to the current directory for the process                    |

### Return value
`Promise<object>`
  - *number* `processId` - Process identifier.
  - *number* `threadId` - Identifier of the main thread.
  - *Buffer* `processHandle` - Process handle.
  - *Buffer* `threadHandle` - Handle of the main thread.
### Example
```javascript
const { DETACHED_PROCESS, CREATE_NO_WINDOW, createProcess } = require('windows-process-manager')

try {
  const processInfo = await createProcess('full/path/to/file.exe', {
    flags: DETACHED_PROCESS | CREATE_NO_WINDOW
  })
} catch (e) {
  console.log(e)
}
```
### Useful references
[CreateProcessW](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw),
[Process Creation Flags](https://docs.microsoft.com/ru-ru/windows/win32/procthread/process-creation-flags)

## terminateProcess
```ts
async function terminateProcess(processHandle: Buffer, exitCode?: number): Promise<void> {}
```
Terminates the specified process and all of its threads.
### Parameters
#### Required
*Buffer* `processHandle` - A handle to the process to be terminated.  
#### Optional 
*number* `exitCode` - The exit code to be used by the process and threads terminated as a result of this call.  
**Default:** 0.

### Return value
`Promise<void>`
### Example
```javascript
const { createProcess, terminateProcess } = require('windows-process-manager')

try {
  const { processHandle } = await createProcess('full/path/to/file.exe')
  await terminateProcess(processHandle)
} catch (e) {
  console.log(e)
}
```
