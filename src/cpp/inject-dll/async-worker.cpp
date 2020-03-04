#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeInjectDll
{
class InjectDllWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  DWORD processId;
  wstring dllFile;
  DWORD waitingTimeout;

  DWORD threadId;
  HANDLE threadHandle;

public:
  InjectDllWorker(
      napi_env env,
      DWORD processId,
      wstring dllFile,
      DWORD waitingTimeout)
      : AsyncWorker(env),
        processId(processId),
        dllFile(dllFile),
        waitingTimeout(waitingTimeout),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    HANDLE processHandle = OpenProcess(PROCESS_ALL_ACCESS, FALSE, processId);

    if (!processHandle)
    {
      return SetError("Unable to inject dll. Failed to open process. Error code: " + to_string(GetLastError()));
    }

    SIZE_T dllFileSize = dllFile.size() * sizeof(wchar_t);

    LPVOID addressSpace = VirtualAllocEx(processHandle, NULL, dllFileSize, MEM_RESERVE | MEM_COMMIT, PAGE_READWRITE);

    if (!addressSpace)
    {
      CloseHandle(processHandle);

      return SetError("Unable to inject dll. Failed to allocate memory. Error code: " + to_string(GetLastError()));
    }

    WriteProcessMemory(processHandle, addressSpace, dllFile.c_str(), dllFileSize, NULL);

    LPVOID LoadLibraryWide = reinterpret_cast<LPVOID>(GetProcAddress(GetModuleHandleA("kernel32.dll"), "LoadLibraryW"));

    threadHandle = CreateRemoteThread(
        processHandle,
        NULL,
        NULL,
        reinterpret_cast<LPTHREAD_START_ROUTINE>(LoadLibraryWide),
        addressSpace,
        NULL,
        &threadId);

    if (!threadHandle)
    {
      VirtualFreeEx(processHandle, addressSpace, 0, MEM_RELEASE);
      CloseHandle(processHandle);

      return SetError("Unable to inject dll. Failed to create remote thread. Error code: " + to_string(GetLastError()));
    }

    if (!waitingTimeout)
    {
      CloseHandle(processHandle);
      return;
    }

    WaitForSingleObject(threadHandle, waitingTimeout);

    VirtualFreeEx(processHandle, addressSpace, 0, MEM_RELEASE);
    CloseHandle(processHandle);
  }

  void OnOK() override
  {
    Object info = Object::New(Env());

    info.Set("threadId", threadId);
    info.Set("threadHandle", Buffer<HANDLE>::Copy(Env(), &threadHandle, 1));

    deferred.Resolve(info);
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeInjectDll
