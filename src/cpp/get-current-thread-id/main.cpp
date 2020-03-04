#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;

namespace NodeGetCurrentThreadId
{
Value init(const CallbackInfo &info)
{
  DWORD threadId = GetCurrentThreadId();

  return Number::New(info.Env(), threadId);
}
} // namespace NodeGetCurrentThreadId