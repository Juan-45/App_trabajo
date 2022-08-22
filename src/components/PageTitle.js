import { Typography } from "@mui/material";

const PageTitle = ({ children, ...props }) => (
    <Typography
        variant='h4'
        textAlign='center'
        sx={{ marginBottom: "25px", width: "100%" }}
        {...props}
    >
        {children}
    </Typography>
);

export default PageTitle;
