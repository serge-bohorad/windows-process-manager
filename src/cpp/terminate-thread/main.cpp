#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeTerminateThread
{
Value init(const CallbackInfo &info)
{
  HANDLE threadHandle = *info[0].As<Buffer<HANDLE>>().Data();
  UINT exitCode = info[1].ToNumber();

  TerminateThreadWorker *worker = new TerminateThreadWorker(info.Env(), threadHandle, exitCode);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeTerminateThread