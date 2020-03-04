#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;

namespace NodeInjectDll
{
Value init(const CallbackInfo &info)
{
  UINT32 processId = info[0].ToNumber();
  u16string dllFile = info[1].ToString().Utf16Value();
  UINT32 waitingTimeout = info[2].ToNumber();

  wstring finalDllFile = wstring(dllFile.begin(), dllFile.end());

  InjectDllWorker *worker = new InjectDllWorker(info.Env(), processId, finalDllFile, waitingTimeout);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeInjectDll