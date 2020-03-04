#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;
using namespace std;

namespace NodeGetProcessEntry
{
Value init(const CallbackInfo &info)
{
  u16string processName = info[0].ToString();

  wstring finalProcessName = wstring(processName.begin(), processName.end());

  GetProcessEntryWorker *worker = new GetProcessEntryWorker(info.Env(), finalProcessName);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeGetProcessEntry