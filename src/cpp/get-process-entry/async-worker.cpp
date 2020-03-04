#pragma once

#include <napi.h>
#include <TlHelp32.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetProcessEntry
{
class GetProcessEntryWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  wstring processName;

  PROCESSENTRY32W processEntry;

public:
  GetProcessEntryWorker(
      napi_env env,
      wstring &processName)
      : AsyncWorker(env),
        processName(processName),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    PROCESSENTRY32W searchEntry = {sizeof(PROCESSENTRY32W)};

    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);

    if (Process32FirstW(snapshot, &searchEntry))
    {
      while (Process32NextW(snapshot, &searchEntry))
      {
        if (searchEntry.szExeFile == processName)
        {
          CloseHandle(snapshot);

          processEntry = searchEntry;
          return;
        }
      }
    }

    CloseHandle(snapshot);
    SetError("Unable to get process entry! Process not found.");
  }

  void OnOK() override
  {
    Object result = Object::New(Env());

    result.Set("processId", processEntry.th32ProcessID);
    result.Set("threadCount", processEntry.cntThreads);
    result.Set("parentProcessId", processEntry.th32ParentProcessID);
    result.Set("threadPriority", processEntry.pcPriClassBase);

    deferred.Resolve(result);
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeGetProcessEntry
