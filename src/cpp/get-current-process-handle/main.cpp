#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;

namespace NodeGetCurrentProcessHandle
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE handle = GetCurrentProcess();

  return Buffer<HANDLE>::Copy(env, &handle, 1);
}
} // namespace NodeGetCurrentProcess