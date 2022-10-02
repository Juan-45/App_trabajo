import { Typography } from "@mui/material";

const PageTitle = ({ children, display, ...props }) => (
  <Typography
    variant='h4'
    textAlign='center'
    sx={{
      marginBottom: "25px",
      width: "100%",
      display: display === undefined || display ? "block" : "none",
    }}
    {...props}
  >
    {children}
  </Typography>
);

export default PageTitle;
