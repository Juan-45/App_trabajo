import React from "react";

const useInput = ({
  onChange,
  initialValue = "",
  updatedValue,
  shouldReset,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const resetInputValueIf = (condition) => {
    if (condition) {
      setValue(initialValue);
    }
  };

  resetInputValueIf(shouldReset && value !== initialValue);

  React.useEffect(() => {
    if (updatedValue) {
      setValue(updatedValue);
    }
  }, [updatedValue]);

  return {
    value,
    handleOnChange,
  };
};

export default useInput;
