const getBooleanFromString = (value) => {
  if (value === "true" || value === "false") {
    const boolean = value === "true" ? true : false;
    return boolean;
  } else return value;
};

//FUNCIONES DE ORDENAMIENTO DE ARRAY
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const removeDefaultItemFrom = (arr) =>
  arr.filter((obj) => obj.id !== "default");

const allPropertiesValuesAreValid = (obj) =>
  Object.keys(obj).filter((properties) => obj[properties] === "").length === 0;

//FUNCIONES PARA RENDERIZADO CONDICIONAL

const renderIf = (condition) => (component) => condition ? component : null;

const renderPageIf = (condition, failComponent) => (page) =>
  condition ? page : failComponent;

//FUNCIONES PARA MANEJO DE ESTILOS

const isEven = (number) => number % 2 === 0;

const setColorIf = (condition) => (color) => condition ? color : "initial";

const setColorOnEvenIndexes = (index, color) =>
  setColorIf(isEven(index))(color);

export {
  allPropertiesValuesAreValid,
  removeDefaultItemFrom,
  getComparator,
  stableSort,
  setColorOnEvenIndexes,
  getBooleanFromString,
  renderIf,
  renderPageIf,
};
