/** @format */

interface ITimeObject {
  years: number;
  months: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
interface ITime {
  hour: number;
  minute: number;
  second: number;
  milliseconds: number;
  unixmilliseconds: number;
  unix: number;
  utcOffset: number;
}
interface IDate {
  day: string;
  date: number;
  month: number;
  year: number;
}
export interface IDateObject {
  serverTime: string;
  UTC: string;
  timeObject: ITimeObject;
  toUTCDate: Date;
  toArray: number[];
  date: IDate;
  time: ITime;
  isValid: boolean;
  dayOfYear: number;
  weekOfTheYeay: number;
  weekday: number;
  isLeapYear: boolean;
  daysInMonth: number;
  weeksInYear: number;
  quarter: number;
  locale: string;
}

// const serverTime = '(await this._getTime()) || ofset;';
// const timeMoment = moment(serverTime);
// // const timeNow = new Date(serverTime);
// const weekDay = timeMoment.localeData().weekdays()[timeMoment.weekday()];
// export const returnDate: IDateObject = {
//   serverTime,
//   UTC: timeMoment.toJSON(),
//   timeObject: timeMoment.toObject(),
//   toUTCDate: timeMoment.toDate(),
//   toArray: timeMoment.toArray(),
//   date: {
//     day: weekDay,
//     date: timeMoment.date(),
//     month: timeMoment.month() + 1,
//     year: timeMoment.year(),
//   },
//   time: {
//     hour: timeMoment.hour(),
//     minute: timeMoment.minute(),
//     second: timeMoment.second(),
//     milliseconds: timeMoment.milliseconds(),
//     unixmilliseconds: timeMoment.valueOf(),
//     unix: timeMoment.unix(),
//     utcOffset: timeMoment.utcOffset(),
//   },
//   isValid: timeMoment.isValid(),
//   dayOfYear: timeMoment.dayOfYear(),
//   weekOfTheYeay: timeMoment.isoWeek(),
//   weekday: timeMoment.weekday(),
//   isLeapYear: timeMoment.isLeapYear(),
//   daysInMonth: timeMoment.daysInMonth(),
//   weeksInYear: timeMoment.isoWeeksInYear(),
//   quarter: timeMoment.quarter(),
//   locale: timeMoment.locale(),
// };
