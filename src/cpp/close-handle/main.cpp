#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeCloseHandle
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE handle = *info[0].As<Buffer<HANDLE>>().Data();

  BOOL result = CloseHandle(handle);

  if (!result)
  {
    Error::New(env, "Unable to close handle! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();
  }

  return env.Undefined();
}
} // namespace NodeCloseHandle