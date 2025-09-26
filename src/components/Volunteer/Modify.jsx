import { useState } from "react";
import { toast } from "react-toastify";
import { handleNumbers, handlePhoneChange } from "../../tools/tools";
import { updateVolunteer } from "../../services/api.services";
import { sanitizeDate, sleep } from "../../tools/tools";
import { BsPencilSquare } from "react-icons/bs";

const Modify = ({ vol, setShowModify, setVolSelected, fetchData }) => {
  const inputStyle = `
    border-b border-black 
    bg-transparent 
    focus:bg-gray-200
    focus:border-0
    focus:rounded-2xl
    outline-none 
    p-2
`;

  const [modifiedVol, setModifiedVol] = useState(vol);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModify(false);
      setIsClosing(false);
      setVolSelected(null);
    }, 500);
  };

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setModifiedVol((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      name: modifiedVol.name,
      dui: modifiedVol.dui,
      phone_number: modifiedVol.phone_number,
      address: modifiedVol.address,
      service_type: modifiedVol.service_type,
      year_studied: modifiedVol.year_studied,
      occupation: modifiedVol.occupation,
      university: modifiedVol.university,
      starting_date: modifiedVol.starting_date,
      active: modifiedVol.active,
      birth_date: modifiedVol.birth_date,
      age: modifiedVol.age,
    };
    const toastId = toast.loading("Actualizando Voluntario...");
    try {
      const response = await updateVolunteer(vol._id, form);
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
        } flex flex-col gap-5 justify-center items-center w-full h-full p-10 bg-white rounded-lg shadow-lg`}
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          maxHeight: "90vh",
        }}
      >
        <h3 className="font-bold">Modificar Voluntario</h3>
        <div className="w-full flex justify-center items-center gap-6 flex-wrap">
          <h4>
            Voluntario:{" "}
            <span className="font-semibold">{modifiedVol.name}</span>
          </h4>
          <h4>
            DUI: <span className="font-semibold">{modifiedVol.dui}</span>
          </h4>
          <h4>
            Edad: <span className="font-semibold">{modifiedVol.age}</span>
          </h4>
          <h4>
            Fecha de Nacimiento:{" "}
            <span className="font-semibold">
              {sanitizeDate(modifiedVol.birth_date)}
            </span>
          </h4>
          <h4>
            Fecha de Inicio:{" "}
            <span className="font-semibold">
              {sanitizeDate(modifiedVol.starting_date)}
            </span>
          </h4>
        </div>

        <div className="flex gap-5 justify-center h-max items-start flex-wrap">
          <div className="flex flex-col gap-2 justify-center items-center h-max  flex-1">
            <h5 className="font-bold">Información de Contacto</h5>

            <label htmlFor="phone_number" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Teléfono</span>

              <input
                className={inputStyle}
                type="text"
                id="phone_number"
                value={modifiedVol.phone_number}
                onChange={(e) =>
                  handlePhoneChange(e, setModifiedVol, modifiedVol)
                }
                maxLength={9}
              />
            </label>

            <label htmlFor="address" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Dirección</span>

              <input
                className={inputStyle}
                type="text"
                id="address"
                value={modifiedVol.address}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="occupation" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Ocupación</span>

              <input
                className={inputStyle}
                type="text"
                id="occupation"
                value={modifiedVol.occupation}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center h-max  flex-1">
            <h5 className="font-bold">Información Adicional</h5>

            <label htmlFor="service_type" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Tipo de Servicio</span>

              <input
                className={inputStyle}
                type="text"
                id="service_type"
                value={modifiedVol.service_type}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="university" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Universidad</span>

              <input
                className={inputStyle}
                type="text"
                id="university"
                value={modifiedVol.university}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="year_studied" className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Año Cursado</span>

              <input
                className={inputStyle}
                type="number"
                id="year_studied"
                value={modifiedVol.year_studied}
                onChange={(e) => {
                  handleNumbers(e, setModifiedVol, modifiedVol);
                }}
              />
            </label>
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
