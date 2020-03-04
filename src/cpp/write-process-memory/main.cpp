#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeWriteProcessMemory
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPVOID baseAddress = *info[1].As<Buffer<PVOID>>().Data();
  LPCVOID buffer = info[2].As<Buffer<PVOID>>().Data();
  SIZE_T size = info[3].ToNumber().Int64Value();

  SIZE_T writtenCount;

  BOOL result = WriteProcessMemory(processHandle, baseAddress, buffer, size, &writtenCount);

  if (!result)
  {
    Error::New(env, "Unable to write process memory! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Number::New(env, writtenCount);
}
} // namespace NodeWriteProcessMemory