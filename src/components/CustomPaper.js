import { Paper } from "@mui/material";

const CustomPaper = ({ children, ...props }) => (
  <Paper sx={{ p: "30px", mb: "50px", width: "500px" }} {...props}>
    {children}
  </Paper>
);

export default CustomPaper;
