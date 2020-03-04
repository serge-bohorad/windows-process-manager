#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeVirtualFreeEx
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPVOID address = *info[1].As<Buffer<PVOID>>().Data();
  SIZE_T size = info[2].ToNumber().Int64Value();
  UINT32 freeType = info[3].ToNumber();

  BOOL result = VirtualFreeEx(processHandle, address, size, freeType);

  if (!result)
  {
    Error::New(env, "Unable to free virtual memory! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();
  }

  return env.Undefined();
}
} // namespace NodeVirtualFreeEx
