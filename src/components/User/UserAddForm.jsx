import { useEffect, useState } from "react";
import {
  handleDuiChange,
  handlePhoneChange,
  inputStyle,
  sleep,
} from "../../tools/tools";
import BasicSelect from "../Select";
import { ROLES } from "../../constants/constants";
import { registerUser } from "../../services/api.services";
import { toast } from "react-toastify";
import { IoMdPersonAdd } from "react-icons/io";

const spanStyle = `
    flex flex-col gap-1
    `;

const UserAddForm = () => {
  const [form, setForm] = useState({
    name: "",
    dui: "",
    phone_number: "",
    role: "",
  });
  const [success, setSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const handleChange = (e) => {
    let value = e.target.value;

    setForm({ ...form, name: value });
  };
  const inpStyle = inputStyle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Registrando Usuario...");
    try {
      const response = await registerUser(form);
      if (response.status === 201) {
        toast.update(toastID, {
          render: "Usuario Registrado",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        await sleep(1000);
        setForm({
          name: "",
          dui: "",
          phone_number: "",
          role: "",
        });
        setSuccess(true);
        setCredentials(response.data);
      }
    } catch (error) {
      toast.update(toastID, {
        render: error.response.data.error || "Error al registrar usuario",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSuccess(false);
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      <form className="min-h-fit w-full h-full flex flex-col justify-center items-center relative">
        <section
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex flex-wrap gap-8 rounded-3xl w-1/2 bg-white"
        >
          <div className="flex flex-col gap-6 p-10 flex-1">
            <label htmlFor="name" className="text-lg flex flex-col">
              <p className="font-semibold">Nombre</p>
              <input
                required
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className={inpStyle}
              />
            </label>

            <label htmlFor="dui" className="text-lg flex flex-col">
              <p className="font-semibold">DUI</p>
              <input
                required
                type="text"
                id="dui"
                value={form.dui}
                onChange={(e) => {
                  handleDuiChange(e, setForm, form);
                }}
                className={inpStyle}
              />
            </label>

            <label htmlFor="phone_number" className="text-lg flex flex-col">
              <p className="font-semibold">Teléfono</p>
              <input
                type="text"
                required
                id="phone_number"
                value={form.phone_number}
                onChange={(e) => {
                  handlePhoneChange(e, setForm, form);
                }}
                className={inpStyle}
              />
            </label>

            <span className={` gap-6`}>
              <BasicSelect
                label={"Rol "}
                options={[
                  ROLES.ADMIN,
                  ROLES.GERENTE,
                  ROLES.COLABORADOR,
                  ROLES.VOLUNTARIO,
                ]}
                value={form.role}
                setValue={(value) => setForm({ ...form, role: value })}
              />
            </span>
          </div>
        </section>
        <button
          onClick={handleSubmit}
          type="button"
          className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full font-bold">
            Agregar
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform translate-x-full group-hover:translate-x-0">
            <IoMdPersonAdd size={20} />
          </span>
        </button>
      </form>

      {success && (
        <div onClick={handleClose} className="modal-backdrop ">
          <section
            className={` ${
              isClosing
                ? "scale-out-center"
                : success
                ? "scale-in-center"
                : "scale-out-center"
            } modal-container-user flex gap-4 items-center `}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-3xl">Credenciales de Usuario</h2>
            <article className="flex flex-col gap-4 h-1/2 justify-center">
              <p className="text-xl">
                Usuario:{" "}
                <span className="font-semibold"> {credentials.username}</span>
              </p>
              <p className="text-xl">
                Contraseña:{" "}
                <span className="font-semibold">{credentials.password}</span>
              </p>
            </article>
            <button
              className="p-2 rounded-2xl w-20 text-white relative overflow-hidden cursor-pointer group bg-amber-300 hover:bg-amber-400 transition-all ease-in-out"
              onClick={handleClose}
              type="button"
            >
              Cerrar
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default UserAddForm;
