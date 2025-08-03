import { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import DatePicker from "../DatePicker";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";
import OptionCheckBox from "../YesNoExclusive";
import { RiUserAddLine } from "react-icons/ri";

import {
  inputStyle,
  handleDuiChange,
  handleNumbers,
  handlePhoneChange,
} from "../../tools/tools";

const inpStyle = inputStyle();
const spanStyle = `flex flex-col gap-1`;
const departmentsElSalvador = [
  "Ahuachapán",
  "Cabañas",
  "Chalatenango",
  "Cuscatlán",
  "La Libertad",
  "La Paz",
  "La Unión",
  "Morazán",
  "San Miguel",
  "San Salvador",
  "San Vicente",
  "Santa Ana",
  "Sonsonate",
  "Usulután",
];

const roomCondition = ["Propia", "Alquilada", "Dormitorio Publico"];
const relationships = [
  "Solo/a",
  "Familia (pareja, hijos,padres)",
  "Conocidos o amigos",
  "Personas ajenas",
];
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const educationLevels = ["Basica", "Media", "Superior"];
const programs = ["Fundacion Primavera", "Programa 2", "Programa 3"];

export const GeneralSection = ({
  picture,
  handlePictureChange,
  form,
  setForm,
  handleChange,
  birthDate,
  setBirthDate,
  handleChangeSection,
}) => {
  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">Informacion General</h4>
        <div className="flex w-full items-center justify-center h-full">
          <div className="p-2 flex flex-col items-center justify-center gap-4  w-1/4 h-full ">
            <img
              className="rounded-full w-60 h-60 object-cover"
              src={picture}
              alt=""
            />

            <input
              className="hidden"
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />

            <label
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="flex justify-center rounded-xl items-center gap-4 py-2 px-3 hover:cursor-pointer hover:bg-black hover:text-[#FFF582] bg-[#FFF582] w-1/2 "
              htmlFor="fileInput"
            >
              <h5 className="flex 1">Subir Foto</h5>{" "}
              <BsUpload style={{ fontWeight: "bold" }} />{" "}
            </label>
          </div>

          <div className="flex flex-col w-full gap-12 p-4">
            <div className="flex w-full gap-10 items-center ">
              <span className={`${spanStyle} w-1/2`}>
                <label className="font-semibold" htmlFor="name">
                  Nombre Completo
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  className={`${inpStyle}`}
                  value={form.name}
                  onChange={handleChange}
                />
              </span>
              <span className={`${spanStyle} gap-6`}>
                <BasicSelect
                  label={"Genero"}
                  options={["M", "F"]}
                  value={form.gender}
                  setValue={(value) => setForm({ ...form, gender: value })}
                />
              </span>
            </div>

            <div className="flex w-full gap-10">
              <span className={`${spanStyle} w-1/3`}>
                <label className="font-semibold" htmlFor="dui">
                  DUI
                </label>
                <input
                  id="dui"
                  type="text"
                  className={inpStyle}
                  placeholder="12345678-9"
                  value={form.dui} // Bind the value to the form state
                  onChange={(e) => {
                    handleDuiChange(e, setForm, form);
                  }} // Format the input dynamically
                  maxLength={10}
                  required // Limit the input length to 10 characters (8 digits + 1 dash)
                />
              </span>
              <span className={`${spanStyle} w-1/3`}>
                <label className="font-semibold" htmlFor="weight">
                  Peso
                </label>
                <input
                  required
                  id="weight"
                  type="text"
                  className={inpStyle}
                  placeholder="lb"
                  value={form.weight}
                  onChange={(e) => {
                    handleNumbers(e, setForm, form);
                  }}
                />
              </span>
              <span className={`${spanStyle} w-1/3`}>
                <label className="font-semibold" htmlFor="eight">
                  Altura
                </label>
                <input
                  required
                  id="height"
                  type="text"
                  className={inpStyle}
                  placeholder="cm"
                  value={form.height}
                  onChange={(e) => {
                    handleNumbers(e, setForm, form);
                  }}
                />
              </span>
            </div>

            <div className="flex w-full gap-10">
              <span className={`${spanStyle} w-1/2`}>
                <label className="font-semibold" htmlFor="birth_place">
                  Lugar de Nacimiento
                </label>
                <input
                  id="birth_place"
                  required
                  type="text"
                  className={inpStyle}
                  value={form.birth_place}
                  onChange={handleChange}
                />
              </span>
              <span className="flex gap-6 items-center">
                <DatePicker
                  label={"Fecha de Nacimiento"}
                  date={birthDate}
                  setDate={setBirthDate}
                />
              </span>
            </div>

            <div className="flex w-full gap-10">
              <span className={`flex justify-center items-center gap-6`}>
                <p className="font-semibold">Talla de camisa</p>
                <BasicSelect
                  label={"Talla"}
                  options={["XS", "S", "M", "L", "XL", "XXL"]}
                  value={form.shirt_size}
                  setValue={(value) => setForm({ ...form, shirt_size: value })}
                />
              </span>
              <span className={`flex justify-center items-center gap-6`}>
                <p className="font-semibold">Talla de zapatos</p>
                <BasicSelect
                  label={"Talla"}
                  options={["4", "5", "6", "7", "8", "9", "10", "11"]}
                  value={form.shoe_size}
                  setValue={(value) => setForm({ ...form, shoe_size: value })}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={() => handleChangeSection("Información de contacto")}
            className="next-button"
          >
            <div className="text-xs">Informacion de:</div>
            <div className="font-bold">Contacto</div>
          </button>
        </div>
      </article>
    </>
  );
};

export const ContactSection = ({
  form,
  setForm,
  handleChange,
  handleChangeSection,
}) => {
  return (
    <>
      <article className="flex w-full flex-col px-4 py-8 h-full">
        <h4 className="text-center font-bold text-2xl">
          Informacion de Contacto
        </h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center">
          <span className={`${spanStyle} w-1/3`}>
            <label className="font-semibold" htmlFor="phone_number">
              Telefono Celular
            </label>
            <input
              value={form.phone_number}
              onChange={(e) => {
                handlePhoneChange(e, setForm, form);
              }}
              id="phone_number"
              type="text"
              className={inpStyle}
            />
          </span>
          <span className={`${spanStyle}  w-1/3 gap-6`}>
            <BasicSelect
              label={"Compañía Telefónica"}
              options={["Movistar", "Tigo", "Claro", "Digicel"]}
              value={form.phone_company}
              setValue={(value) => setForm({ ...form, phone_company: value })}
            />
          </span>
          <span className={`${spanStyle} w-1/3`}>
            <label className="font-semibold" htmlFor="home_phone">
              Telefono Fijo
            </label>
            <input
              value={form.home_phone}
              onChange={(e) => {
                handlePhoneChange(e, setForm, form);
              }}
              id="home_phone"
              type="text"
              className={inpStyle}
            />
          </span>
          <span className={` w-1/3 flex items-center gap-5`}>
            <p className="font-semibold">Posee whatsapp?</p>
            <CheckboxValue
              label={"Whatsapp"}
              checked={form.whatsapp}
              setChecked={(value) => setForm({ ...form, whatsapp: value })}
            />
          </span>
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => handleChangeSection("Información general")}
            className="prev-button"
          >
            <div className="text-xs">Informacion:</div>
            <div className="font-bold">General</div>
          </button>
          <button
            type="button"
            onClick={() => handleChangeSection("Información de vivienda")}
            className="next-button"
          >
            <div className="text-xs">Informacion de:</div>
            <div className="font-bold">Vivienda</div>
          </button>
        </div>
      </article>
    </>
  );
};

