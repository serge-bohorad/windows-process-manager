#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeGetThreadTimes
{
Value init(const CallbackInfo &info)
{
  HANDLE threadHandle = *info[0].As<Buffer<HANDLE>>().Data();

  GetThreadTimesWorker *worker = new GetThreadTimesWorker(info.Env(), threadHandle);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeGetThreadTimes