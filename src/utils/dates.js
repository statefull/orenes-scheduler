export const MONTH = Object.freeze({
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11
});

export function getDaysInMonthByYear(month, year = new Date().getYear()) {
  return new Date(year, ++month, 0).getDate();
}

export function getCurrentMonth() {
  return new Date().getMonth();
}
