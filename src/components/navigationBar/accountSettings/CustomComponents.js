import { Tooltip, Menu, MenuItem, ListItemIcon, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MobileButton from "components/MobileButton";

const AccountWrapper = ({ children }) => (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>{children}</Box>
);

const AccountIconButton = ({ tooltipText, onClick }) => (
    <Tooltip title={tooltipText} placement='bottom-end'>
        <MobileButton onClick={onClick} sx={{
            ml: "25px"
        }}>
            <AccountCircleIcon />
        </MobileButton>
    </Tooltip>
);

const AccountMenu = ({ elementPosition, onClose, children }) => (
    <Menu
        anchorEl={elementPosition}
        open={Boolean(elementPosition)}
        onClose={onClose}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                },
            },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
        {children}
    </Menu>
);

const AccountMenuItem = ({ text, onClick, children }) => (
    <MenuItem onClick={onClick}>
        <ListItemIcon>{children}</ListItemIcon>
        {text}
    </MenuItem>
);

export { AccountIconButton, AccountMenu, AccountMenuItem, AccountWrapper };
