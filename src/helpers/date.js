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

const currentMonthString = monthNames[currentDate.getMonth()];

const currentYear = currentDate.getFullYear();

export { currentDate, currentDayNumber, currentMonthString, currentYear };
