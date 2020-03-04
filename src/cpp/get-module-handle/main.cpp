#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetModuleHandle
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  u16string moduleName = info[0].ToString();

  wstring finalModuleName = wstring(moduleName.begin(), moduleName.end());

  HMODULE moduleHandle = GetModuleHandleW(finalModuleName.c_str());

  if (!moduleHandle)
  {
    Error::New(env, "Unable to get module handle! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Buffer<HMODULE>::Copy(env, &moduleHandle, 1);
}
} // namespace NodeGetModuleHandle