import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import BasicSelect from "../Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModifyModal({}) {
  //   if (!item) return null;
  //   const [modifyItem, setModifyItem] = useState(item);
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {item.product}
          </Typography> */}
          {/* <TextField
            id="price"
            label="Precio"
            variant="standard"
            value={item.price}
          />
          <TextField
            id="quantity"
            label="Cantidad"
            variant="standard"
            value={item.quantity}
          />
          <BasicSelect
            value={item.state}
            label={"Estado"}
            options={["Nuevo", "Casi Nuevo", "Usado", "Obsoleto", "Antiguo"]}
            setValue={(newVale) => {
              setModifyItem({ ...modifyItem, state: newVale });
            }}
          /> */}
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
        <Box>
          <Button>Cerrar</Button>
          <Button>Modificar</Button>
        </Box>
      </Modal>
    </div>
  );
}
