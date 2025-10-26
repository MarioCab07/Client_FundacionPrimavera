import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const fields = [
  { key: "gender", label: "Género" },
  { key: "zone", label: "Zona" },
  { key: "department", label: "Departamento" },
  { key: "municipality", label: "Municipio" },
  { key: "education_level", label: "Nivel Educativo" },
  { key: "house_condition", label: "Condición de Vivienda" },
  { key: "phone_company", label: "Compañía Telefónica" },
  { key: "blood_type", label: "Tipo de Sangre" },
  { key: "shirt_size", label: "Talla de Camisa" },
  { key: "shoe_size", label: "Talla de Zapatos" },
  { key: "income_type", label: "Tipo de Ingreso" },
  { key: "referral_source", label: "Fuente de Referencia" },
  { key: "affiliation", label: "Afiliación" },
  { key: "discapacities", label: "Discapacidades" },
  { key: "illness", label: "Enfermedades" },
  { key: "medical_service", label: "Servicio Médico" },
  { key: "community", label: "Comunidad" },
  { key: "active.value", label: "Estado Activo" },
  { key: "transportation.difficulty", label: "Dificultad de Transporte" },
  {
    key: "transportation.person_available",
    label: "Persona Disponible Transporte",
  },
  { key: "write_and_read", label: "Sabe Leer y Escribir" },
  { key: "whatsapp", label: "Usa WhatsApp" },
  { key: "person_in_charge.name", label: "Tiene Responsable (Nombre)" }, // puedes simplificar solo a "Con responsable"
  { key: "dependents", label: "Dependientes" },
];

const CrossFilterModal = ({ open, onClose, onConfirm }) => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const handleConfirm = () => {
    if (field1 && field2 && field1 !== field2) {
      onConfirm(field1, field2);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Seleccionar Campos para Cruce</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Campo 1</InputLabel>
          <Select
            label={"Campo 1"}
            value={field1}
            onChange={(e) => setField1(e.target.value)}
          >
            {fields.map((f) => (
              <MenuItem key={f.key} value={f.key}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Campo 2</InputLabel>
          <Select
            label={"Campo 2"}
            value={field2}
            onChange={(e) => setField2(e.target.value)}
          >
            {fields.map((f) => (
              <MenuItem key={f.key} value={f.key}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrossFilterModal;
