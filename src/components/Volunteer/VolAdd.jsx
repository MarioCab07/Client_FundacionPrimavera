import { useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { IoMdPersonAdd } from "react-icons/io";

import { addVolunteer } from "../../services/api.services";
import {
  sleep,
  inputStyle,
  handleDuiChange,
  handlePhoneChange,
  handleNumbers,
} from "../../tools/tools";
import { toast } from "react-toastify";
import DatePicker from "../DatePicker";
import BasicSelect from "../Select";
import OptionCheckBox from "../YesNoExclusive";

const menuOptions = {
  Personal: "personal",
  Profesional: "profesional",
  Servicio: "servicio",
};

const VolForm = () => {
  const inpStyle = inputStyle();

  const [form, setForm] = useState({
    name: "",
    dui: "",
    birth_date: "",
    starting_date: "",
    occupation: "",
    university: "",
    phone_number: "",
    address: "",
    service_type: "",
    year_studied: 0,
    gender: "",
  });
  const [birthDate, setBirthDate] = useState(dayjs().utc());
  const [startingDate, setStartingDate] = useState(dayjs().utc());
  const [endingDate, setEndingDate] = useState(startingDate.add(1, "year"));
  const [isStudying, setIsStudying] = useState(false);
  const [menu, setMenu] = useState(menuOptions.Personal);

  const handleChange = (e) => {
    e.preventDefault();
    const field = e.target.id;
    let value;
    if (field === "address") {
      value = e.target.value;
    } else {
      value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Agregando Voluntario...");
    const starting_date = startingDate.format("MM-DD-YYYY");
    const ending_date = endingDate.format("MM-DD-YYYY");
    const birth_date = birthDate.format("MM-DD-YYYY");
    const updatedForm = {
      ...form,
      birth_date,
      starting_date,
      ending_date,
    };
    try {
      const response = await addVolunteer(updatedForm);

      if (response.status === 201) {
        toast.update(toastId, {
          render: "Voluntario Agregado",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        await sleep(1000);
        setForm({
          name: "",
          dui: "",
          birth_date: "",
          starting_date: "",
          occupation: "",
          university: "",
          phone_number: "",
          adress: "",
          service_type: "",
          year_studied: "",
          gender: "",
        });
        setMenu(menuOptions.Personal);
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.error || "Error al agregar voluntario",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <form className="min-h-fit w-full h-full flex flex-col justify-center items-center relative">
        <section
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="flex flex-wrap gap-8 rounded-3xl w-1/2 bg-white"
        >
          {menu === menuOptions.Personal ? (
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
              <span className={` gap-6`}>
                <BasicSelect
                  label={"Genero"}
                  options={["M", "F"]}
                  value={form.gender}
                  setValue={(value) => setForm({ ...form, gender: value })}
                />
              </span>
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
              <label htmlFor="address" className="text-lg flex flex-col">
                <p className="font-semibold">Dirección</p>
                <input
                  required
                  type="text"
                  id="address"
                  value={form.address}
                  onChange={handleChange}
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
              <label htmlFor="" className="text-lg gap-2 flex flex-col">
                <p className="font-semibold">Fecha de Nacimiento</p>
                <DatePicker date={birthDate} setDate={setBirthDate} />
              </label>
            </div>
          ) : menu === menuOptions.Profesional ? (
            <div className="flex flex-col gap-6 p-10 flex-1">
              <label htmlFor="occupation" className="text-lg flex flex-col">
                <p className="font-semibold">Carrera/Trabajo</p>
                <input
                  required
                  type="text"
                  id="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={inpStyle}
                />
              </label>
              <span className="flex items-center gap-4 w-full justify-center">
                <p className="text-lg">
                  Esta estudiando o ha finalizo estudios universitarios?
                </p>
                <OptionCheckBox
                  label={"Si"}
                  selected={isStudying}
                  onSelect={() => setIsStudying(true)}
                />
                <OptionCheckBox
                  label={"No"}
                  selected={!isStudying}
                  onSelect={() => setIsStudying(false)}
                />
              </span>
              {isStudying ? (
                <>
                  <label htmlFor="university" className="text-lg flex flex-col">
                    <p className="font-semibold">Universidad</p>
                    <input
                      type="text"
                      id="university"
                      value={form.university}
                      onChange={handleChange}
                      className={inpStyle}
                    />
                  </label>
                  <label
                    htmlFor="year_studied"
                    className="text-lg flex flex-col"
                  >
                    <p className="font-semibold">Año Cursado</p>
                    <input
                      type="number"
                      id="year_studied"
                      value={form.year_studied}
                      onChange={(e) => {
                        handleNumbers(e, setForm, form);
                      }}
                      className={inpStyle}
                    />
                  </label>
                </>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-6 p-10 flex-1">
              <label htmlFor="" className="text-lg gap-2 flex flex-col">
                <p className="font-semibold">Tipo de Servicio</p>
                <BasicSelect
                  label={"Tipo de Servicio"}
                  options={[
                    "Horas Sociales",
                    "Voluntario",
                    "Pasantia",
                    "Practicas por Materia",
                  ]}
                  value={form.service_type}
                  setValue={(value) =>
                    setForm({ ...form, service_type: value })
                  }
                />
              </label>

              <label htmlFor="" className="text-lg gap-2 flex flex-col">
                <p className="font-semibold">Fecha de Inicio</p>
                <DatePicker date={startingDate} setDate={setStartingDate} />
              </label>
              <label htmlFor="" className="text-lg gap-2 flex flex-col">
                <p className="font-semibold">Fecha de Fin</p>
                <DatePicker date={endingDate} setDate={setEndingDate} />
              </label>
            </div>
          )}
        </section>

        <div className="py-8 absolute -bottom-17">
          {menu === menuOptions.Personal ? (
            <button
              type="button"
              className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group bg-amber-300"
              onClick={(e) => {
                e.preventDefault();
                setMenu(menuOptions.Profesional);
              }}
            >
              Siguiente
            </button>
          ) : menu === menuOptions.Profesional ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group bg-amber-300"
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(menuOptions.Personal);
                }}
              >
                Atras
              </button>
              <button
                type="button"
                className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group bg-amber-300"
                onClick={() => {
                  setMenu(menuOptions.Servicio);
                }}
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group bg-amber-300"
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(menuOptions.Profesional);
                }}
              >
                Atras
              </button>
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
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default VolForm;

//