export const HouseSection = ({
  form,
  setForm,
  handleChange,
  handleChangeSection,
}) => {
  return (
    <>
      <article className="flex w-full flex-col px-4 py-8 h-full">
        <h4 className="text-center font-bold text-2xl">
          Informacion de Vivienda
        </h4>
        <div className="flex flex-col w-full p-4 items-center h-full justify-center gap-14">
          <div className="flex gap-10 w-full">
            <span className={`${spanStyle} w-1/3`}>
              <BasicSelect
                label={"Zona"}
                options={["Urbana", "Rural"]}
                value={form.zone}
                setValue={(value) => setForm({ ...form, zone: value })}
              />
            </span>
            <span className={`${spanStyle} w-1/3`}>
              <BasicSelect
                label={"Departamento"}
                options={departmentsElSalvador}
                value={form.department}
                setValue={(value) => setForm({ ...form, department: value })}
              />
            </span>
            <span className={`${spanStyle} w-1/3`}>
              <label className="font-semibold" htmlFor="municipality">
                Municipio
              </label>
              <input
                value={form.municipality}
                onChange={handleChange}
                id="municipality"
                type="text"
                className={inpStyle}
              />
            </span>
          </div>
          <div className="flex gap-10 w-full">
            <span className={`${spanStyle} w-1/2`}>
              <label className="font-semibold" htmlFor="address">
                Direccion
              </label>
              <input
                value={form.address}
                onChange={handleChange}
                id="address"
                type="text"
                className={inpStyle}
              />
            </span>
            <span className={`${spanStyle} w-1/2`}>
              <label className="font-semibold" htmlFor="reference_address">
                Punto de Referencia
              </label>
              <input
                value={form.reference_address}
                onChange={handleChange}
                id="reference_address"
                type="text"
                className={inpStyle}
              />
            </span>
          </div>
          <div className="flex gap-10 w-full">
            <span className={`${spanStyle} w-1/3`}>
              <BasicSelect
                label={"Condicion Habitacional"}
                options={roomCondition}
                value={form.house_condition}
                setValue={(value) =>
                  setForm({ ...form, house_condition: value })
                }
              />
            </span>
            <span className={`${spanStyle} w-1/4`}>
              <label
                className="font-semibold"
                htmlFor="people_in_house_quantity"
              >
                Cantidad de personas que viven con beneficiario
              </label>
              <input
                value={form.people_in_house_quantity}
                onChange={(e) => {
                  handleNumbers(e, setForm, form);
                }}
                id="people_in_house_quantity"
                type="text"
                className={inpStyle}
              />
            </span>
            <span className={`${spanStyle} w-1/3`}>
              <BasicSelect
                label={"Relacion con personas que vive"}
                options={relationships}
                value={form.people_in_house_relationship}
                setValue={(value) =>
                  setForm({ ...form, people_in_house_relationship: value })
                }
              />
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => handleChangeSection("Información de contacto")}
            className="prev-button"
          >
            <div className="text-xs">Informacion de:</div>
            <div className="font-bold">Contacto</div>
          </button>
          <button
            type="button"
            onClick={() => handleChangeSection("Información médica")}
            className="next-button"
          >
            <div className="text-xs">Informacion :</div>
            <div className="font-bold">Médica</div>
          </button>
        </div>
      </article>
    </>
  );
};

export const MedicalSection = ({
  form,
  setForm,
  handleChange,
  handleChangeSection,
}) => {
  const [illnessFilter, setIllnessFilter] = useState(null);
  const [medicineFilter, setMedicineFilter] = useState(null);
  const [discapacitiesFilter, setDiscapacitiesFilter] = useState(null);
  const [medicalServiceFilter, setMedicalServiceFilter] = useState(null);

  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">Informacion Medica</h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center">
          <div className="flex gap-10 w-full justify-center">
            <span className={`${spanStyle} gap-6 w-1/3`}>
              <BasicSelect
                label={"Tipo de Sangre"}
                options={bloodTypes}
                value={form.blood_type}
                setValue={(value) => setForm({ ...form, blood_type: value })}
              />
            </span>
          </div>
          <div
            className={`flex gap-10  justify-center ${
              illnessFilter === "si" ? "w-full" : "w-1/3"
            } transition-all ease-in-out duration-500`}
          >
            <span className={`flex gap-6 w-full items-center`}>
              <p>Posee alguna enfermedad?</p>
              <OptionCheckBox
                label={"Si"}
                selected={illnessFilter === "si"}
                onSelect={() => setIllnessFilter("si")}
              />
              <OptionCheckBox
                label={"No"}
                selected={illnessFilter === "no"}
                onSelect={() => setIllnessFilter("no")}
              />

              {illnessFilter === "si" && (
                <input
                  id="illness"
                  value={form.illness}
                  onChange={handleChange}
                  type="text"
                  className={`${inpStyle} w-full`}
                  placeholder="Especificar enfermedad(es)"
                />
              )}
            </span>
          </div>
          <div
            className={`flex gap-10  justify-center ${
              medicineFilter === "si" ? "w-full" : "w-1/3"
            } transition-all ease-in-out duration-500`}
          >
            <span className={`flex gap-6 w-full items-center`}>
              <p>Depende de algun medicamento?</p>
              <OptionCheckBox
                label={"Si"}
                selected={medicineFilter === "si"}
                onSelect={() => setMedicineFilter("si")}
              />
              <OptionCheckBox
                label={"No"}
                selected={medicineFilter === "no"}
                onSelect={() => setMedicineFilter("no")}
              />

              {medicineFilter === "si" && (
                <input
                  id="medicines"
                  value={form.medicines}
                  onChange={handleChange}
                  type="text"
                  className={`${inpStyle} w-full`}
                  placeholder="Especificar medicamento(s)"
                />
              )}
            </span>
          </div>
          <div
            className={`flex gap-10  justify-center ${
              discapacitiesFilter === "si" ? "w-full" : "w-1/3"
            } transition-all ease-in-out duration-500`}
          >
            <span className={`flex gap-6 w-full items-center`}>
              <p>Posee alguna discapacidad?</p>
              <OptionCheckBox
                label={"Si"}
                selected={discapacitiesFilter === "si"}
                onSelect={() => setDiscapacitiesFilter("si")}
              />
              <OptionCheckBox
                label={"No"}
                selected={discapacitiesFilter === "no"}
                onSelect={() => setDiscapacitiesFilter("no")}
              />

              {discapacitiesFilter === "si" && (
                <input
                  id="discapacities"
                  value={form.discapacities}
                  onChange={handleChange}
                  type="text"
                  className={`${inpStyle} w-full`}
                  placeholder="Especificar discapacidad(s)"
                />
              )}
            </span>
          </div>
          <div
            className={`flex gap-10  justify-center ${
              medicalServiceFilter === "si" ? "w-full" : "w-1/3"
            } transition-all ease-in-out duration-500`}
          >
            <span className={`flex gap-6 w-full items-center`}>
              <p>Posee algún servicio médico?</p>
              <OptionCheckBox
                label={"Si"}
                selected={medicalServiceFilter === "si"}
                onSelect={() => setMedicalServiceFilter("si")}
              />
              <OptionCheckBox
                label={"No"}
                selected={medicalServiceFilter === "no"}
                onSelect={() => setMedicalServiceFilter("no")}
              />

              {medicalServiceFilter === "si" && (
                <input
                  id="medical_service"
                  value={form.medical_service}
                  onChange={handleChange}
                  type="text"
                  className={`${inpStyle} w-full`}
                  placeholder="Especificar servicio médico(s) o seguro(s) médico(s)"
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => handleChangeSection("Información de vivienda")}
            className="prev-button"
          >
            <div className="text-xs">Informacion de:</div>
            <div className="font-bold">Vivienda</div>
          </button>
          <button
            type="button"
            onClick={() => handleChangeSection("Información de oficio")}
            className="next-button"
          >
            <div className="text-xs">Informacion de :</div>
            <div className="font-bold">Oficio</div>
          </button>
        </div>
      </article>
    </>
  );
};

