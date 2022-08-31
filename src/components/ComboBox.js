import { TextField, Autocomplete } from "@mui/material";
import useComboBox from "./comboBox/useComboBox";

const ComboBox = ({
  onChange,
  shouldReset,
  label,
  error,
  helperText,
  required,
  name,
  options,
  valueId,
  ...props
}) => {
  const { comboBoxHandler, value } = useComboBox({
    onChange,
    shouldReset,
    options,
    valueId,
  });

  return (
    <Autocomplete
      value={value}
      onChange={comboBoxHandler}
      isOptionEqualToValue={(option, value) => option.Id === value.id}
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
