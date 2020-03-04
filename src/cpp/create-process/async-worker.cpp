#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeCreateProcess
{
class CreateProcessWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  wstring exeFile;
  wstring args;
  BOOL inheritHandles;
  DWORD flags;
  wstring cwd;

  PROCESS_INFORMATION processInfo;

public:
  CreateProcessWorker(
      napi_env env,
      wstring &exeFile,
      wstring &args,
      BOOL inheritHandles,
      DWORD flags,
      wstring &cwd)
      : AsyncWorker(env),
        exeFile(exeFile),
        args(args),
        inheritHandles(inheritHandles),
        flags(flags),
        cwd(cwd),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    STARTUPINFOW startupInfo;

    ZeroMemory(&startupInfo, sizeof(STARTUPINFOW));

    BOOL result = CreateProcessW(
        exeFile.c_str(),
        const_cast<LPWSTR>(args.c_str()),
        NULL,
        NULL,
        inheritHandles,
        flags,
        NULL,
        cwd.c_str(),
        &startupInfo,
        &processInfo);

    if (!result)
    {
      SetError("Unable to create process! Error code: " + to_string(GetLastError()));
    }
  }

  void OnOK() override
  {
    Object info = Object::New(Env());

    info.Set("processId", processInfo.dwProcessId);
    info.Set("threadId", processInfo.dwThreadId);
    info.Set("processHandle", Buffer<HANDLE>::Copy(Env(), &processInfo.hProcess, 1));
    info.Set("threadHandle", Buffer<HANDLE>::Copy(Env(), &processInfo.hThread, 1));

    deferred.Resolve(info);
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeCreateProcess
