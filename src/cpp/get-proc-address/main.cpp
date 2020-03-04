#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetProcAddress
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HMODULE moduleHandle = *info[0].As<Buffer<HMODULE>>().Data();
  string procName = info[1].ToString();

  FARPROC address = GetProcAddress(moduleHandle, procName.c_str());

  if (!address)
  {
    Error::New(env, "Unable to get procedure address! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();

    return env.Undefined();
  }

  return Buffer<FARPROC>::Copy(env, &address, 1);
}
} // namespace NodeGetProcAddress