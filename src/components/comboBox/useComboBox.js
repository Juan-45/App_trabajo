import React from "react";

const useComboBox = ({ onChange, shouldReset, options, valueId }) => {
  const [value, setValue] = React.useState(null);

  const comboBoxHandler = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  React.useEffect(() => {
    if (shouldReset) {
      setValue(null);
    }
  }, [shouldReset]);
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
