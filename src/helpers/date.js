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

export {
  currentDate,
  currentDayNumber,
  currentMonthString,
  currentYear,
  getMonthString,
};
