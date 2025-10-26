import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  Stack,
} from "@mui/material";
import BasicSelect from "../Select";
import { toast } from "react-toastify";
import { updateItem } from "../../services/api.services";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function ModifyModal({ item, handleClose, onSubmit }) {
  if (!item) return null;

  const [modifyItem, setModifyItem] = useState(item);

  const handleChange = (field, value) => {
    setModifyItem({ ...modifyItem, [field]: value });
  };

  const submit = async () => {
    try {
      const response = await updateItem(item._id, modifyItem);
      if (response.status === 200)
        toast.success("Item actualizado correctamente 🎉");
    } catch (error) {
      toast.error("Error al actualizar el item");
      console.error(error);
    } finally {
      onSubmit();
      handleClose();
    }
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Título */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: "center",
            color: "primary.main",
          }}
        >
          Modificar artículo
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Contenido principal */}
        <Stack spacing={2}>
          <TextField
            label="Producto"
            variant="outlined"
            size="small"
            fullWidth
            value={modifyItem.product}
            onChange={(e) => handleChange("product", e.target.value)}
          />

          <TextField
            label="Precio ($)"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={modifyItem.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />

          <TextField
            label="Cantidad"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={modifyItem.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />

          <BasicSelect
            value={modifyItem.state}
            label={"Estado"}
            options={["Nuevo", "Casi Nuevo", "Usado", "Obsoleto", "Antiguo"]}
            setValue={(newValue) => handleChange("state", newValue)}
          />
          <TextField
            label="Descripcion"
            variant="outlined"
            size="small"
            fullWidth
            value={modifyItem.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Stack>

        {/* Botones */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
