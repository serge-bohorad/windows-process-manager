#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeOpenProcess
{
class OpenProcessWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  DWORD processId;
  DWORD accessRights;
  BOOL inheritHandle;

  HANDLE processHandle;

public:
  OpenProcessWorker(
      napi_env env,
      DWORD processId,
      DWORD accessRights,
      BOOL inheritHandle)
      : AsyncWorker(env),
        processId(processId),
        accessRights(accessRights),
        inheritHandle(inheritHandle),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    processHandle = OpenProcess(accessRights, inheritHandle, processId);

    if (!processHandle)
    {
      SetError("Unable to open process. Error code: " + to_string(GetLastError()));
    }
  }

  void OnOK() override
  {
    deferred.Resolve(Buffer<HANDLE>::Copy(Env(), &processHandle, 1));
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeOpenProcess
