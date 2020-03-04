#pragma once

#include <napi.h>

#include "async-worker.cpp"

using namespace Napi;
using namespace std;

namespace NodeCreateProcess
{
Value init(const CallbackInfo &info)
{
  u16string exeFile = info[0].ToString();
  u16string args = info[1].ToString();
  BOOL inheritHandles = info[2].ToBoolean();
  UINT32 flags = info[3].ToNumber();
  u16string cwd = info[4].ToString();

  wstring finalExeFile = wstring(exeFile.begin(), exeFile.end());
  wstring finalArgs = wstring(args.begin(), args.end());
  wstring finalCwd = wstring(cwd.begin(), cwd.end());

  CreateProcessWorker *worker = new CreateProcessWorker(info.Env(), finalExeFile, finalArgs, inheritHandles, flags, finalCwd);

  worker->Queue();

  return worker->deferred.Promise();
}
} // namespace NodeCreateProcess