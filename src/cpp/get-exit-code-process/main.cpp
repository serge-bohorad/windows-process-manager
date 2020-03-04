#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetExitCodeProcess
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();

  DWORD exitCode;

  BOOL result = GetExitCodeProcess(processHandle, &exitCode);

  if (!result)
  {
    Error::New(env, "Unable to get exit code process. Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, exitCode);
}
} // namespace NodeGetExitCodeProcess