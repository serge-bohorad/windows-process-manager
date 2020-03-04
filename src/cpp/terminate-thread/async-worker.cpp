#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeTerminateThread
{
class TerminateThreadWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  HANDLE threadHandle;
  UINT exitCode;

public:
  TerminateThreadWorker(
      napi_env env,
      HANDLE threadHandle,
      UINT exitCode)
      : AsyncWorker(env),
        threadHandle(threadHandle),
        exitCode(exitCode),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    BOOL result = TerminateThread(threadHandle, exitCode);

    if (!result)
    {
      SetError("Unable to terminate thread! Error code: " + to_string(GetLastError()));
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
} // namespace NodeTerminateThread