export const WorkSection = ({
  form,
  setForm,
  handleChange,
  handleChangeSection,
}) => {
  const [occupationFilter, setOccupationFilter] = useState(null);
  const [incomeControl, setIncomeControl] = useState(false);
  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">
          Informacion de Oficio
        </h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center">
          <div className="flex w-1/2 justify-items-stretch items-center">
            <span className={`${spanStyle} w-full `}>
              <CheckboxValue
                label={"Puede leer y escribir"}
                checked={form.write_and_read}
                setChecked={(value) =>
                  setForm({ ...form, write_and_read: value })
                }
              />
            </span>
            <span className={`${spanStyle} w-full  `}>
              <BasicSelect
                options={educationLevels}
                value={form.education_level}
                setValue={(value) =>
                  setForm({ ...form, education_level: value })
                }
                label={"Nivel de educación"}
              />
            </span>
          </div>
          <div
            className={`flex gap-10  justify-center ${
              occupationFilter === "si" ? "w-1/2" : "w-1/3"
            } transition-all ease-in-out duration-500`}
          >
            <span className={`flex gap-6 w-full items-center`}>
              <p>Posee trabajo fijo o negocio propio?</p>
              <OptionCheckBox
                label={"Si"}
                selected={occupationFilter === "si"}
                onSelect={() => setOccupationFilter("si")}
              />
              <OptionCheckBox
                label={"No"}
                selected={occupationFilter === "no"}
                onSelect={() => setOccupationFilter("no")}
              />

              {occupationFilter === "si" && (
                <input
                  id="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  type="text"
                  className={`${inpStyle} w-full`}
                  placeholder="Especificar ocupación"
                />
              )}
            </span>
          </div>
          <div
            className={`flex flex-col  justify-center transition-all ease-in-out duration-500`}
          >
            <div className="flex gap-6 w-full items-center">
              <p>Que tipo de ingreso economico recibe?</p>
              <OptionCheckBox
                label={"Pension"}
                selected={form.income_level === "Pension"}
                onSelect={() => {
                  setForm({ ...form, income_level: "Pension" });
                  setIncomeControl(false);
                }}
              />
              <OptionCheckBox
                label={"Remesa"}
                selected={form.income_level === "Remesa"}
                onSelect={() => {
                  setForm({ ...form, income_level: "Remesa" });
                  setIncomeControl(false);
                }}
              />
              <OptionCheckBox
                label={"Familia"}
                selected={form.income_level === "Familia"}
                onSelect={() => {
                  setForm({ ...form, income_level: "Familia" });
                  setIncomeControl(false);
                }}
              />
              <OptionCheckBox
                label={"Otros"}
                selected={incomeControl}
                onSelect={() => {
                  setIncomeControl(true);
                  setForm({ ...form, income_level: "" });
                }}
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
                incomeControl
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <input
                id="income_level"
                value={form.income_level}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar ingreso economico"
                disabled={!incomeControl}
                aria-hidden={!incomeControl}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => handleChangeSection("Información médica")}
            className="prev-button"
          >
            <div className="text-xs">Informacion :</div>
            <div className="font-bold">Médica</div>
          </button>
          <button
            type="button"
            onClick={() => handleChangeSection("Información familiar")}
            className="next-button"
          >
            <div className="text-xs">Informacion :</div>
            <div className="font-bold">Familiar</div>
          </button>
        </div>
      </article>
    </>
  );
};

