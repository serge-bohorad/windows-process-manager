#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeCreateRemoteThread
{
Value init(const CallbackInfo &info)
{
  Env env = info.Env();

  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  LPVOID startAddress = *info[1].As<Buffer<LPVOID>>().Data();
  LPVOID parameter = *info[2].As<Buffer<LPVOID>>().Data();
  SIZE_T stackSize = info[3].ToNumber().Int64Value();
  UINT32 flags = info[4].ToNumber();

  CreateRemoteThreadWorker *worker = new CreateRemoteThreadWorker(env, processHandle, startAddress, parameter, stackSize, flags);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeCreateRemoteThread
