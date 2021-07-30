#pragma once

#include <napi.h>

using namespace Napi;

namespace NodeSetThreadMemoryPriority
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();
  HANDLE ThreadHandle = *info[0].As<Buffer<HANDLE>>().Data();
  BOOL Success;
  MEMORY_PRIORITY_INFORMATION MemPrio;

  //
  // Set low memory priority on the current Thread.
  //

  ZeroMemory(&MemPrio, sizeof(MemPrio));
  unsigned int priority = info[1].ToNumber();
  MemPrio.MemoryPriority = (ULONG) priority;
  Success = SetThreadInformation(ThreadHandle,
                                 ThreadMemoryPriority,
                                 &MemPrio,
                                 sizeof(MemPrio));

  if (!Success) {
    Error::New(env, "Unable to set thread memory priority! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();
  }
  return env.Undefined();  
}
} // namespace NodeSetThreadMemoryPriority
