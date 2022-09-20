import React from "react";

const useComboBox = ({
  onChange,
  shouldReset,
  initialValue = null,
  updatedValue,
  defaultValueForParentState,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const resetInputValueIf = (condition) => {
    if (condition) {
      setValue(initialValue);
    }
  };

  resetInputValueIf(shouldReset && value !== initialValue);

  const comboBoxHandler = (event, newValue, reason) => {
    //newValue is the whole selected option, is the entire object
    const shouldClear = reason === "clear";

    const valueToParentState = shouldClear
      ? defaultValueForParentState
      : newValue;

    setValue(newValue);

    onChange(valueToParentState);
  };

  React.useEffect(() => {
    if (updatedValue) {
      setValue(updatedValue);
    }
  }, [updatedValue]);

  return {
    comboBoxHandler,
    value,
  };
};

export default useComboBox;
