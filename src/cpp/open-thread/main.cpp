#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeOpenThread
{
Value init(const CallbackInfo &info)
{
  UINT32 threadId = info[0].ToNumber();
  UINT32 accessRights = info[1].ToNumber();
  BOOL inheritHandle = info[2].ToBoolean();

  OpenThreadWorker *worker = new OpenThreadWorker(info.Env(), threadId, accessRights, inheritHandle);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeOpenThread