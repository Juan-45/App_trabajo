import { useState } from "react";

const useDateInput = ({ onChange }) => {
  const [value, setValue] = useState(null);

  const handleOnChange = (newValue) => {
    console.log(newValue);
    const getDateFormated = (value) =>
      `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    setValue(newValue);
    onChange(getDateFormated(newValue));
  };
  return { value, handleOnChange };
};

export default useDateInput;
