#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeOpenThread
{
class OpenThreadWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  DWORD threadId;
  DWORD accessRights;
  BOOL inheritHandle;

  HANDLE threadHandle;

public:
  OpenThreadWorker(
      napi_env env,
      DWORD threadId,
      DWORD accessRights,
      BOOL inheritHandle)
      : AsyncWorker(env),
        threadId(threadId),
        accessRights(accessRights),
        inheritHandle(inheritHandle),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    threadHandle = OpenThread(accessRights, inheritHandle, threadId);

    if (!threadHandle)
    {
      SetError("Unable to open thread. Error code: " + to_string(GetLastError()));
    }
  }

  void OnOK() override
  {
    deferred.Resolve(Buffer<HANDLE>::Copy(Env(), &threadHandle, 1));
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeOpenThread
