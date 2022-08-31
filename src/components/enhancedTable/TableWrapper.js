import { Paper } from "@mui/material";

const TableWrapper = ({ children }) => (
    <Paper sx={{ mb: "50px", width: "100%" }}>{children}</Paper>
);

export default TableWrapper;
