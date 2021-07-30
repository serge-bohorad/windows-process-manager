#include <napi.h>

#include "create-process/main.cpp"
#include "terminate-process/main.cpp"
#include "open-process/main.cpp"
#include "close-handle/main.cpp"
#include "get-process-entry/main.cpp"
#include "get-current-process-handle/main.cpp"
#include "get-process-times/main.cpp"
#include "get-exit-code-process/main.cpp"
#include "set-process-information/main.cpp"
#include "set-thread-information/main.cpp"
#include "virtual-alloc-ex/main.cpp"
#include "virtual-free-ex/main.cpp"
#include "virtual-protect-ex/main.cpp"
#include "write-process-memory/main.cpp"
#include "read-process-memory/main.cpp"
#include "get-module-handle/main.cpp"
#include "get-proc-address/main.cpp"
#include "create-remote-thread/main.cpp"
#include "wait-for-single-object/main.cpp"
#include "get-current-thread-handle/main.cpp"
#include "get-current-thread-id/main.cpp"
#include "get-thread-times/main.cpp"
#include "get-exit-code-thread/main.cpp"
#include "open-thread/main.cpp"
#include "suspend-thread/main.cpp"
#include "resume-thread/main.cpp"
#include "terminate-thread/main.cpp"
#include "inject-dll/main.cpp"

using namespace Napi;

Object init(Env env, Object exports)
{
  exports.Set(
      "createProcess",
      Function::New(env, NodeCreateProcess::init));

  exports.Set(
      "terminateProcess",
      Function::New(env, NodeTerminateProcess::init));

  exports.Set(
      "openProcess",
      Function::New(env, NodeOpenProcess::init));

  exports.Set(
      "closeHandle",
      Function::New(env, NodeCloseHandle::init));

  exports.Set(
      "getProcessEntry",
      Function::New(env, NodeGetProcessEntry::init));

  exports.Set(
      "getCurrentProcessHandle",
      Function::New(env, NodeGetCurrentProcessHandle::init));

  exports.Set(
      "getProcessTimes",
      Function::New(env, NodeGetProcessTimes::init));

  exports.Set(
      "getExitCodeProcess",
      Function::New(env, NodeGetExitCodeProcess::init));

  exports.Set(
      "setProcessMemoryPriority",
      Function::New(env, NodeSetProcessMemoryPriority::init));

#if WINVER >= 0x0B00 // will be available in Windows 11
  exports.Set(
      "SetProcessPowerThrottling",
      Function::New(env, NodeSetProcessPowerThrottling::init));
#endif

  exports.Set(
      "setThreadMemoryPriority",
      Function::New(env, NodeSetThreadMemoryPriority::init));

  exports.Set(
      "virtualAllocEx",
      Function::New(env, NodeVirtualAllocEx::init));

  exports.Set(
      "virtualFreeEx",
      Function::New(env, NodeVirtualFreeEx::init));

  exports.Set(
      "virtualProtectEx",
      Function::New(env, NodeVirtualProtectEx::init));

  exports.Set(
      "writeProcessMemory",
      Function::New(env, NodeWriteProcessMemory::init));

  exports.Set(
      "readProcessMemory",
      Function::New(env, NodeReadProcessMemory::init));

  exports.Set(
      "getModuleHandle",
      Function::New(env, NodeGetModuleHandle::init));

  exports.Set(
      "getProcAddress",
      Function::New(env, NodeGetProcAddress::init));

  exports.Set(
      "createRemoteThread",
      Function::New(env, NodeCreateRemoteThread::init));

  exports.Set(
      "waitForSingleObject",
      Function::New(env, NodeWaitForSingleObject::init));

  exports.Set(
      "getCurrentThreadHandle",
      Function::New(env, NodeGetCurrentThreadHandle::init));

  exports.Set(
      "getCurrentThreadId",
      Function::New(env, NodeGetCurrentThreadId::init));

  exports.Set(
      "getThreadTimes",
      Function::New(env, NodeGetThreadTimes::init));

  exports.Set(
      "getExitCodeThread",
      Function::New(env, NodeGetExitCodeThread::init));

  exports.Set(
      "openThread",
      Function::New(env, NodeOpenThread::init));

  exports.Set(
      "suspendThread",
      Function::New(env, NodeSuspendThread::init));

  exports.Set(
      "resumeThread",
      Function::New(env, NodeResumeThread::init));

  exports.Set(
      "terminateThread",
      Function::New(env, NodeTerminateThread::init));

  exports.Set(
      "injectDll",
      Function::New(env, NodeInjectDll::init));

  return exports;
}

NODE_API_MODULE(windows_process_manager, init);
