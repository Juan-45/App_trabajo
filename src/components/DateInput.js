import { TextField, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import esLocale from "date-fns/locale/es";
import useDateInput from "./dateInput/useDateInput";

const DateInput = ({ onChange, initialValue, shouldReset, ...props }) => {
  const { value, handleOnChange } = useDateInput({
    onChange,
    initialValue,
    shouldReset,
  });

  return (
    <Grid container item sx={{ padding: { xs: "6px", sm: "8px" } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <DatePicker
          {...props}
          value={value}
          onChange={handleOnChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default DateInput;
