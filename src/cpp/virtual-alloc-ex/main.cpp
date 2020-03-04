#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeVirtualAllocEx
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPVOID address = *info[1].As<Buffer<PVOID>>().Data();
  SIZE_T size = info[2].ToNumber().Int64Value();
  UINT32 allocationType = info[3].ToNumber();
  UINT32 protectType = info[4].ToNumber();

  LPVOID baseAddress = VirtualAllocEx(processHandle, address, size, allocationType, protectType);

  if (!baseAddress)
  {
    Error::New(env, "Unable to allocate virtual memory! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Buffer<LPVOID>::Copy(env, &baseAddress, 1);
}
} // namespace NodeVirtualAllocEx
