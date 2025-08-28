import { useState } from "react";
import { sanitizeDate } from "../../tools/tools";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";
import { BsPencilSquare } from "react-icons/bs";
import { updateBeneficiary } from "../../services/api.services";
import { sleep, handleNumbers, handlePhoneChange } from "../../tools/tools";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ContactModify,
  HouseModify,
  MedicalModify,
  WorkModify,
  FamilyModify,
  FoundationModify,
} from "./ModifyComponents";

const Modify = ({ ben, setShowModify, setBenSelected, page }) => {
  const inputStyle = `
    border-b border-black 
    bg-transparent 
    focus:bg-gray-200
    focus:border-0
    focus:rounded-2xl
    outline-none 
    p-2

`;
  const [modifiedBen, setModifiedBen] = useState(ben);
  const [isClosing, setIsClosing] = useState(false);

  const [section, setSection] = useState("Contacto");

  const queryClient = useQueryClient();

  const { mutateAsync: mutateBen, isLoading: saving } = useMutation({
    mutationFn: ({ id, form }) => updateBeneficiary(id, form),
    onSuccess: ({ data }) => {
      const ben = data.beneficiary;
      const statusKey = ben.active?.value ? "active" : "inactive";
      const key = ["beneficiaries", statusKey, page];

      setBenSelected?.(ben);

      queryClient.invalidateQueries({ queryKey: key, exact: true });

      toast.success("Beneficiario actualizado!");
      handleClose();
    },
    onError: () => {
      toast.error("Hubo un problema!");
    },
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModify(false);
      setIsClosing(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Actualizando Beneficiario...");
    try {
      await mutateBen({ id: modifiedBen._id, form: modifiedBen });
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Hubo un problema!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${
          isClosing ? "slide-out-left" : "slide-in-left"
        } flex flex-col w-full h-[90vh] bg-white rounded-lg shadow-lg`}
        style={{ boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px" }}
      >
        <div className="flex flex-col items-center gap-2 px-10 py-4 border-b">
          <h3 className="font-bold p-4 text-center">Modificar Beneficiario</h3>
          <div className="w-full flex justify-center items-center gap-6 flex-wrap">
            <h4>
              Beneficiario:{" "}
              <span className="font-semibold">{modifiedBen.name}</span>
            </h4>
            <h4>
              DUI: <span className="font-semibold">{modifiedBen.dui}</span>
            </h4>
            <h4>
              Edad: <span className="font-semibold">{modifiedBen.age}</span>
            </h4>
            <h4>
              Género:{" "}
              <span className="font-semibold">{modifiedBen.gender}</span>
            </h4>
            <h4>
              Fecha de Nacimiento:{" "}
              <span className="font-semibold">
                {sanitizeDate(modifiedBen.birth_date)}
              </span>
            </h4>
            <h4>
              Fecha de Inicio:{" "}
              <span className="font-semibold">
                {sanitizeDate(modifiedBen.starting_date)}
              </span>
            </h4>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-10 py-4 space-y-6">
          <div className="flex w-full justify-center gap-4 ">
            <button
              type="button"
              className={`${
                section === "Contacto" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Contacto");
              }}
            >
              Contacto
            </button>
            <button
              type="button"
              className={`${
                section === "Vivienda" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Vivienda");
              }}
            >
              Vivienda
            </button>
            <button
              type="button"
              className={`${
                section === "Medica" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Medica");
              }}
            >
              Medica
            </button>
            <button
              type="button"
              className={`${
                section === "Oficio" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Oficio");
              }}
            >
              Oficio
            </button>
            <button
              type="button"
              className={`${
                section === "Familiar" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Familiar");
              }}
            >
              Familiar
            </button>

            <button
              type="button"
              className={`${
                section === "Fundacion" ? "mod-sec-act" : "mod-sec-ina"
              }`}
              onClick={() => {
                setSection("Fundacion");
              }}
            >
              Fundacion
            </button>
          </div>
          <div className="flex flex-wrap gap-5">
            {section === "Contacto" ? (
              <ContactModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
            {section === "Vivienda" ? (
              <HouseModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
            {section === "Medica" ? (
              <MedicalModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
            {section === "Oficio" ? (
              <WorkModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
            {section === "Familiar" ? (
              <FamilyModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
            {section === "Fundacion" ? (
              <FoundationModify form={modifiedBen} setForm={setModifiedBen} />
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Botones SIEMPRE visibles */}
        <div className="flex-shrink-0 bg-white px-10 py-4 border-t flex justify-between gap-8">
          <button
            type="submit"
            className="p-5 rounded-2xl w-40 text-white relative overflow-hidden cursor-pointer group"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {/* Texto que desaparece al hacer hover */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full font-bold">
              Modificar
            </span>

            {/* Ícono que aparece al hacer hover */}
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

/*<div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Personas a las que cuida</h5>
              <div className="flex gap-2">
                {dependents.length ? (
                  dependents.map((dep, index) => {
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

            */
