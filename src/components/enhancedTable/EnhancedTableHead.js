import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import theme from "theme";

const EnhancedTableHead = ({ order, onRequestSort, headCells }) => (
  <TableHead>
    <TableRow
      sx={{
        background: theme.palette.secondary.medium,
      }}
    >
      {headCells.map((headCell, index) => (
        <TableCell key={`${headCell.id}${index}`} variant='head'>
          {headCell.sort ? (
            <TableSortLabel
              active={true}
              direction={order}
              onClick={onRequestSort}
            >
              {headCell.label}
            </TableSortLabel>
          ) : (
            headCell.label
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default EnhancedTableHead;
