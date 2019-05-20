import Scheduler from '../utils/scheduler';
import { getDaysInMonthByYear } from '../utils/dates';

export default class SchedulersManager {
  constructor(configuration) {
    this.schedulers = {};
    this.firstScheduler = null;

    configuration.forEach((conf) => {
      const timestamp = new Date(
        conf.date.getFullYear(),
        conf.date.getMonth(),
        conf.date.getDate(),
      ).getTime();

      this.schedulers[timestamp] = new Scheduler(
        conf.date,
        conf.turn,
        conf.workingDays,
        conf.restDays,
      );
    });

    const sch = Object.keys(this.schedulers).reduce(
      (min, current) => (min < current ? min : current),
      Object.keys(this.schedulers)[0],
    );

    this.firstScheduler = sch ? this.schedulers[sch] : null;
  }

  getSchedulerForDay = (day, month, year) => {
    const dateTime = new Date(year, month, day).getTime();
    const sch = Object.keys(this.schedulers).filter((key) => key <= dateTime);

    const scheduler = sch.length
      ? sch.reduce((max, current) => (max > current ? max : current), sch[0])
      : null;

    const theScheduler = scheduler ? this.schedulers[scheduler] : null;

    return theScheduler;
  };

  getSchedulersForMonth = (month, year) => {
    const initial = new Date(year, month, 1).getTime();
    const final = new Date(year, month, getDaysInMonthByYear(month, year)).getTime();

    // the valid for the first day of the month
    const initialScheduler = this.getSchedulerForDay(1, month, year);

    // the valid for the last day of the month
    // const finalScheduler = this.getSchedulerForDay(getDaysInMonthByYear(month, year), month, year);

    // get mid schedulers
    const sch = Object.keys(this.schedulers).filter((key) => key > initial || key < final);

    const theSchedulers = [initialScheduler];

    sch.forEach((key) => theSchedulers.push(this.schedulers[key]));

    return theSchedulers;
  };

  getFirstScheduler = (_) => this.firstScheduler;
}