export const FamilySection = ({
  form,
  setForm,
  handleAddDependent,
  handleChange,
  handleChangeSection,
}) => {
  const [modal, setModal] = useState(false);
  const [dependent, setDependent] = useState("");
  const [responsible, setResponsible] = useState("");
  const handleDependent = (e) => {
    setDependent(e.target.value);
  };

  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">Informacion Familiar</h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center transition-all ease-in-out duration-500">
          <div className="flex flex-col w-1/2 justify-center items-center transition-all ease-in-out duration-500">
            <span className="flex items-center gap-4 w-full justify-center">
              <p>Depende de alguna persona?</p>
              <OptionCheckBox
                label={"Si"}
                selected={responsible}
                onSelect={() => setResponsible(true)}
              />
              <OptionCheckBox
                label={"No"}
                selected={!responsible}
                onSelect={() => setResponsible(false)}
              />
            </span>

            <div
              className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 w-full flex justify-center ${
                responsible
                  ? "max-h-[300px] opacity-100 mt-6"
                  : "max-h-0 opacity-0 mt-0 pointer-events-none"
              }`}
              aria-hidden={!responsible}
            >
              <div className="flex gap-6">
                <span className="flex flex-col justify-center items-center gap-2">
                  <input
                    id="personIC_name"
                    type="text"
                    className={`${inpStyle} flex-1`}
                    placeholder=""
                    value={form.personIC_name}
                    onChange={handleChange}
                    disabled={!responsible}
                  />
                  <label className="font-semibold" htmlFor="personIC_name">
                    Nombre Responsable
                  </label>
                </span>
                <span className="flex flex-col justify-center items-center gap-2">
                  <input
                    id="personIC_dui"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.personIC_dui}
                    onChange={(e) => {
                      handleDuiChange(e, setForm, form);
                    }}
                    disabled={!responsible}
                  />
                  <label className="font-semibold" htmlFor="personIC_dui">
                    DUI
                  </label>
                </span>
                <span className="flex flex-col justify-center items-center gap-2">
                  <input
                    id="personIC_phone_number"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.personIC_phone_number}
                    onChange={(e) => {
                      handlePhoneChange(e, setForm, form);
                    }}
                    disabled={!responsible}
                  />
                  <label
                    className="font-semibold"
                    htmlFor="personIC_phone_number"
                  >
                    Telefono
                  </label>
                </span>
              </div>
            </div>
          </div>
          <div className="  w-full flex flex-col  items-center  gap-9">
            <h5 className="font-bold">
              Personas que dependen del beneficiario
            </h5>
            {form.dependents.length === 0 ? (
              <p className="text-gray-500 italic">
                No hay dependientes agregados.
              </p>
            ) : (
              <>
                <div className="flex gap-10 flex-wrap">
                  {form.dependents.map((dependent) => {
                    return (
                      <div
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                        className="flex max-w-fit min-w-fit p-4 justify-center bg-[#ffffff] border-4 border-amber-200 text-black rounded-2xl"
                        key={dependent}
                      >
                        {dependent}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <div className="flex gap-6 w-full justify-center items-center">
              <button
                className="bg-[#FFFA64] px-4 py-2 rounded-2xl hover:bg-black hover:text-[#FFFA64] hover:cursor-pointer flex items-center gap-4"
                onClick={() => setModal(true)}
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                type="button"
              >
                Agregar <RiUserAddLine />
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, dependents: [] })}
                className="bg-red-500 px-4 py-2 rounded-2xl hover:bg-red-600 hover:cursor-pointer text-white"
              >
                Limpiar dependientes
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => handleChangeSection("Información de oficio")}
            className="prev-button"
          >
            <div className="text-xs">Informacion de :</div>
            <div className="font-bold">Oficio</div>
          </button>
          <button
            type="button"
            onClick={() => handleChangeSection("Información de fundación")}
            className="next-button"
          >
            <div className="text-xs">Informacion de:</div>
            <div className="font-bold">Fundación</div>
          </button>
        </div>
      </article>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Transparent overlay to keep the form background visible */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setModal(false)} // Close the modal when clicking outside
          ></div>

          {/* Modal content */}
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
            className="relative bg-[#ffffff] border-4 border-amber-200 p-6 rounded-lg w-1/3"
          >
            <h5 className="font-bold text-lg mb-4">Personas que cuida</h5>
            <div className="flex flex-col gap-4">
              <label className="font-semibold" htmlFor="relationship">
                Parentesco
              </label>
              <select
                id="relationship"
                className="border border-gray-300 rounded p-2"
                onChange={handleDependent}
                value={dependent}
              >
                <option value="">Seleccionar...</option>
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Hijo">Hijo</option>
                <option value="Hija">Hija</option>
                <option value="Esposo/a">Esposo/a</option>
                <option value="Nieto/a">Nieto/a</option>
                <option value="Sobrino/a">Sobrino/a</option>
                <option value="Hermano/a">Hermano/a</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
                onClick={() => {
                  handleAddDependent(dependent, setDependent);
                  setModal(false); // Close the modal
                }}
              >
                Agregar
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
                onClick={() => {
                  setModal(false); // Close the modal
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const FoundationSection = ({
  form,
  setForm,
  handleChange,
  handleChangeSection,
  startingDate,
  setStartingDate,
}) => {
  const [referralControl, setReferralControl] = useState(false);

  return (
    <article className="flex w-full flex-col px-4 py-8 h-full">
      <h4 className="text-center font-bold text-2xl">
        Información de Fundación
      </h4>
      <div className="flex flex-col w-full p-4 items-center h-full justify-center gap-14">
        <div className=" gap-10 w-1/2 justify-center flex ">
          <span className="w-full">
            <BasicSelect
              label={"Programa"}
              options={programs}
              value={form.affiliation}
              setValue={(value) => setForm({ ...form, affiliation: value })}
            />
          </span>
          <span className="w-full">
            <DatePicker
              label={"Fecha de inicio"}
              date={startingDate}
              setDate={setStartingDate}
            />
          </span>
        </div>
        <div
          className={`flex flex-col  justify-center transition-all ease-in-out duration-500`}
        >
          <div className="flex gap-6 w-full items-center">
            <p className="font-bold">Como se entero de la fundacion?</p>
            <OptionCheckBox
              label={"Referido Institucional"}
              selected={form.referral_source === "Referido Institucional"}
              onSelect={() => {
                setForm({ ...form, referral_source: "Referido Institucional" });
                setReferralControl(false);
              }}
            />
            <OptionCheckBox
              label={"Redes Sociales"}
              selected={form.referral_source === "Redes Sociales"}
              onSelect={() => {
                setForm({ ...form, referral_source: "Redes Sociales" });
                setReferralControl(false);
              }}
            />
            <OptionCheckBox
              label={"Usuario Fundacion"}
              selected={referralControl}
              onSelect={() => {
                setForm({ ...form, referral_source: "" });
                setReferralControl(true);
              }}
            />
          </div>
          <div
            className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
              referralControl
                ? "max-h-40 opacity-100 mt-4"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <input
              id="referral_source"
              value={form.referral_source}
              onChange={handleChange}
              type="text"
              className={`${inpStyle} w-full`}
              placeholder="Indicar nombre de usuario"
              disabled={!referralControl}
              aria-hidden={!referralControl}
            />
          </div>
        </div>
        <div className="flex gap-10 ">
          <div className="flex flex-col w-1/2">
            <h5 className="font-bold">Estado del Beneficiario</h5>
            <p className="text-xs text-gray-500">
              *Si el beneficiario esta inactivo se debe Especificar el motivo
            </p>
            <CheckboxValue
              label={"Beneficiario Activo"}
              checked={form.active}
              setChecked={() => setForm({ ...form, active: !form.active })}
            />
            <div
              className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
                !form.active
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <input
                id="reason"
                value={form.reason}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Indique motivo de inactividad"
                disabled={form.active}
                aria-hidden={form.active}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 justify-center gap-1">
            <h5 className="font-bold">Transporte</h5>
            <p>Posee dificultad para trasladarse a la sede?</p>
            <div className="w-1/2 flex">
              <OptionCheckBox
                label={"Si"}
                selected={form.transportation_difficulty}
                onSelect={() =>
                  setForm({ ...form, transportation_difficulty: true })
                }
              />
              <OptionCheckBox
                label={"No"}
                selected={!form.transportation_difficulty}
                onSelect={() =>
                  setForm({ ...form, transportation_difficulty: false })
                }
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
                form.transportation_difficulty
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <p>
                Algun familiar o conocido estaria dispuesto a trasladarlo a la
                fundacion?
              </p>
              <OptionCheckBox
                label={"Si"}
                selected={form.transportation_difficulty_person}
                onSelect={() =>
                  setForm({ ...form, transportation_difficulty_person: true })
                }
              />
              <OptionCheckBox
                label={"No"}
                selected={!form.transportation_difficulty_person}
                onSelect={() =>
                  setForm({ ...form, transportation_difficulty_person: false })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={() => handleChangeSection("Información familiar")}
          className="prev-button"
        >
          <div className="text-xs">Informacion :</div>
          <div className="font-bold">Familiar</div>
        </button>
        <button
          type="button"
          onClick={() => handleChangeSection("Registrar Beneficiario")}
          className="next-button"
        >
          <div className="text-xs">Registro de :</div>
          <div className="font-bold">Beneficiario</div>
        </button>
      </div>
    </article>
  );
};
