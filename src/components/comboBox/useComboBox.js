import React from "react";

const useComboBox = ({
  onChange,
  shouldReset,
  options,
  valueId,
  defaultValueForParentState,
  //refreshShouldReset is a callback to switch to false the shouldReset prop after the input value is reseted, use React.useCallback for this prop
  refreshShouldReset,
}) => {
  const [value, setValue] = React.useState(null);

  const resetInputValueIf = (condition) => {
    if (condition) {
      setValue(null);
    }
  };

  const runRefreshShouldResetIf = React.useCallback(
    (condition) => {
      if (condition) {
        refreshShouldReset();
      }
    },
    [refreshShouldReset]
  );

  resetInputValueIf(shouldReset && value !== null);

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
    runRefreshShouldResetIf(shouldReset && value === null);
  }, [runRefreshShouldResetIf, shouldReset, value]);
  React.useEffect(() => {
    if (valueId) {
      const match = options.find((obj) => obj.id === valueId);
      setValue(match);
      onChange(match);
    }
  }, [valueId, options, onChange]);
  return {
    comboBoxHandler,
    value,
  };
};

export default useComboBox;
