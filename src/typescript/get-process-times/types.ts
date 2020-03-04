export interface Time {
  year: number
  month: number
  dayOfWeek: number
  day: number
  hour: number
  minute: number
  second: number
  milliseconds: number
}

export interface Times {
  creationTime: Time
  exitTime: Time
  kernelTime: Time
  userTime: Time
}
