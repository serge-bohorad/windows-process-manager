#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeGetProcessTimes
{
Value init(const CallbackInfo &info)
{
  HANDLE processHandle = *info[0].As<Buffer<HANDLE>>().Data();

  GetProcessTimesWorker *worker = new GetProcessTimesWorker(info.Env(), processHandle);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeGetProcessTimes