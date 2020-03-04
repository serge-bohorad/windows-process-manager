#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;

namespace NodeGetCurrentThreadHandle
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE handle = GetCurrentThread();

  return Buffer<HANDLE>::Copy(env, &handle, 1);
}
} // namespace NodeGetCurrentThreadHandle