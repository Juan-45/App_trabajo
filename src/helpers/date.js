import { isNotEmptyString } from "helpers/data";

const currentDate = new Date();

const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const currentDayNumber = currentDate.getDate();

const getMonthString = (date) => monthNames[date.getMonth()];

const currentMonthString = getMonthString(currentDate);

const currentYear = currentDate.getFullYear();

const getDateAsString = (value) =>
  `${value.getDate()} - ${value.getMonth() + 1} - ${value.getFullYear()}`;

const dateIsValid = (date) => date instanceof Date && !isNaN(date);

const getDateObjFrom = (str) => {
  const dateValuesArr = str.split(" - ").filter(isNotEmptyString);

  const day = dateValuesArr[0];
  const month = dateValuesArr[1] - 1;
  const year = dateValuesArr[2];

  return new Date(year, month, day);
};

const isDateOutdated = (date, currentDate) => date < currentDate;

export {
  currentDate,
  currentDayNumber,
  currentMonthString,
  currentYear,
  getMonthString,
  getDateAsString,
  dateIsValid,
  getDateObjFrom,
  isDateOutdated,
};
