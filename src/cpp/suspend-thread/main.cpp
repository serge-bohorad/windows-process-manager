#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeSuspendThread
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE threadHandle = *info[0].As<Buffer<HANDLE>>().Data();

  DWORD prevSuspendCount = SuspendThread(threadHandle);

  if (prevSuspendCount == -1)
  {
    Error::New(env, "Unable to suspend thread! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, prevSuspendCount);
}
} // namespace NodeSuspendThread