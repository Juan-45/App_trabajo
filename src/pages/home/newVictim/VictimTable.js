import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

const columns = [
  { id: "surname", label: "Apellido", minWidth: 170 },
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "nationality", label: "Nacionalidad", minWidth: 70 },
  { id: "civilStatus", label: "Estado Civil", minWidth: 80 },
  { id: "occupation", label: "Ocupación", minWidth: 60 },
  { id: "education", label: "Instruido", minWidth: 60 },
  { id: "age", label: "Edad", minWidth: 40 },
  { id: "birthDate", label: "Fecha de Nacimiento", minWidth: 140 },
  { id: "ID", label: "DNI", minWidth: 80 },
  { id: "adress", label: "Domicilio", minWidth: 170 },
  { id: "phone", label: "Teléfono", minWidth: 130 },
];

function createData(
  surname,
  name,
  nationality,
  civilStatus,
  occupation,
  education,
  age,
  birthDate,
  ID,
  adress,
  phone
) {
  return {
    surname,
    name,
    nationality,
    civilStatus,
    occupation,
    education,
    age,
    birthDate,
    ID,
    adress,
    phone,
  };
}

const rows = [
  createData(
    "Gallo",
    "Franco",
    "argentina",
    "soltero",
    "empleado",
    "instruido",
    "25",
    "12/12/1995",
    "35.243.852",
    "Francia Nro 2166",
    "2477-15487596"
  ),
  createData(
    "Gallo Estanislao Petrona",
    "Franco",
    "argentina",
    "soltero",
    "empleado",
    "instruido",
    "25",
    "12/12/1995",
    "35.243.852",
    "Francia Nro 2166 de Rosario Piso 2 Depto. 3",
    "2477-15487596"
  ),
];

const VictimTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        marginRight: { xs: "6px", sm: "8px" },
        marginLeft: { xs: "6px", sm: "8px" },
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default VictimTable;
