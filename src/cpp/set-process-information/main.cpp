#pragma once

#include <napi.h>

using namespace Napi;

namespace NodeSetProcessMemoryPriority
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();
  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  BOOL Success;
  MEMORY_PRIORITY_INFORMATION MemPrio;

  //
  // Set low memory priority on the current process.
  //

  ZeroMemory(&MemPrio, sizeof(MemPrio));
  unsigned int priority = info[1].ToNumber();
  MemPrio.MemoryPriority = (ULONG) priority;
  Success = SetProcessInformation(processHandle,
                                 ProcessMemoryPriority,
                                 &MemPrio,
                                 sizeof(MemPrio));

  if (!Success) {
    Error::New(env, "Unable to set process memory priority! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();
  }
  return env.Undefined();  
}
} // namespace NodeSetProcessMemoryPriority

#if WINVER >= 0x0B00 // will be available in Windows 11
namespace NodeSetProcessPowerThrottling
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();
  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();

  PROCESS_POWER_THROTTLING_STATE PowerThrottling;
  RtlZeroMemory(&PowerThrottling, sizeof(PowerThrottling));
  PowerThrottling.Version = PROCESS_POWER_THROTTLING_CURRENT_VERSION;
  // ControlMask selects the mechanism and StateMask declares which mechanism should be on or off.
  PowerThrottling.ControlMask = PROCESS_POWER_THROTTLING_EXECUTION_SPEED;
  PowerThrottling.StateMask = info[1].ToBoolean() ? PROCESS_POWER_THROTTLING_EXECUTION_SPEED : 0;

  Success = SetProcessInformation(GetCurrentProcess(),
                        ProcessPowerThrottling, 
                        &PowerThrottling, 
                        sizeof(PowerThrottling));
  if (!Success) {
    Error::New(env, "Unable to set process power throttling! Error code: " + to_string(GetLastError())).ThrowAsJavaScriptException();
  }
  return env.Undefined();  
}
} // namespace NodeSetProcessMemoryPriority

#endif
