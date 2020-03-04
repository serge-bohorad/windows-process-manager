#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeTerminateProcess
{
Value init(const CallbackInfo &info)
{
  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();
  UINT exitCode = info[1].ToNumber();

  TerminateProcessWorker *worker = new TerminateProcessWorker(info.Env(), processHandle, exitCode);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeTerminateProcess