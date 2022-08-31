import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import EnhancedTableHead from "./enhancedTable/EnhancedTableHead";
import TableWrapper from "./enhancedTable/TableWrapper";
import useEnhancedTable from "./enhancedTable/useEnhancedTable";
import {
  getComparator,
  stableSort,
  setColorOnEvenIndexes,
} from "helpers/helperFunctions";
import theme from "theme";

const EnhancedTable = ({
  rows,
  cellsAmount,
  headCells,
  rowTooltipTitle = "",
  toolBarChildrenComponents,
  rowMenuComponent,
  rowOnClickHandler = () => {},
  sortBy,
  shouldListResults,
}) => {
  const {
    emptyRows,
    order,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useEnhancedTable({ rows });

  return (
    <TableWrapper>
      {toolBarChildrenComponents}
      <TableContainer>
        <Table size='small'>
          <EnhancedTableHead
            order={order}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {shouldListResults ? (
              stableSort(rows, getComparator(order, sortBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rowObj, rowIndex) => {
                  const labelId = `enhanced-table-${rowIndex}`;
                  const { id, ...rest } = rowObj;
                  const tableRowCells = Object.entries(rest);
                  const tableRowHeadValue = `${tableRowCells[0][1]}-${rowIndex}`;
                  return (
                    <Tooltip
                      key={tableRowHeadValue}
                      title={rowTooltipTitle}
                      placement='bottom-start'
                      disableHoverListener={
                        rowTooltipTitle !== "" ? false : true
                      }
                    >
                      <TableRow
                        hover
                        tabIndex={-1}
                        sx={{
                          background: setColorOnEvenIndexes(
                            rowIndex,
                            theme.palette.primary.ultraLightT
                          ),
                        }}
                        onClick={(event) => rowOnClickHandler(event, id)}
                      >
                        {tableRowCells.map(
                          (valueKeyPair, tableRowCellsIndex) => {
                            const cellKey = `${valueKeyPair[1]}${tableRowCellsIndex}`;
                            return tableRowCellsIndex === 0 ? (
                              <TableCell
                                component='th'
                                id={labelId}
                                key={cellKey}
                                scope='row'
                                variant='body'
                              >
                                {valueKeyPair[1]}
                              </TableCell>
                            ) : (
                              <TableCell
                                align='justify'
                                key={cellKey}
                                variant='body'
                              >
                                {valueKeyPair[1]}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    </Tooltip>
                  );
                })
            ) : (
              <TableRow>
                <TableCell align='justify'>{"No hay datos"}</TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 30 * emptyRows,
                }}
              >
                <TableCell colSpan={cellsAmount} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component='div'
        count={rows.length}
        //count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {rowMenuComponent}
    </TableWrapper>
  );
};

export default EnhancedTable;
