import CustomMenu from "./rowMenu/CustomMenu";
import React from "react";

const RowMenu = ({ elementPosition, handleCloseMenu, children }, ref) => (
  <CustomMenu
    id='options-menu'
    anchorEl={elementPosition}
    open={Boolean(elementPosition)}
    onClose={handleCloseMenu}
    ref={ref}
  >
    {children}
  </CustomMenu>
);
export default React.forwardRef(RowMenu);
