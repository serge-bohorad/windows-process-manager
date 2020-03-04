#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeResumeThread
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE threadHandle = *info[0].As<Buffer<HANDLE>>().Data();

  DWORD prevSuspendCount = ResumeThread(threadHandle);

  if (prevSuspendCount == -1)
  {
    Error::New(env, "Unable to resume thread! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, prevSuspendCount);
}
} // namespace NodeResumeThread