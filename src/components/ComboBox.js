import { TextField, Autocomplete } from "@mui/material";
import useComboBox from "./comboBox/useComboBox";

const ComboBox = ({
  onChange,
  shouldReset = false,
  label,
  error,
  helperText,
  required,
  name,
  options,
  valueId,
  defaultValueForParentState,
  refreshShouldReset,
  ...props
}) => {
  const { comboBoxHandler, value } = useComboBox({
    onChange,
    shouldReset,
    options,
    valueId,
    defaultValueForParentState,
    refreshShouldReset,
  });

  return (
    <Autocomplete
      value={value}
      onChange={comboBoxHandler}
      isOptionEqualToValue={(option, value) => {
        console.log("option", option);
        console.log("value", value);
        return option.id === value.id;
      }}
      noOptionsText='No hay valor disponible'
      openOnFocus={true}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        );
      }}
      options={options}
      {...props}
      renderInput={(params) => {
        const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
        return (
          <TextField
            {...params}
            inputProps={inputProps}
            label={label}
            error={error}
            helperText={helperText}
            required={required}
          />
        );
      }}
    />
  );
};

export default ComboBox;
