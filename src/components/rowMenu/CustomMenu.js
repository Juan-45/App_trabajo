import { Menu } from "@mui/material";
import React from "react";

const CustomMenu = ({ children, ...props }, ref) => (
  <Menu
    sx={{
      "& .MuiMenuItem-root": {
        paddingTop: "0px",
        paddingBottom: "0px",
        minHeight: "28px",
      },
    }}
    ref={ref}
    {...props}
  >
    {children}
  </Menu>
);

export default React.forwardRef(CustomMenu);
