import { useEffect, useState } from "react";
import {
  handlePhoneChange,
  inputStyle,
  handleNumbers,
} from "../../tools/tools";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";
const spanStyle = `flex flex-col gap-1`;
import OptionCheckBox from "../YesNoExclusive";
const inpStyle = inputStyle();
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
  "",
];
export const ContactModify = ({ form, setForm }) => {
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
      </article>
    </>
  );
};

export const HouseModify = ({ form, setForm }) => {
  const handleChange = (e) => {
    const field = e.target.id;
    let value;
    if (
      field === "address" ||
      field === "illness" ||
      field === "medicines" ||
      field === "discapacities" ||
      field === "medical_service"
    ) {
      value = e.target.value;
    } else {
      value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    setForm({ ...form, [field]: value });
  };
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
                value={form.people_in_house.quantity}
                onChange={(e) => {
                  setForm({
                    ...form,
                    people_in_house: {
                      ...form.people_in_house,
                      quantity: e.target.value,
                    },
                  });
                }}
                id="people_in_house_quantity"
                type="number"
                className={inpStyle}
              />
            </span>
            <span className={`${spanStyle} w-1/3`}>
              <BasicSelect
                label={"Relacion con personas que vive"}
                options={relationships}
                value={form.people_in_house.relationship}
                setValue={(value) =>
                  setForm({
                    ...form,
                    people_in_house: {
                      ...form.people_in_house,
                      relationship: value,
                    },
                  })
                }
              />
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export const MedicalModify = ({ form, setForm }) => {
  const handleChange = (e) => {
    const field = e.target.id;
    let value;
    if (
      field === "address" ||
      field === "illness" ||
      field === "medicines" ||
      field === "discapacities" ||
      field === "medical_service"
    ) {
      value = e.target.value;
    } else {
      value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    setForm({ ...form, [field]: value });
  };
  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">Informacion Medica</h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center">
          <div className="w-1/2">
            <span className={`flex gap-6 w-full items-center`}>
              <p className="font-semibold">Enfermedades</p>

              <input
                id="illness"
                value={form.illness}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar enfermedad(es)"
              />
            </span>
          </div>
          <div className="w-1/2">
            <span className={`flex gap-6 w-full items-center`}>
              <p className="font-semibold">Medicamentos</p>

              <input
                id="medicines"
                value={form.medicines}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar medicamento(s)"
              />
            </span>
          </div>
          <div className="w-1/2">
            <span className={`flex gap-6 w-full items-center`}>
              <p className="font-semibold">Discapacidades</p>

              <input
                id="discapacities"
                value={form.discapacities}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar discapacidad(s)"
              />
            </span>
          </div>
          <div className="w-1/2">
            <span className={`flex gap-6 w-full items-center`}>
              <p className="font-semibold">Servicio Medico</p>

              <input
                id="medical_service"
                value={form.medical_service}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar servicio médico(s) o seguro(s) médico(s)"
              />
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export const WorkModify = ({ form, setForm }) => {
  const handleChange = (e) => {
    const field = e.target.id;
    let value;
    if (
      field === "address" ||
      field === "illness" ||
      field === "medicines" ||
      field === "discapacities" ||
      field === "medical_service"
    ) {
      value = e.target.value;
    } else {
      value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    setForm({ ...form, [field]: value });
  };
  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">
          Informacion de Oficio
        </h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center">
          <div>
            <span className={`flex gap-6 w-full items-center`}>
              <p>Ocupacion</p>

              <input
                id="occupation"
                value={form.occupation}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar ocupación"
              />
            </span>
          </div>
          <div
            className={`flex flex-col  justify-center transition-all ease-in-out duration-500`}
          >
            <div className="flex gap-6 w-full items-center">
              <p>Tipo de Ingreso</p>
              <input
                id="income_type"
                value={form.income_type}
                onChange={handleChange}
                type="text"
                className={`${inpStyle} w-full`}
                placeholder="Especificar ingreso economico"
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export const FamilyModify = ({ form, setForm }) => {
  const [dependentName, setDependentName] = useState("");
  const handleAddDependent = () => {
    if (dependentName !== "") {
      setForm((prev) => ({
        ...prev,
        dependents: [...(prev.dependents || []), dependentName],
      }));
      setDependentName("");
    }
  };
  const handleRemoveDependent = (index) => {
    setForm((prev) => ({
      ...prev,
      dependents: prev.dependents.filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      <article className="flex h-full w-full flex-col px-4 py-8">
        <h4 className="text-center font-bold text-2xl">Informacion Familiar</h4>
        <div className="flex flex-col w-full gap-12 p-4 items-center h-full justify-center transition-all ease-in-out duration-500">
          <div className="flex flex-col w-1/2 justify-center items-center transition-all ease-in-out duration-500">
            <span className="flex items-center gap-4 w-full justify-center">
              <p>Persona de la que depende</p>
            </span>

            <div>
              <div className="flex gap-6">
                <span className="flex flex-col justify-center items-center gap-2">
                  <input
                    id="personIC_name"
                    type="text"
                    className={`${inpStyle} flex-1`}
                    placeholder=""
                    value={form.person_in_charge.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        person_in_charge: {
                          ...form.person_in_charge,
                          name: e.target.value,
                        },
                      })
                    }
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
                    value={form.person_in_charge.dui}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        person_in_charge: {
                          ...form.person_in_charge,
                          dui: e.target.value,
                        },
                      })
                    }
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
                    value={form.person_in_charge.phone_number}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        person_in_charge: {
                          ...form.person_in_charge,
                          phone_number: e.target.value,
                        },
                      })
                    }
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
        </div>

        <div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
          <h5 className="font-bold">Personas a las que cuida</h5>
          <div className="flex gap-2">
            {form.dependents.length ? (
              form.dependents.map((dep, index) => {
                return (
                  <div key={index} className="relative min-w-24">
                    <div
                      type="button"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                      className="rounded-2xl bg-amber-300 text-amber-50 p-2 flex justify-center items-center"
                    >
                      {dep}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDependent(index)}
                      className="cursor-pointer absolute top-0 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                );
              })
            ) : (
              <h5>No hay dependientes agregados</h5>
            )}
          </div>

          <BasicSelect
            options={[
              "Padre",
              "Madre",
              "Hijo",
              "Hija",
              "Esposo/a",
              "Nieto/a",
              "Sobrino/a",
              "Hermano/a",
              "Otro",
            ]}
            value={dependentName}
            setValue={setDependentName}
            label={"Parentesco"}
          />

          <button
            type="button"
            onClick={handleAddDependent}
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            className="bg-amber-200 cursor-pointer px-4 py-2 rounded-2xl hover:bg-amber-50 transition ease-in-out 0.5s"
          >
            {" "}
            Agregar
          </button>
        </div>
      </article>
    </>
  );
};

export const FoundationModify = ({ form, setForm }) => {
  return (
    <>
      <article className="flex w-full flex-col px-4 py-8 h-full">
        <h4 className="text-center font-bold text-2xl">
          Información de Fundación
        </h4>
        <div className="flex flex-col w-full p-4 items-center h-full justify-center gap-14">
          <div className="flex flex-col w-1/2 justify-center items-center gap-1">
            <h5 className="font-bold">Transporte</h5>
            <p>Posee dificultad para trasladarse a la sede?</p>
            <div className="w-1/2 flex justify-center">
              <OptionCheckBox
                label={"Si"}
                selected={form.transportation.difficulty}
                onSelect={() =>
                  setForm({
                    ...form,
                    transportation: {
                      ...form.transportation,
                      difficulty: true,
                    },
                  })
                }
              />
              <OptionCheckBox
                label={"No"}
                selected={!form.transportation.difficulty}
                onSelect={() =>
                  setForm({
                    ...form,
                    transportation: {
                      ...form.transportation,
                      difficulty: false,
                    },
                  })
                }
              />
            </div>
            <div
              className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
                form.transportation.difficulty
                  ? "max-h-40 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <p>
                Algun familiar o conocido estaria dispuesto a trasladarlo a la
                fundacion?
              </p>
              <div className="w-full flex justify-center ">
                <OptionCheckBox
                  label={"Si"}
                  selected={form.transportation.person_available}
                  onSelect={() =>
                    setForm({
                      ...form,
                      transportation: {
                        ...form.transportation,
                        person_available: true,
                      },
                    })
                  }
                />
                <OptionCheckBox
                  label={"No"}
                  selected={!form.transportation_difficulty_person}
                  onSelect={() =>
                    setForm({
                      ...form,
                      transportation: {
                        ...form.transportation,
                        person_available: false,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
