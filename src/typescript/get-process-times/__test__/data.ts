import { Time, Times } from '../types'

const time: Time = {
  year: expect.any(Number),
  month: expect.any(Number),
  dayOfWeek: expect.any(Number),
  day: expect.any(Number),
  hour: expect.any(Number),
  minute: expect.any(Number),
  second: expect.any(Number),
  milliseconds: expect.any(Number)
}

export const defaultTimes: Times = {
  creationTime: time,
  exitTime: time,
  kernelTime: time,
  userTime: time
}
