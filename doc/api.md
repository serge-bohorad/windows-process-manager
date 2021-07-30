> ⚠ Note that almost all functions may throw an exception. If a function throws an exception, call the function only in a **try catch** block, or use a **catch** function of Promise if it returns a promise.  

> ⚠ All functions uses Unicode version of winapi. If you are using a Buffer from a string, encode the buffer with **utf16le**.

## Navigation
- [createProcess](#createprocess)
- [terminateProcess](#terminateprocess)
- [openProcess](#openprocess)
- [closeHandle](#closehandle)
- [getProcessEntry](#getprocessentry)
- [getCurrentProcessHandle](#getcurrentprocesshandle)
- [setProcessMemoryPriority](#setprocessmemorypriority)
- [getProcessTimes](#getprocesstimes)
- [getExitCodeProcess](#getexitcodeprocess)
- [virtualAllocEx](#virtualallocex)
- [virtualFreeEx](#virtualfreeex)
- [virtualProtectEx](#virtualprotectex)
- [writeProcessMemory](#writeprocessmemory)
- [readProcessMemory](#readprocessmemory)
- [getModuleHandle](#getmodulehandle)
- [getProcAddress](#getprocaddress)
- [createRemoteThread](#createremotethread)
- [waitForSingleObject](#waitforsingleobject)
- [getCurrentThreadHandle](#getcurrentthreadhandle)
- [getCurrentThreadId](#getcurrentthreadid)
- [getThreadTimes](#getthreadtimes)
- [getExitCodeThread](#getexitcodethread)
- [setThreadMemoryPriority](#setthreadmemorypriority)
- [openThread](#openthread)
- [suspendThread](#suspendthread)
- [resumeThread](#resumethread)
- [terminateThread](#terminatethread)
- [injectDll](#injectdll)

## createProcess
```typescript
async function createProcess(exeFile: string, options?: Options): Promise<ProcessInfo> {}
```

Creates a new process and its primary thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*string* `exeFile` - The full path to an .exe file.  

#### Optional 
*object* `options`

| Name           | Type       | Default       | Description                                                           |
| -------------- | ---------- | ------------- | --------------------------------------------------------------------- |
| args           | `string`   | ""            | Command line to be executed                                           |
| inheritHandles | `boolean`  | false         | Inheritance flag of the current process                               |
| flags          | `number`   | 0             | Flags that control the priority class and the creation of the process |
| cwd            | `string`   | process.cwd() | Full path to the current directory for the process                    |

### Return value
`Promise<ProcessInfo>` The process information.

`ProcessInfo`
  - *number* `processId` - The process identifier.
  - *number* `threadId` - The main thread identifier.
  - *Buffer* `processHandle` - The process handle.
  - *Buffer* `threadHandle` - The main thread handle. 
  
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
```typescript
async function terminateProcess(processHandle: Buffer, exitCode?: number): Promise<void> {}
```

Terminates the specified process and all of its threads.

**Note:** if the function failed, an exception will be thrown.

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
### Useful references
[TerminateProcess](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-terminateprocess)

## openProcess
```typescript
async function openProcess(processId: number, options?: Options): Promise<Buffer> {}
```

Opens an existing local process object.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*number* `processId` - The identifier of the local process to be opened.  

#### Optional 
*object* `options`

| Name           | Type       | Default            | Description                             |
| -------------- | ---------- | ------------------ | --------------------------------------- |
| accessRights   | `number`   | PROCESS_ALL_ACCESS | The access to the process object        |
| inheritHandles | `boolean`  | false              | Inheritance flag of the current process |

### Return value
`Promise<Buffer>` An open handle to the specified process.  
  
### Example
```javascript
const { PROCESS_VM_OPERATION, openProcess, terminateProcess } = require('windows-process-manager')

try {
  const processHandle = await openProcess(process.pid, { accessRights: PROCESS_VM_OPERATION })
  await terminateProcess(processHandle)
} catch (e) {
  console.log(e)
}
```

### Useful references
[OpenProcess](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-openprocess),
[Process Security and Access Rights](https://docs.microsoft.com/ru-ru/windows/win32/procthread/process-security-and-access-rights)

## closeHandle
```typescript
function closeHandle(handle: Buffer): void {}
```

Closes an open object handle.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `handle` - A valid handle to an open object. 

### Return value
`void`

### Example
```javascript
const { openProcess, closeHandle } = require('windows-process-manager')

try {
  const processHandle = await openProcess(process.pid)
  closeHandle(processHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[CloseHandle](https://docs.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-closehandle)

## getProcessEntry
```typescript
async function getProcessEntry(processName: string): Promise<ProcessEntry> {}
```

Retrieves system entry of a specific process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*string* `processName` - Process name. 

### Return value
`Promise<ProcessEntry>` Process system entry.

`ProcessEntry`
  - *number* `processId` - The process identifier.
  - *number* `threadCount` - The number of execution threads started by the process.
  - *number* `parentProcessId` - The identifier of the process that created this process.
  - *number* `threadPriority` - The base priority of any threads created by this process. 

### Example
```javascript
const { getProcessEntry } = require('windows-process-manager')

try {
  const { threadCount } = await getProcessEntry('process-name')
  console.log('Thread count: ' + threadCount)
} catch (e) {
  console.log(e)
}
```
### Useful references
[PROCESSENTRY32W structure](https://docs.microsoft.com/ru-ru/windows/win32/api/tlhelp32/ns-tlhelp32-processentry32w)

## getCurrentProcessHandle
```typescript
function getCurrentProcessHandle(): Buffer {}
```

Retrieves a pseudo handle for the current process. 

### Return value
`Buffer` The current process handle

### Example
```javascript
const { getCurrentProcessHandle, terminateProcess } = require('windows-process-manager')

try {
  const processHandle = getCurrentProcessHandle()
  await terminateProcess(processHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetCurrentProcess](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getcurrentprocess)

## setProcessMemoryPriority
```typescript
function setProcessMemoryPriority(processHandle: Buffer, priority: number): void {}
```

Sets the memory priority of the Process. The following constants define the priorities:
* MEMORY_PRIORITY_VERY_LOW (1)
* MEMORY_PRIORITY_LOW (2)
* MEMORY_PRIORITY_MEDIUM (3)
* MEMORY_PRIORITY_BELOW_NORMAL (4)
* MEMORY_PRIORITY_NORMAL (5)

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - A handle to the Process. 

#### Required
*number* `priority` - The memory priority.


### Example
```javascript
const { getCurrentProcessHandle, setProcessMemoryPriority } = require('windows-process-manager')

try {
  const processHandle = getCurrentProcessHandle()
  const exitCode = setProcessMemoryPriority(processHandle, MEMORY_PRIORITY_BELOW_NORMAL)
} catch (e) {
  console.log(e)
}
```
### Useful references
[SetProcessInformation](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-setprocessinformation)

## getProcessTimes
```typescript
async function getProcessTimes(processHandle: Buffer): Promise<Times> {}
```

Retrieves timing information for the specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - The process handle. 

### Return value
`Promise<Times>` Process times.

`Time`
  - *number* `year` - The year. 1601 through 30827.
  - *number* `month` - The month. 1 through 12.
  - *number* `dayOfWeek` - The day of the week. 0 through 6.
  - *number* `day` - The day of the month. 1 through 31.
  - *number* `hour` - The hour. 0 through 23.
  - *number* `minute` - The minute. 0 through 59.
  - *number* `second` - The second. 0 through 59.
  - *number* `milliseconds` - The millisecond. 0 through 999. 
  
`Times`
  - *Time* `creationTime` - The creation time of the process.
  - *Time* `exitTime` - The exit time of the process.
  - *Time* `kernelTime` - The amount of time that the process has executed in kernel mode.
  - *Time* `userTime` - The amount of time that the process has executed in user mode.

### Example
```javascript
const { getCurrentProcessHandle, getProcessTimes } = require('windows-process-manager')

try {
  const processHandle = getCurrentProcessHandle()
  const { creationTime } = await getProcessTimes(processHandle)
  const { hour, minute, second } = creationTime
  console.log(`Creation time: ${hour}:${minute}:${second}`)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetProcessTimes](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getprocesstimes), 
[SYSTEMTIME structure](https://docs.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime)

## getExitCodeProcess
```typescript
function getExitCodeProcess(processHandle: Buffer): number {}
```

Retrieves the termination status of the specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - A handle to the process. 

### Return value
`number` Exit code.

### Example
```javascript
const { getCurrentProcessHandle, getExitCodeProcess } = require('windows-process-manager')

try {
  const processHandle = getCurrentProcessHandle()
  const exitCode = getExitCodeProcess(processHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetExitCodeProcess](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getexitcodeprocess)

## virtualAllocEx
```typescript
function virtualAllocEx(processHandle: Buffer, size: number, options?: Options): Buffer {}
```

Reserves, commits, or changes the state of a region of memory within the virtual address space of a specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - The process handle.   
*number* `size` - The size of the region of memory to allocate, in bytes. 

#### Optional 
*object* `options`

| Name           | Type       | Default                   | Description                                   |
| -------------- | ---------- | ------------------------- | --------------------------------------------- |
| address        | `Buffer`   | Empty Buffer              | The starting address for the region of pages  |
| allocationType | `number`   | MEM_RESERVE \| MEM_COMMIT | The type of memory allocation                 |
| protectType    | `number`   | PAGE_READWRITE            | The memory protection for the region of pages |

### Return value
`Buffer` Allocated region
  
### Example
```javascript
const { getCurrentProcessHandle, virtualAllocEx } = require('windows-process-manager')

try {
  const buffer = Buffer.from('Hello world', 'utf16le')
  const processHandle = getCurrentProcessHandle()
  const allocatedRegion = virtualAllocEx(processHandle, buffer.byteLength)
} catch (e) {
  console.log(e)
}
```

### Useful references
[VirtualAllocEx](https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualallocex),
[Memory Protection Constants](https://docs.microsoft.com/ru-ru/windows/win32/memory/memory-protection-constants)

## virtualFreeEx
```typescript
export function virtualFreeEx(processHandle: Buffer, address: Buffer, size: number, freeType?: number): void {}
```

Releases, decommits, or releases and decommits a region of memory within the virtual address space of a specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - The process handle.     
*Buffer* `address` - The starting address of the region of memory to be freed.  
*number* `size` - The size of the region of memory to free, in bytes. 

#### Optional
*number* `freeType` - The type of free operation.  
**Default:** MEM_RELEASE.

### Return value
`void`
  
### Example
```javascript
const { getCurrentProcessHandle, virtualAllocEx, virtualFreeEx } = require('windows-process-manager')

try {
  const buffer = Buffer.from('Hello world', 'utf16le')
  const processHandle = getCurrentProcessHandle()
  const allocatedRegion = virtualAllocEx(processHandle, buffer.byteLength)
  virtualFreeEx(processHandle, allocatedRegion, 0)
} catch (e) {
  console.log(e)
}
```

### Useful references
[VirtualFreeEx](https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualfreeex)

## virtualProtectEx
```typescript
function virtualProtectEx(processHandle: Buffer, address: Buffer, size: number, protectType: number): number {}
```

Changes the protection on a region of committed pages in the virtual address space of a specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - The process handle.   
*Buffer* `address` - The base address of the region of pages.  
*number* `size` - The size of the region whose access protection attributes are changed, in bytes.  
*number* `protectType` - The memory protection for the region of pages.

### Return value
`number` Previous protection type of the region.
  
### Example
```javascript
const {
  PAGE_READONLY,
  PAGE_READWRITE,
  getCurrentProcessHandle,
  virtualAllocEx
} = require('windows-process-manager')

try {
  const processHandle = getCurrentProcessHandle()
  const addressSpace = virtualAllocEx(processHandle, 100, { protectType: PAGE_READONLY })
  virtualProtectEx(processHandle, addressSpace, 100, PAGE_READWRITE)
} catch (e) {
  console.log(e)
}

```

### Useful references
[VirtualProtectEx](https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotectex),
[Memory Protection Constants](https://docs.microsoft.com/ru-ru/windows/win32/memory/memory-protection-constants)

## writeProcessMemory
```typescript
function writeProcessMemory(processHandle: Buffer, baseAddress: Buffer, data: Buffer, size: number): number {}
```

Writes data to an area of memory in a specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - A handle to the process.   
*Buffer* `baseAddress` - The base address in the specified process to which data is written.    
*Buffer* `data` - The buffer that contains data to be written in the address space of the specified process.   
*number* `size` - The number of bytes to be written to the specified process.

### Return value
`number` The number of bytes transferred into the specified process.

### Example
```javascript
const {
  getCurrentProcessHandle,
  virtualAllocEx,
  writeProcessMemory,
  virtualFreeEx
} = require('windows-process-manager')

try {
  const buffer = Buffer.from('Hello world', 'utf16le')
  const processHandle = getCurrentProcessHandle()
  const allocatedRegion = virtualAllocEx(processHandle, buffer.byteLength)
  writeProcessMemory(processHandle, allocatedRegion, buffer, buffer.byteLength)
  virtualFreeEx(processHandle, allocatedRegion, 0)
} catch (e) {
  console.log(e)
}
```
### Useful references
[WriteProcessMemory](https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-writeprocessmemory)

## readProcessMemory
```typescript
function readProcessMemory(processHandle: Buffer, baseAddress: Buffer, size: number): Buffer {}
```

Read memory of a specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - A handle to the process.     
*Buffer* `baseAddress` - The base address in the specified process from which to read.    
*number* `size` - The number of bytes to be read from the specified process.

### Return value
`Buffer` The buffer of the contents from the address space of the specified process.

### Example
```javascript
const { getCurrentProcessHandle, readProcessMemory } = require('windows-process-manager')

try {
  const address = Buffer.from('0000000032afc700', 'hex')
  const processHandle = getCurrentProcessHandle()
  const buffer = readProcessMemory(processHandle, address, 64)
} catch (e) {
  console.log(e)
}
```
### Useful references
[ReadProcessMemory](https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-readprocessmemory)

## getModuleHandle
```typescript
function getModuleHandle(moduleName: string): Buffer {}
```

Retrieves a module handle for the specified module.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*string* `moduleName` - The name of the loaded module.     

### Return value
`Buffer` A handle to the specified module.

### Example
```javascript
const { getModuleHandle, getProcAddress } = require('windows-process-manager')

try {
  const kernelHandle = getModuleHandle('kernel32.dll')
  const CreateProcessW = getProcAddress(kernelHandle, 'CreateProcessW')
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetModuleHandleW](https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-getmodulehandlew)

## getProcAddress
```typescript
function getProcAddress(moduleHandle: Buffer, procName: string): Buffer {}
```

Retrieves the address of an exported function or variable from the specified dynamic-link library (DLL).

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `moduleHandle` - A handle to the DLL module that contains the function or variable.    
*string* `procName` - The function or variable name, or the function's ordinal value.

### Return value
`Buffer` The address of the exported function or variable.

### Example
```javascript
const { getModuleHandle, getProcAddress } = require('windows-process-manager')

try {
  const kernelHandle = getModuleHandle('kernel32.dll')
  const VirtualProtectEx = getProcAddress(kernelHandle, 'VirtualProtectEx')
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetProcAddress](https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-getprocaddress)

## createRemoteThread
```typescript
async function createRemoteThread(processHandle: Buffer, startAddress: Buffer, options?: Options): Promise<ThreadInfo> {}
```

Creates a thread that runs in the virtual address space of another process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `processHandle` - A handle to the process in which the thread is to be created.  
*Buffer* `startAddress ` - The application-defined function.


#### Optional 
*object* `options`

| Name           | Type       | Default       | Description                                        |
| -------------- | ---------- | ------------- | -------------------------------------------------- |
| parameter      | `Buffer`   | Empty Buffer  | A variable to be passed to the thread function     |
| stackSize      | `number`   | 0             | The initial size of the stack, in bytes            |
| flags          | `number`   | 0             | The flags that control the creation of the thread  |

### Return value
`Promise<ThreadInfo>` The thread information.

`ThreadInfo`
  - *number* `threadId` - The thread identifier.
  - *Buffer* `threadHandle` - A handle to the new thread. 
  
### Example
```javascript
const {
  createProcess,
  getModuleHandle,
  getProcAddress,
  virtualAllocEx,
  writeProcessMemory,
  createRemoteThread
} = require('windows-process-manager')

try {
  const pathBuffer = Buffer.from('path/to/file.dll', 'utf16le')
  const { processHandle } = await createProcess('path/to/file.exe')
  const addressSpace = virtualAllocEx(processHandle, pathBuffer.byteLength)
  writeProcessMemory(processHandle, addressSpace, pathBuffer, pathBuffer.byteLength)
  const LoadLibraryW = getProcAddress(getModuleHandle('kernel32.dll'), 'LoadLibraryW')
  await createRemoteThread(processHandle, LoadLibraryW, { parameter: addressSpace })
} catch (e) {
  console.log(e)
}
```

### Useful references
[CreateRemoteThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createremotethread)

## waitForSingleObject
```typescript
async function waitForSingleObject(objectHandle: Buffer, milliseconds: number): Promise<number> {}
```

Waits until the specified object is in the signaled state or the time-out interval elapses.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `objectHandle` - A handle to the object.    
*number* `milliseconds` - The time-out interval.

### Return value
`Promise<number>` The event that caused the function to return

### Example
```javascript
const {
  INFINITE,
  createProcess,
  createRemoteThread,
  waitForSingleObject
} = require('windows-process-manager')

try {
  const emptyBuffer = Buffer.alloc(0)
  const { processHandle } = await createProcess('path/to/file.exe')
  const { threadHandle } = await createRemoteThread(processHandle, emptyBuffer)
  await waitForSingleObject(threadHandle, INFINITE)
} catch (e) {
  console.log(e)
}
```
### Useful references
[WaitForSingleObject](https://docs.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitforsingleobject)

## getCurrentThreadHandle
```typescript
function getCurrentThreadHandle(): Buffer {}
```

Retrieves a pseudo handle for the calling thread. 

### Return value
`Buffer` The current thread handle

### Example
```javascript
const { getCurrentThreadHandle, terminateThread } = require('windows-process-manager')

try {
  const threadHandle = getCurrentThreadHandle()
  await terminateThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetCurrentThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getcurrentthread)

## getCurrentThreadId
```typescript
function getCurrentThreadId(): number {}
```

Retrieves the thread identifier of the calling thread. 

### Return value
`number` The thread identifier of the calling thread.

### Example
```javascript
const { getCurrentThreadId, openThread } = require('windows-process-manager')

try {
  const threadId = getCurrentThreadId()
  const threadHandle = await openThread(threadId)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetCurrentThreadId](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getcurrentthreadid)

## getThreadTimes
```typescript
async function getThreadTimes(threadHandle: Buffer): Promise<Times> {}
```

Retrieves timing information for the specified thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - The thread handle. 

### Return value
`Promise<Times>` Thread times.

`Time`
  - *number* `year` - The year. 1601 through 30827.
  - *number* `month` - The month. 1 through 12.
  - *number* `dayOfWeek` - The day of the week. 0 through 6.
  - *number* `day` - The day of the month. 1 through 31.
  - *number* `hour` - The hour. 0 through 23.
  - *number* `minute` - The minute. 0 through 59.
  - *number* `second` - The second. 0 through 59.
  - *number* `milliseconds` - The millisecond. 0 through 999. 
  
`Times`
  - *Time* `creationTime` - The creation time of the thread.
  - *Time* `exitTime` - The exit time of the thread.
  - *Time* `kernelTime` - The amount of time that the thread has executed in kernel mode.
  - *Time* `userTime` - The amount of time that the thread has executed in user mode.

### Example
```javascript
const { getCurrentThreadHandle, getThreadTimes } = require('windows-process-manager')

try {
  const threadHandle = getCurrentThreadHandle()
  const { creationTime } = await getThreadTimes(threadHandle)
  const { hour, minute, second } = creationTime
  console.log(`Creation time: ${hour}:${minute}:${second}`)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetThreadTimes](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getthreadtimes), 
[SYSTEMTIME structure](https://docs.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime)

## setThreadMemoryPriority
```typescript
function setThreadMemoryPriority(threadHandle: Buffer, priority: number): void {}
```

Sets the memory priority of the thread. The following constants define the priorities:
* MEMORY_PRIORITY_VERY_LOW (1)
* MEMORY_PRIORITY_LOW (2)
* MEMORY_PRIORITY_MEDIUM (3)
* MEMORY_PRIORITY_BELOW_NORMAL (4)
* MEMORY_PRIORITY_NORMAL (5)

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - A handle to the thread. 

#### Required
*number* `priority` - The memory priority.


### Example
```javascript
const { getCurrentThreadHandle, setThreadMemoryPriority } = require('windows-process-manager')

try {
  const threadHandle = getCurrentThreadHandle()
  const exitCode = setThreadMemoryPriority(threadHandle, MEMORY_PRIORITY_BELOW_NORMAL)
} catch (e) {
  console.log(e)
}
```
### Useful references
[SetThreadInformation](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-setthreadinformation)

## getExitCodeThread
```typescript
function getExitCodeThread(threadHandle: Buffer): number {}
```

Retrieves the termination status of the specified thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - A handle to the thread. 

### Return value
`number` Exit code.

### Example
```javascript
const { getCurrentThreadHandle, getExitCodeThread } = require('windows-process-manager')

try {
  const threadHandle = getCurrentThreadHandle()
  const exitCode = getExitCodeThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[GetExitCodeThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getexitcodethread)

## openThread
```typescript
async function openThread(threadId: number, options?: Options): Promise<Buffer> {
```

Opens an existing thread object.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*number* `threadId` - The identifier of the thread to be opened.  

#### Optional 
*object* `options`

| Name           | Type       | Default           | Description                             |
| -------------- | ---------- | ----------------- | --------------------------------------- |
| accessRights   | `number`   | THREAD_ALL_ACCESS | The access to the thread object         |
| inheritHandles | `boolean`  | false             | Inheritance flag of the current process |

### Return value
`Promise<Buffer>` An open handle to the specified thread.  
  
### Example
```javascript
const {
  THREAD_TERMINATE,
  getCurrentThreadId,
  openThread,
  terminateThread
} = require('windows-process-manager')

try {
  const threadId = getCurrentThreadId()
  const threadHandle = await openThread(threadId, { accessRights: THREAD_TERMINATE })
  await terminateThread(threadHandle)
} catch (e) {
  console.log(e)
}
```

### Useful references
[OpenThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-openthread),
[Thread Security and Access Rights](https://docs.microsoft.com/ru-ru/windows/win32/procthread/thread-security-and-access-rights)

## suspendThread
```typescript
function suspendThread(threadHandle: Buffer): number {}
```

Suspends the specified thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - A handle to the thread that is to be suspended. 

### Return value
`number` The thread's previous suspend count.

### Example
```javascript
const {
  getCurrentProcessHandle,
  createRemoteThread,
  suspendThread
} = require('windows-process-manager')

try {
  const emptyBuffer = Buffer.alloc(8)
  const processHandle = getCurrentProcessHandle()
  const { threadHandle } = await createRemoteThread(processHandle, emptyBuffer)
  suspendThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[SuspendThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-suspendthread)

## resumeThread
```typescript
function resumeThread(threadHandle: Buffer): number {}
```

Resume the specified suspended thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - A handle to the thread to be restarted. 

### Return value
`number` The thread's previous suspend count.

### Example
```javascript
const {
  CREATE_SUSPENDED,
  getCurrentProcessHandle,
  createRemoteThread,
  resumeThread
} = require('windows-process-manager')

try {
  const emptyBuffer = Buffer.alloc(8)
  const processHandle = getCurrentProcessHandle()
  const { threadHandle } = await createRemoteThread(processHandle, emptyBuffer, {
    flags: CREATE_SUSPENDED
  })
  resumeThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[ResumeThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-resumethread)

## terminateThread
```typescript
async function terminateThread(threadHandle: Buffer, exitCode?: number): Promise<void> {}
```

Terminates the specified thread.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*Buffer* `threadHandle` - A handle to the thread to be terminated. 

#### Optional 
*number* `exitCode` - The exit code for the thread.    
**Default:** 0.

### Return value
`Promise<void>`

### Example
```javascript
const { getCurrentThreadHandle, terminateThread } = require('windows-process-manager')

try {
  const threadHandle = getCurrentThreadHandle()
  await terminateThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
### Useful references
[TerminateThread](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-terminatethread)

## injectDll
```typescript
async function injectDll(processId: number, dllFile: string, options?: Options): Promise<number> {}
```

Injects the specified Dynamic Link Library(DLL) into the specified process.

**Note:** if the function failed, an exception will be thrown.

### Parameters

#### Required
*number* `processId` - The process identifier.    
*string* `dllFile` - The full path to the specified DLL.      

#### Optional 
*object* `options`

| Name           | Type       | Default  | Description                                                                      |
| -------------- | ---------- | -------- | -------------------------------------------------------------------------------- |
| waitingTimeout | `number`   | INFINITE | The time-out interval that the function waits until a new thread signaled or the interval elapses. |

### Return value
`Promise<number>` The thread identifier.
  
### Example
```javascript
const { createProcess, injectDll, resumeThread } = require('windows-process-manager')

try {
  const { processId, threadHandle } = await createProcess('full/path/to/file.exe', {
    flags: CREATE_SUSPENDED
  })
  await injectDll(processId, 'full/path/to/file.dll')
  resumeThread(threadHandle)
} catch (e) {
  console.log(e)
}
```
