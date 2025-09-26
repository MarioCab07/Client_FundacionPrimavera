import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/api.services";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteUser = ({ user, handleCloseDelete, fetchData }) => {
  const [confirm, setConfirm] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleCloseDelete();
      setIsClosing(false);
    }, 500);
  };

  const handleChange = (e) => {
    setConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Eliminando Usuario...");

    try {
      const response = await deleteUser(user.dui);

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Usuario Eliminado!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });
        await fetchData();
        handleClose();
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Ocurrio un error!",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <>
      <section
        className={`${
          isClosing ? "scale-out-center" : "scale-in-center"
        } z-30 flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2 border-solid`}
      >
        <h3 className="text-center font-bold">Eliminar Usuario</h3>
        <p>
          Usuario: <span className="font-semibold">{user.name}</span>
        </p>

        <p>Escriba confirmar para proceder</p>
        <input
          type="text"
          placeholder="confirmar"
          value={confirm}
          onChange={handleChange}
        />
        <div className="flex flex-1 w-full gap-4 items-center justify-center">
          <form
            className="flex justify-center gap-4"
            action="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <button
              className={`rounded-2xl p-3 flex items-center text-white  ${
                confirm !== "confirmar"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-200 hover:text-red-500 cursor-pointer"
              }`}
              disabled={confirm !== "confirmar"}
              type="submit"
            >
              Eliminar <AiOutlineDelete size={20} />
            </button>
            <button
              className="bg-[#FFF582] rounded-2xl p-3  hover:bg-white transition ease-in-out 0.5s cursor-pointer  flex  items-center justify-center mx-auto"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              type="button"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default DeleteUser;
