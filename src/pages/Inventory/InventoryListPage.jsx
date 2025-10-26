import { useState, useEffect, useMemo } from "react";
import { getInventory } from "../../services/api.services";
import { Item } from "../../components/Inventory/Item";
import { Header } from "../../components/Header";
import { toast } from "react-toastify";
import { MdInventory2 } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { CircularProgress, Box, Button, Paper, TextField } from "@mui/material";
import ModifyModal from "../../components/Inventory/Modify";
import DeleteModal from "../../components/Inventory/Delete";
import AddItemModal from "../../components/Inventory/AddItem";
import { useAuth } from "../../context/AuthContext";

const InvListPage = () => {
  const [invItems, setInvItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemSelected, setItemSelected] = useState(null);
  const [modifyModal, setModifyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addModal, setAddModal] = useState(false);
  const handleOpenAdd = () => setAddModal(true);
  const handleCloseAdd = () => setAddModal(false);
  const { user } = useAuth();

  const canModify = user && user.role !== "VOLUNTARIO";

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return invItems;
    return invItems.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.quantity.toString().includes(searchTerm)
    );
  }, [searchTerm, invItems]);

  const handleOpenModify = (item) => {
    setItemSelected(item);
    setModifyModal(true);
  };

  const handleCloseModify = () => {
    setModifyModal(false);
    setTimeout(() => setItemSelected(null), 200); // 200 ms después del cierre visual
  };
  const handleOpenDelete = (item) => {
    setItemSelected(item);
    setDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setItemSelected(null);
    setDeleteModal(false);
  };

  const getInventoryList = async () => {
    try {
      const response = await getInventory();

      setInvItems(response.data.items);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInventoryList();
  }, []);

  useEffect(() => {
    console.log(invItems);
  }, [invItems]);
  return (
    <>
      <Header />
      <section className="flex flex-col items-center">
        <article className=" w-1/2  font-bold text-3xl p-10 flex justify-center items-center gap-5">
          <MdInventory2 size={50} color="#4B5563" />
          <h2 className=" text-5xl text-gray-500  "> Inventario</h2>
        </article>

        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            maxWidth={"100%"}
            minWidth={"80%"}
            justifyContent={"flex-start"}
            alignContent={"center"}
            gap={4}
          >
            {loading ? (
              <CircularProgress />
            ) : invItems.length === 0 ? (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="60vh"
                  textAlign="center"
                  color="text.secondary"
                  gap={2}
                  minWidth={"100%"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9e9e9e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>

                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="text.primary"
                  >
                    No se han agregado items
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", maxWidth: 300 }}
                  >
                    Aún no hay artículos registrados en el inventario. Usa el
                    botón <strong>“Agregar Item”</strong> para comenzar.
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                {filteredItems.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    handleOpenDelete={handleOpenDelete}
                    handleOpenModify={handleOpenModify}
                  />
                ))}
              </>
            )}
          </Box>
          <Box sx={{ width: "50%" }}>
            <Paper
              elevation={3}
              sx={{
                minHeight: "fit-content",
                height: "50%",
                width: 280,
                p: 3,
                borderRadius: 4,
                bgcolor: "#F7F7F7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "left",
                  width: "100%",
                  mb: 1,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Gestion de inventario
              </Typography>

              <TextField
                placeholder="Buscar..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#B0A9A9",
                    opacity: 1,
                  },
                }}
              />
              {canModify && (
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: "#E5E500",
                    color: "#000",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "none",
                    px: 4,
                    "&:hover": {
                      backgroundColor: "#D4D400",
                    },
                  }}
                  onClick={handleOpenAdd}
                >
                  Agregar Item
                </Button>
              )}
            </Paper>
          </Box>
        </Box>
      </section>
      {modifyModal && itemSelected && (
        <ModifyModal
          onSubmit={getInventoryList}
          item={itemSelected}
          o
          handleClose={handleCloseModify}
        />
      )}
      {deleteModal && itemSelected && (
        <DeleteModal
          onSubmit={getInventoryList}
          item={itemSelected}
          handleClose={handleCloseDelete}
        />
      )}
      {addModal && (
        <AddItemModal
          handleClose={handleCloseAdd}
          onSubmit={getInventoryList}
        />
      )}
    </>
  );
};

export default InvListPage;
