import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  Stack,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { addItem } from "../../services/api.services";
import dayjs from "dayjs";
import BasicSelect from "../Select";
import defaultImage from "../../assets/images/defaultItem.jpg";
import { Grid } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function AddItemModal({ handleClose, onSubmit }) {
  const [newItem, setNewItem] = useState({
    product: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
    state: "",
    provider: "",
    origin: "",
    acquisition_date: dayjs().format("YYYY-MM-DD"),
  });

  // imagen seleccionada y vista previa
  const [preview, setPreview] = useState(defaultImage);
  const [image, setImage] = useState(null);

  const handleChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  // ✅ misma lógica que en BenForm
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const targetWidth = 345;
      const targetHeight = 230;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 🔹 Dibujar la imagen redimensionada
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // 🔹 Convertir el resultado del canvas en Blob (archivo)
      canvas.toBlob(
        (blob) => {
          // Crear un nuevo archivo con las dimensiones normalizadas
          const resizedFile = new File([blob], file.name, { type: file.type });

          setImage(resizedFile); // guardar el archivo redimensionado para enviar
          setPreview(URL.createObjectURL(resizedFile)); // vista previa formateada
        },
        file.type,
        0.9 // calidad (para JPG o WEBP)
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      if (!newItem.product || !newItem.price || !newItem.quantity) {
        toast.warning("Por favor completa los campos obligatorios");
        return;
      }

      const formData = new FormData();

      // Añadir todos los campos del nuevo item
      for (const key in newItem) {
        formData.append(key, newItem[key]);
      }

      // Si el usuario subió imagen, se envía esa.
      // Si no, se usa la imagen por defecto (convertida a blob como en BenForm)
      if (image) {
        formData.append("image", image);
      } else {
        const response = await fetch(defaultImage);
        const blob = await response.blob();
        formData.append("image", blob, "defaultItem.jpg");
      }

      const response = await addItem(formData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Item agregado correctamente 🎉");
        onSubmit();
        handleClose();
      }
    } catch (error) {
      toast.error("Error al agregar el ítem");
      console.error(error);
    }
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: "center",
            color: "primary.main",
          }}
        >
          Agregar nuevo artículo
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          {/* Vista previa de imagen */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: 120,
                height: 120,
                borderRadius: "10px",
                objectFit: "cover",
                boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <InputLabel
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                mb: 1,
              }}
            >
              Imagen del producto (opcional)
            </InputLabel>

            {/* Botón estilizado */}
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderRadius: "25px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 600,
                color: "#444",
                borderColor: "#ccc",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  borderColor: "#bbb",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                <polyline points="7 9 12 4 17 9" />
                <line x1="12" x2="12" y1="4" y2="16" />
              </svg>
              Subir imagen
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* Nombre del archivo */}
            {image && (
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary", fontSize: "0.9rem" }}
              >
                {image.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%", mt: 2 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={3}
              alignItems="flex-start"
              justifyContent="center"
            >
              {/* 🟦 Primera fila */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre del producto"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.product}
                  onChange={(e) => handleChange("product", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
              </Grid>

              {/* 🟩 Segunda fila */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Precio ($)"
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={1}
                  value={newItem.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Grid>

              {/* 🟨 Tercera fila */}
              <Grid item xs={12} sm={6}>
                <BasicSelect
                  label="Categoría"
                  options={[
                    "Inmueble",
                    "Instrumento",
                    "Limpieza",
                    "Utensilio",
                    "Tecnológico",
                    "Material lúdico",
                  ]}
                  value={newItem.category}
                  setValue={(value) => handleChange("category", value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <BasicSelect
                  label="Estado"
                  options={[
                    "Nuevo",
                    "Casi Nuevo",
                    "Usado",
                    "Obsoleto",
                    "Antiguo",
                  ]}
                  value={newItem.state}
                  setValue={(value) => handleChange("state", value)}
                />
              </Grid>

              {/* 🟧 Cuarta fila */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Proveedor"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.provider}
                  onChange={(e) => handleChange("provider", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Origen"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.origin}
                  onChange={(e) => handleChange("origin", e.target.value)}
                />
              </Grid>

              {/* 🟪 Última fila - Fecha ocupa las 2 columnas */}
              <Grid item xs={12}>
                <TextField
                  label="Fecha de adquisición"
                  type="date"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newItem.acquisition_date}
                  onChange={(e) =>
                    handleChange("acquisition_date", e.target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>

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
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
