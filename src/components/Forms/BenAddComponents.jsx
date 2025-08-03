import { useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import DatePicker from "../DatePicker";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";
import OptionCheckBox from "../YesNoExclusive";

import {
  inputStyle,
  handleDuiChange,
  handleNumbers,
  handlePhoneChange,
} from "../../tools/tools";
import { Input } from "postcss";
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

export const ContactSection = ({ form, setForm, handleChangeSection }) => {
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
