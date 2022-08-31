import React from "react";

const UseInput = ({ onChange, initialValue = "", shouldReset }) => {
  const [value, setValue] = React.useState(initialValue);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  React.useEffect(() => {
    if (shouldReset) {
      setValue(initialValue);
      onChange(initialValue);
    }
  }, [shouldReset, initialValue, onChange]);
  return {
    value,
    handleOnChange,
  };
};

export default UseInput;
