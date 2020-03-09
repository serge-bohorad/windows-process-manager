#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeVirtualProtectEx
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPVOID address = *info[1].As<Buffer<PVOID>>().Data();
  SIZE_T size = info[2].ToNumber().Int64Value();
  UINT32 protectType = info[3].ToNumber();

  DWORD oldProtectType;

  BOOL result = VirtualProtectEx(processHandle, address, size, protectType, &oldProtectType);

  if (!result)
  {
    Error::New(env, "Unable to protect virtual memory! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, oldProtectType);
}
} // namespace NodeVirtualProtectEx
