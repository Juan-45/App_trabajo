import { IconButton } from "@mui/material";
import React from "react";

const MobileButton = ({ children, ...props }, ref) => {
  return (
    <IconButton
      size="small"
      color="inherit"
      variant="mobile"
      {...props}
      ref={ref}
    >
      {children}
    </IconButton>
  );
};

export default React.forwardRef(MobileButton);
