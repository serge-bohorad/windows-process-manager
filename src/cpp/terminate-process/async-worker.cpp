#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeTerminateProcess
{
class TerminateProcessWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  HANDLE processHandle;
  UINT exitCode;

public:
  TerminateProcessWorker(
      napi_env env,
      HANDLE processHandle,
      UINT exitCode)
      : AsyncWorker(env),
        processHandle(processHandle),
        exitCode(exitCode),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    BOOL result = TerminateProcess(processHandle, exitCode);

    if (!result)
    {
      SetError("Unable to terminate process! Error code: " + to_string(GetLastError()));
    }
  }

  void OnOK() override
  {
    deferred.Resolve(Env().Undefined());
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeTerminateProcess
