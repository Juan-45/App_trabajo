import { ButtonGroup, Button, Grid, Typography } from "@mui/material";
import theme from "theme/theme";

//It is to center navBar and to have AccountSettingsWrapper positioned to the right
const EmptyContainer = () => <Grid container sx={{ width: "20%", visibility: "hidden", display: { xs: "none", lg: "flex" } }} />

const Container = ({ children, ...props }) => (
    <Grid
        container
        sx={{
            background: theme.palette.secondary.light,
            padding: "20px 25px",
            justifyContent: "space-between",
            minWidth: "400px"
        }}
        {...props}
    >
        <EmptyContainer />
        {children}
    </Grid>
);

const CustomButtonGroup = ({ children, ...props }) => (
    <ButtonGroup sx={{ display: { xs: "none", md: "flex" } }} {...props}>
        {children}
    </ButtonGroup>
);

const CustomButton = ({ children, ...props }) => (
    <Button
        size='small'
        variant='contained'
        sx={{
            borderRadius: "0",
            flexShrink: "0",
            flexBasis: "content",
            boxShadow: "unset",
        }}
        {...props}
    >
        {children}
    </Button>
);

const AccountSettingsWrapper = ({ children }) =>
    <Grid
        container
        justifyContent="flex-end"
        wrap="nowrap"
        sx={{ width: "20%" }}
    >
        {children}
    </Grid>

const LoggedUser = ({ children }) => <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: "noWrap" }} >{children}</Typography>


export { Container, CustomButtonGroup, CustomButton, AccountSettingsWrapper, LoggedUser };
