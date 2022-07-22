import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import useInput from "hooks/useInput";

const RadioInput = ({ title, options, onChange, ...props }) => {
  const { handleOnChange, value } = useInput({
    onChange,
    initialValue: "none",
  });

  return (
    <Grid
      container
      item
      xs={12}
      sm={6}
      sx={{ padding: { xs: "6px", sm: "8px" } }}
    >
      <FormControl sx={{ marginLeft: "13px" }}>
        <FormLabel sx={{ textAlign: "left" }}>{title}</FormLabel>
        <RadioGroup value={value} onChange={handleOnChange} {...props}>
          {[...options, { value: "none", label: "none" }].map((item) => (
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={item.label}
              key={item.label}
              sx={{ display: item.value === "none" ? "none" : "initial" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default RadioInput;
