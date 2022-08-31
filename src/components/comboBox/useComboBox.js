import React from "react";

const useComboBox = ({ onChange, shouldReset, options, valueId }) => {
  const [value, setValue] = React.useState(null);

  const comboBoxHandler = (event, newValue) => {
    const localValueToUpdate = newValue
      ? newValue.label
      : "No hay valor disponible";
    const formValueToUpdate = newValue
      ? {
          label: newValue.label,
          adjunct: newValue.adjunct,
          id: newValue.id,
        }
      : "No hay valor disponible";
    setValue(localValueToUpdate);
    onChange(formValueToUpdate);
  };

  React.useEffect(() => {
    if (shouldReset) {
      setValue(null);
    }
  }, [shouldReset]);
  React.useEffect(() => {
    if (valueId) {
      const newLocalValue = options.find((obj) => obj.id === valueId).label;
      const newFormValue = options.find((obj) => obj.id === valueId).id;
      setValue(newLocalValue);
      onChange(newFormValue);
    }
  }, [valueId, options, onChange]);
  return {
    comboBoxHandler,
    value,
  };
};

export default useComboBox;
