#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeOpenProcess
{
Value init(const CallbackInfo &info)
{
  UINT32 processId = info[0].ToNumber();
  UINT32 accessRights = info[1].ToNumber();
  BOOL inheritHandle = info[2].ToBoolean();

  OpenProcessWorker *worker = new OpenProcessWorker(info.Env(), processId, accessRights, inheritHandle);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeOpenProcess