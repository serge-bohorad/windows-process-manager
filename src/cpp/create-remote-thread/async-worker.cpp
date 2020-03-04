#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeCreateRemoteThread
{
class CreateRemoteThreadWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  HANDLE processHandle;
  LPVOID startAddress;
  LPVOID parameter;
  SIZE_T stackSize;
  DWORD flags;

  HANDLE threadHandle;
  DWORD threadId;

public:
  CreateRemoteThreadWorker(
      napi_env env,
      HANDLE processHandle,
      LPVOID startAddress,
      LPVOID parameter,
      SIZE_T stackSize,
      DWORD flags)
      : AsyncWorker(env),
        processHandle(processHandle),
        startAddress(startAddress),
        parameter(parameter),
        stackSize(stackSize),
        flags(flags),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    threadHandle = CreateRemoteThread(
        processHandle,
        NULL,
        stackSize,
        reinterpret_cast<LPTHREAD_START_ROUTINE>(startAddress),
        parameter,
        flags,
        &threadId);

    if (!threadHandle)
    {
      SetError("Unable to create remote thread. Error code: " + to_string(GetLastError()));
    }
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
} // namespace NodeCreateRemoteThread
