import { useState, useEffect } from "react";
import { getInventory } from "../../services/api.services";
import { Item } from "../../components/Inventory/Item";
import { Header } from "../../components/Header";
import { toast } from "react-toastify";
import { MdInventory2 } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { CircularProgress, Box } from "@mui/material";
import ModifyModal from "../../components/Inventory/Modify";

const InvListPage = () => {
  const [invItems, setInvItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemSelected, setItemSelected] = useState(null);
  const [modifyModal, setModifyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    console.log(itemSelected);
  }, [itemSelected]);

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
    setModifyModal(true);
  };

  const handleCloseDelete = () => {
    setItemSelected(null);
    setModifyModal(false);
  };

  useEffect(() => {
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

        <Box display={"flex"} flexDirection={"row"}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            maxWidth={"80%"}
            justifyContent={"center"}
            gap={2}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {invItems.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      item={item}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenModify={handleOpenModify}
                    />
                  );
                })}
              </>
            )}
          </Box>
          <Box>Menu</Box>
        </Box>
      </section>
      {modifyModal && itemSelected && <ModifyModal />}
    </>
  );
};

export default InvListPage;
