import { BsUpload } from "react-icons/bs";
import DatePicker from "../DatePicker";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";

import {
  inputStyle,
  handleDuiChange,
  handleNumbers,
  handlePhoneChange,
} from "../../tools/tools";
const inpStyle = inputStyle();
const spanStyle = `flex flex-col gap-1`;

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
      <article className="flex w-full flex-col px-4 py-8">
        <div className="flex w-full">
          <div className="p-2 flex flex-col items-center justify-center gap-4  w-1/4 ">
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
