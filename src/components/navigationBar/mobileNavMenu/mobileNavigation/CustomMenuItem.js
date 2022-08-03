import { MenuItem, ListItemIcon, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomMenuItem = ({ onClick, label, iconComponent }) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon>
      {iconComponent ? iconComponent : <ArrowForwardIosIcon />}
    </ListItemIcon>
    <Typography textAlign="center" variant="body2">
      {label}
    </Typography>
  </MenuItem>
);

export default CustomMenuItem;
