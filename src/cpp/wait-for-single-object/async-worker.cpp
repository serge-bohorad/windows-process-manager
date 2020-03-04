#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeWaitForSingleObject
{
class WaitForSingleObjectWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  HANDLE objectHandle;
  DWORD milliseconds;

  DWORD result;

public:
  WaitForSingleObjectWorker(
      napi_env env,
      HANDLE objectHandle,
      DWORD milliseconds)
      : AsyncWorker(env),
        objectHandle(objectHandle),
        milliseconds(milliseconds),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    result = WaitForSingleObject(objectHandle, milliseconds);

    if (result == WAIT_FAILED)
    {
      SetError("Unable to wait for single object. Error code: " + to_string(GetLastError()));
    }
  }

  void OnOK() override
  {
    deferred.Resolve(Number::New(Env(), result));
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeWaitForSingleObject
