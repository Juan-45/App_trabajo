import React from "react";

const useEnhancedTable = ({ rows }) => {
    const [order, setOrder] = React.useState("asc");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = () => {
        const isAsc = order === "asc";
        setOrder(isAsc ? "desc" : "asc");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return {
        emptyRows,
        order,
        page,
        rowsPerPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};

export default useEnhancedTable;
