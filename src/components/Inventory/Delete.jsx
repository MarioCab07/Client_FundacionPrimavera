import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { deleteItem } from "../../services/api.services";

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

export default function DeleteModal({ item, handleClose, onSubmit }) {
  if (!item) return null;

  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText.trim().toUpperCase() !== "CONFIRMAR") {
      toast.warning("Debes escribir CONFIRMAR para eliminar.");
      return;
    }

    try {
      const response = await deleteItem(item._id);
      if (response.status === 200) {
        toast.success(`"${item.product}" eliminado correctamente 🗑️`);
        onSubmit(); // actualiza la lista
        handleClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el artículo");
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
            color: "error.main",
          }}
        >
          Eliminar artículo
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <Typography variant="body1" textAlign="center">
            ¿Seguro que deseas eliminar el artículo{" "}
            <strong>{item.product}</strong>?
          </Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Esta acción no se puede deshacer. Para continuar, escribe{" "}
            <strong>CONFIRMAR</strong> en el campo siguiente:
          </Typography>

          <TextField
            label="Escribe CONFIRMAR para continuar"
            variant="outlined"
            size="small"
            fullWidth
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
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
            sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={confirmationText.trim().toUpperCase() !== "CONFIRMAR"}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
