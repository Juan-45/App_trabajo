import { useState } from "react";

const UseInput = ({ onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return {
    value,
    handleOnChange,
  };
};

export default UseInput;
