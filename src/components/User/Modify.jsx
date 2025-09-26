import { useState } from "react";
import { toast } from "react-toastify";
import { handlePhoneChange } from "../../tools/tools";
import { updateUser } from "../../services/api.services";
import { sanitizeDate, sleep } from "../../tools/tools";
import { BsPencilSquare } from "react-icons/bs";
import BasicSelect from "../Select";
import { ROLES } from "../../constants/constants";

const Modify = ({ user, handleCloseUpdate, fetchData }) => {
  const inputStyle = `
    border-b border-black 
    bg-transparent 
    focus:bg-gray-200
    focus:border-0
    focus:rounded-2xl
    outline-none 
    p-2
`;

  const [modifiedUser, setModifiedUser] = useState(user);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleCloseUpdate();
      setIsClosing(false);
    }, 500);
  };

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setModifiedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      name: modifiedUser.name,
      dui: modifiedUser.dui,
      phone_number: modifiedUser.phone_number,
      email: modifiedUser.email,
      role: modifiedUser.role,
    };
    const toastId = toast.loading("Actualizando Voluntario...");
    try {
      const response = await updateUser(modifiedUser.id, form);
      if (response.status === 200) {
        toast.update(toastId, {
          render: "Voluntario actualizado!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });

        await sleep(800);

        handleClose();
        await fetchData();
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Hubo un problema!",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={` ${
          isClosing ? "slide-out-left" : "slide-in-left"
        } flex flex-col gap-5 justify-center items-center w-1/2 h-fit p-10 bg-white rounded-lg shadow-lg absolute top-1/3`}
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          maxHeight: "90vh",
        }}
      >
        <h3 className="font-bold">Modificar Usuario</h3>
        <div className="w-full flex justify-center items-center gap-6 flex-wrap">
          <h4>
            Usuario: <span className="font-semibold">{modifiedUser.name}</span>
          </h4>
          <h4>
            DUI: <span className="font-semibold">{modifiedUser.dui}</span>
          </h4>
        </div>

        <div className="flex gap-5 justify-center h-max items-start flex-wrap">
          <div className="flex flex-col gap-4 justify-center items-center h-max  flex-1">
            <label htmlFor="email" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Email</span>

              <input
                className={inputStyle}
                type="text"
                id="email"
                value={modifiedUser.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="phone_number" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Teléfono</span>

              <input
                className={inputStyle}
                type="text"
                id="phone_number"
                value={modifiedUser.phone_number}
                onChange={(e) =>
                  handlePhoneChange(e, setModifiedUser, modifiedUser)
                }
                maxLength={9}
              />
            </label>

            <BasicSelect
              options={[
                ROLES.ADMIN,
                ROLES.GERENTE,
                ROLES.COLABORADOR,
                ROLES.VOLUNTARIO,
              ]}
              setValue={(value) => {
                setModifiedUser({ ...modifiedUser, role: value });
              }}
              label={"Rol"}
              value={modifiedUser.role}
            />
          </div>
        </div>
        <div className="flex flex-1 w-full justify-between gap-8 items-center">
          <button
            type="submit"
            className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full font-bold">
              Modificar
            </span>

            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform translate-x-full group-hover:translate-x-0">
              <BsPencilSquare size={20} />
            </span>
          </button>
          <button
            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
            type="button"
            className="bg-amber-200 rounded-2xl px-4 py-2  cursor-pointer hover:bg-amber-50 transition ease-in-out 0.5s "
            onClick={handleClose}
          >
            Volver
          </button>
        </div>
      </form>
    </>
  );
};

export default Modify;
