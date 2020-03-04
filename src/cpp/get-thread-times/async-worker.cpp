#pragma once

#include <napi.h>
#include <windows.h>

using namespace Napi;
using namespace std;

namespace NodeGetThreadTimes
{
class GetThreadTimesWorker : public AsyncWorker
{
public:
  Promise::Deferred deferred;

private:
  HANDLE threadHandle;

  SYSTEMTIME systemTime[4];

public:
  GetThreadTimesWorker(
      napi_env env,
      HANDLE threadHandle)
      : AsyncWorker(env),
        threadHandle(threadHandle),
        deferred(Promise::Deferred::New(env)) {}

  void Execute() override
  {
    FILETIME fileTime[4];

    BOOL result = GetThreadTimes(
        threadHandle,
        &fileTime[0],
        &fileTime[1],
        &fileTime[2],
        &fileTime[3]);

    if (!result)
    {
      return SetError("Unable to get thread times! Error code: " + to_string(GetLastError()));
    }

    for (size_t i = 0; i < 4; i++)
    {
      FileTimeToSystemTime(&fileTime[i], &systemTime[i]);
    }
  }

  void OnOK() override
  {

    Object info = Object::New(Env());

    vector<string> fieldNames = {
        string("creationTime"),
        string("exitTime"),
        string("kernelTime"),
        string("userTime")};

    for (size_t i = 0; i < 4; i++)
    {
      Object field = Object::New(Env());

      field.Set("year", systemTime[i].wYear);
      field.Set("month", systemTime[i].wMonth);
      field.Set("dayOfWeek", systemTime[i].wDayOfWeek);
      field.Set("day", systemTime[i].wDay);
      field.Set("hour", systemTime[i].wHour);
      field.Set("minute", systemTime[i].wMinute);
      field.Set("second", systemTime[i].wSecond);
      field.Set("milliseconds", systemTime[i].wMilliseconds);

      info.Set(fieldNames[i], field);
    }

    deferred.Resolve(info);
  }

  void OnError(const Error &error) override
  {
    deferred.Reject(error.Value());
  }
};
} // namespace NodeGetThreadTimes