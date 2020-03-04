#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeReadProcessMemory
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPCVOID baseAddress = *info[1].As<Buffer<PVOID>>().Data();
  SIZE_T size = info[2].ToNumber().Int64Value();

  vector<char> buffer(size);

  BOOL result = ReadProcessMemory(processHandle, baseAddress, buffer.data(), size, NULL);

  if (!result)
  {
    Error::New(env, "Unable to read process memory! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Buffer<char>::Copy(env, buffer.data(), size);
}
} // namespace NodeReadProcessMemory