import { Menu } from "@mui/material";
import theme from "theme/theme";

const CustomMenu = ({ children, isTouchScreen, ...props }) => (
  <Menu
    elevation={16}
    sx={{
      display: { xs: "block", md: "none" },
      "& .MuiMenu-paper": {
        borderRadius: "0",
        background: theme.palette.primary.main,
        width: "100vw",
        maxWidth: "100%",
        position: "fixed",
        top: "0 !important",
        left: "0 !important",
        right: "0 !important",
      },

      "& .MuiMenuItem-root": {
        color: "white",
        paddingTop: "0px",
        paddingBottom: "0px",
        minHeight: "32.5px",
      },
      "& .MuiMenuItem-root:hover": {
        background: theme.palette.primary.dark,
      },
      "& .MuiListItemIcon-root": {
        color: "white",
      },
      "& .MuiTypography-root": {
        fontSize: "0.875rem",
        fontWeight: "500",
        textTransform: "uppercase",
      },
    }}
    {...props}
  >
    {children}
  </Menu>
);

export default CustomMenu;
