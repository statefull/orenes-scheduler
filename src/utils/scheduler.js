import { getDaysInMonthByYear, MONTH } from "./dates";

export const TURNS = Object.freeze({
  MORNING: 0,
  EVENING: 1,
  FREE: 2
});

export default class Scheduler {
  constructor(
    date = new Date(),
    turn = TURNS.MORNING,
    workDaysUntilBreak = 4,
    restDays = 2
  ) {
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.turn = turn;
    this.workDaysUntilBreak = workDaysUntilBreak;
    this.restDays = restDays;
  }

  getSchedulerDate = _ => new Date(this.year, this.month, this.day);

  getDay = (
    day,
    month = new Date().getMonth(),
    year = new Date().getFullYear()
  ) => {
    const startDate = new Date(this.year, this.month, this.day);
    const endDate = new Date(year, month, day);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const packs = diffDays / (this.workDaysUntilBreak + this.restDays);

    const aDay = 1 / (this.workDaysUntilBreak + this.restDays);

    const remainPacks = Math.round((packs % 1) * 100) / 100;
    const daysWorked = Math.round(this.workDaysUntilBreak * aDay * 100) / 100;

    const isRestDay =
      packs % 1 === 0 ? true : remainPacks - daysWorked <= 0 ? false : true;

    //console.log(
    //` aday: ${aDay}, ${remainPacks} ${daysWorked}  ${remainPacks -
    //        daysWorked}`
    //  );

    const turn =
      Math.floor(packs) % 2 === 0
        ? this.turn
        : this.turn === TURNS.MORNING
        ? TURNS.EVENING
        : TURNS.MORNING;
    const dayInfo = isRestDay ? { day, turn: TURNS.FREE } : { day, turn };

    return dayInfo;
  };

  getDaysSchedulered = (
    day,
    month = new Date().getMonth(),
    year = new Date().getFullYear()
  ) => {
    const schedule = [];

    let actualMonth = this.month;
    let actualYear = this.year;
    let actualDay = this.day;

    let endMonth = year === this.year ? month : MONTH.DECEMBER;

    do {
      for (let m = actualMonth; m <= endMonth; m++) {
        let endDay =
          month === this.month
            ? day
            : getDaysInMonthByYear(this.month, this.year);
        for (let currentDay = actualDay; currentDay < endDay; currentDay++) {
          schedule.push(this.getDay(currentDay, m, actualYear));
        }
      }

      actualYear++;
      actualMonth = MONTH.JANUARY;
      actualDay = 1;
      endMonth = year === this.year ? month : MONTH.DECEMBER;
    } while (actualYear <= year);

    return schedule;
  };
}
