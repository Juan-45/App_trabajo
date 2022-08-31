import { Toolbar, Typography, Grid } from "@mui/material";
import theme from "theme";

const CustomToolbar = ({ children }) => (
  <Toolbar
    sx={{
      pl: { md: 2 },
      pr: { xs: 1, md: 1 },
      pb: "20px",
      pt: "10px",
      background: theme.palette.secondary.light,
      border: "1px solid",
      borderColor: theme.palette.secondary.hover,
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }}
  >
    {children}
  </Toolbar>
);

const CustomToolbarTitle = ({ children }) => (
  <Typography
    sx={{ flex: "1 1 20%", marginBottom: "5px" }}
    variant='h6'
    id='tableTitle'
    component='div'
  >
    {children}
  </Typography>
);

const ToolbarChildContainer = ({ children }) => (
  <Grid
    container
    direction='column'
    width='fit-content'
    flexShrink='0'
    sx={{ mr: "20px", mb: "10px" }}
  >
    {children}
  </Grid>
);

export { CustomToolbar, CustomToolbarTitle, ToolbarChildContainer };
