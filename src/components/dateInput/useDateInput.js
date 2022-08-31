import React from "react";

const useDateInput = ({ onChange, initialValue = null, shouldReset }) => {
  const [value, setValue] = React.useState(null);

  const handleOnChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  React.useEffect(() => {
    if (shouldReset) {
      setValue(initialValue);
      onChange(initialValue);
    }
  }, [shouldReset, initialValue, onChange]);
  React.useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      onChange(initialValue);
    }
  }, [initialValue, onChange]);

  return { value, handleOnChange };
};

export default useDateInput;
