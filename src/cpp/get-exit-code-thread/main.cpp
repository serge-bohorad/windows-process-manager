#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetExitCodeThread
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE threadHandle = *info[0].As<Buffer<HANDLE>>().Data();

  DWORD exitCode;

  BOOL result = GetExitCodeThread(threadHandle, &exitCode);

  if (!result)
  {
    Error::New(env, "Unable to get exit code thread. Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, exitCode);
}
} // namespace NodeGetExitCodeThread