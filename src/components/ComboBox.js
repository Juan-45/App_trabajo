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
  initialValue,
  updatedValue,
  defaultValueForParentState,
  ...props
}) => {
  const { comboBoxHandler, value } = useComboBox({
    onChange,
    shouldReset,
    initialValue,
    updatedValue,
    defaultValueForParentState,
  });

  return (
    <Autocomplete
      value={value}
      onChange={comboBoxHandler}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
