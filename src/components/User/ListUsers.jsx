import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const paginationModel = { page: 0, pageSize: 5 };

const ListUsers = ({ rows, handleOpenDelete, handleOpenUpdate }) => {
  const [search, setSearch] = useState("");

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dui",
      headerName: "DUI",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone_number",
      headerName: "Número teléfono",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Usuario",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "password",
      headerName: "Contraseña",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleOpenUpdate(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleOpenDelete(params.row)}
          >
            Borrar
          </Button>
        </Stack>
      ),
    },
  ];

  // 🔎 Filtro de búsqueda (case-insensitive en todos los campos)
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Paper sx={{ height: 500, width: "70%", padding: 2 }}>
      {/* Barra de búsqueda */}
      <TextField
        label="Buscar..."
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* DataGrid */}
      <DataGrid
        rows={filteredRows}
        getRowId={(row) => row.dui}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
};

export default ListUsers;
