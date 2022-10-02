import { Paper, Box } from "@mui/material";

const CustomPaper = ({ children, display, ...props }) => (
  <Box
    sx={{
      width: "100%",
      display: display === undefined || display ? "block" : "none",
    }}
  >
    <Paper
      sx={{
        p: "30px",
        mb: "50px",
        ml: "auto",
        mr: "auto",
        width: "500px",
      }}
      {...props}
    >
      {children}
    </Paper>
  </Box>
);

export default CustomPaper;
