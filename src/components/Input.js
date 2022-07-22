import { TextField, Grid } from "@mui/material";
import useInput from "hooks/useInput";

const Input = ({ onChange, ...props }) => {
  const { value, handleOnChange } = useInput({ onChange, initialValue: "" });

  return (
    <Grid item xs={12} sm={6} sx={{ padding: { xs: "6px", sm: "8px" } }}>
      <TextField
        variant="filled"
        fullWidth
        size="small"
        value={value}
        onChange={handleOnChange}
        {...props}
      />
    </Grid>
  );
};

export default Input;
