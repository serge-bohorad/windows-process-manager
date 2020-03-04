#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeWaitForSingleObject
{
Value init(const CallbackInfo &info)
{
  HANDLE objectHandle = *info[0].As<Buffer<HANDLE>>().Data();
  UINT32 milliseconds = info[1].ToNumber();

  WaitForSingleObjectWorker *worker = new WaitForSingleObjectWorker(info.Env(), objectHandle, milliseconds);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeWaitForSingleObject