> ⚠ Note that all functions may throw an error. Call functions only in the **try catch** block, or use the **catch** function if a function returns a promise.

## createProcess
```ts
async function createProcess(exeFile: string, options?: Options): Promise<ProcessInfo>
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
*Promise\<object\>* `processInfo`
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
