import { useState } from "react";
import { sanitizeDate } from "../../tools/tools";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";
import { BsPencilSquare } from "react-icons/bs";
import { updateBeneficiary } from "../../services/api.services";
import { sleep,handleNumbers,handlePhoneChange } from "../../tools/tools";
import { toast } from "react-toastify";


const Modify = ({ ben, setShowModify,setBenSelected }) => {
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
  const [whatsapp, setWhatsapp] = useState(ben.whatsapp);
  const [phone_company, setPhoneCompany] = useState(ben.phone_company);
  const [income, setIncome] = useState(ben.income_level);
  const [pension, setPension] = useState(ben.pension);
  const [house_type, setHouseType] = useState(ben.house_type);
  const [isClosing, setIsClosing] = useState(false);
  const [dependents, setDependents] = useState(ben.dependents[0].split(",") );
  const [dependentName, setDependentName] = useState("");
  const [personIC, setPersonIc] = useState({
    name: ben.person_in_charge.name,
    phone_number: ben.person_in_charge.phone_number,
    dui: ben.person_in_charge.dui,
  });
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModify(false);
      setIsClosing(false);
      
    }, 500);
  };

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setModifiedBen((prev) => ({ ...prev, [field]: value }));
  };

  
  const handlePhoneChangePersonIC = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
    const formattedValue =
      value.length > 4
        ? value.slice(0, 4) + "-" + value.slice(4, 8) // Agrega un '-' después de los primeros 4 dígitos
        : value;

    setPersonIc((prev) => ({ ...prev, phone_number: formattedValue }));
  };

  const handleDUIChangePersonIC = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
    const formattedValue =
      value.length > 8
        ? value.slice(0, 8) + "-" + value.slice(8, 9) // Agrega un '-' después de los primeros 8 dígitos
        : value;

    setPersonIc((prev) => ({ ...prev, dui: formattedValue }));
  };

  const handleAddDependent = () => {
    if (dependentName !== "") {
      setDependents((prev) => [...prev, dependentName]);
      setDependentName("");
    }
  };
  const handleRemoveDependent = (index) => {
    setDependents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const form = {
        name: modifiedBen.name,
        dui: modifiedBen.dui,
        birth_date: modifiedBen.birth_date,
        starting_date: modifiedBen.starting_date,
        phone_number: modifiedBen.phone_number,
        adress: modifiedBen.adress,
        birth_place: modifiedBen.birth_place,
        work_occup: modifiedBen.work_occup,
        income_level: income,
        pension: pension,
        weight: modifiedBen.weight,
        height: modifiedBen.height,
        phone_company: phone_company,
        whatsapp: whatsapp,
        illness: modifiedBen.illness,
        medicines: modifiedBen.medicines,
        blood_type: modifiedBen.blood_type,
        personIC_name: personIC.name,
        personIC_phone_number: personIC.phone_number,
        personIC_dui: personIC.dui,
        medical_service: modifiedBen.medical_service,
        house_type: house_type,
        shirt_size: modifiedBen.shirt_size,
        shoe_size: modifiedBen.shoe_size,
        discapacities: modifiedBen.discapacities,
        affiliation: modifiedBen.affiliation,
        dependents: dependents.join(","),
        active:true,
        reason: " ",
        gender: modifiedBen.gender,
    }
    const toastId = toast.loading("Actualizando Beneficiario...");
    try {
        const response = await updateBeneficiary(modifiedBen._id, form);
        await sleep(800);
        
        if (response.status === 200) {
          toast.update(toastId, {
            render: "Beneficiario actualizado!",
            type: "success",
            isLoading: false,
            autoClose: 3000, 
          });
          await sleep(800);
          setBenSelected(response.data.beneficiary);
          handleClose();
          window.location.reload();
            
        }
    } catch (error) {
        toast.update(toastId, {
            render: "Hubo un problema!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
        })
    }
    

      
  }

  return (
    <>
      <form onSubmit={handleSubmit}
        className={` ${
          isClosing ? "slide-out-left" : "slide-in-left"
        } flex flex-col gap-5 justify-center items-center w-full h-full p-10 bg-white rounded-lg shadow-lg`}
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
          maxHeight: "90vh",
        }}
      >
        <h3 className="font-bold">Modificar Beneficiario</h3>
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
            Género: <span className="font-semibold">{modifiedBen.gender}</span>
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
        <div
          className="flex flex-col gap-5 overflow-y-auto w-full"
          style={{ maxHeight: "calc(90vh - 150px)" }}
        >
          <div className="flex gap-5 justify-center place-items-stretch flex-wrap">
            <div className="flex flex-col gap-2 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Información de Contacto</h5>
              <label htmlFor="phone_number" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Telefono</span>
                <input
                  type="text"
                  id="phone_number"
                  className={inputStyle}
                  value={modifiedBen.phone_number}
                  onChange={(e)=>{handlePhoneChange(e,setModifiedBen,modifiedBen)}}
                />
              </label>
              <label htmlFor="affiliation" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Afiliación</span>
                <input
                  type="text"
                  id="affiliation"
                  className={inputStyle}
                  value={modifiedBen.affiliation}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="adress" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Dirección</span>
                <input
                  type="text"
                  id="adress"
                  className={inputStyle}
                  value={modifiedBen.adress}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="birth_place" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                  Lugar de Nacimiento
                </span>
                <input
                  type="text"
                  id="birth_place"
                  className={inputStyle}
                  value={modifiedBen.birth_place}
                  onChange={handleChange}
                />
              </label>
              <CheckboxValue
                checked={whatsapp}
                setChecked={setWhatsapp}
                label={"Whatsapp"}
              />
              <BasicSelect
                label={"Compañía Telefonica"}
                value={phone_company}
                setValue={setPhoneCompany}
                options={["Movistar", "Tigo", "Claro", "Digicel"]}
              />
            </div>

            <div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Información Personal</h5>
              <label htmlFor="work_occup" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Ocupación</span>
                <input
                  type="text"
                  id="work_occup"
                  className={inputStyle}
                  value={modifiedBen.work_occup}
                  onChange={handleChange}
                />
              </label>
              
              <BasicSelect
                label={"Nivel de Ingresos"}
                value={income}
                setValue={setIncome}
                options={["Sin Ingresos", "Bajos", "Medio", "Altos"]}
              />
              <CheckboxValue
                checked={pension}
                setChecked={setPension}
                label={"Pension"}
              />
              <BasicSelect
                label={"Tipo de Casa"}
                value={house_type}
                setValue={setHouseType}
                options={["Meson", "Propia", "Dominio Ajeno", "Rentada"]}
              />
            </div>
            <div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Información Médica</h5>
              <label htmlFor="weight" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Peso</span>
                <input
                  placeholder="lb"
                  type="number"
                  id="weight"
                  className={inputStyle}
                  value={modifiedBen.weight}
                  onChange={(e)=>{handleNumbers(e,setModifiedBen,modifiedBen)}}
                />
              </label>
              <label htmlFor="height" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Altura</span>
                <input
                  placeholder="cm"
                  type="number"
                  id="height"
                  className={inputStyle}
                  value={modifiedBen.height}
                  onChange={(e)=>{handleNumbers(e,setModifiedBen,modifiedBen)}}
                />
              </label>
              <label htmlFor="illness" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Enfermedades</span>
                <input
                 
                  type="text"
                  id="illness"
                  className={inputStyle}
                  value={modifiedBen.illness}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="medicines" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Medicinas</span>
                <input
                  
                  type="text"
                  id="medicines"
                  className={inputStyle}
                  value={modifiedBen.medicines}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="medical_service" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Servicio Médico</span>
                <input
                  
                  type="text"
                  id="medical_service"
                  className={inputStyle}
                  value={modifiedBen.medical_service}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="discapacities" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Discapacidades</span>
                <input
                  
                  type="text"
                  id="discapacities"
                  className={inputStyle}
                  value={modifiedBen.discapacities}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="flex gap-5 justify-center place-items-stretch flex-wrap">
            <div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Persona Responsable</h5>
              <label htmlFor="personIC_name" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Nombre</span>
                <input
                  type="text"
                  id="personIC_name"
                  className={inputStyle}
                  value={personIC.name}
                  onChange={(e) =>
                    setPersonIc((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>
              <label htmlFor="personIC_dui" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">DUI</span>
                <input
                  type="text"
                  id="personIC_dui"
                  className={inputStyle}
                  value={personIC.dui}
                  onChange={handleDUIChangePersonIC}
                />
              </label>
              <label htmlFor="personIC_phone" className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Telefono</span>
                <input
                  type="text"
                  id="personIC_phone"
                  className={inputStyle}
                  value={personIC.phone_number}
                  onChange={handlePhoneChangePersonIC}
                />
              </label>
            </div>

            <div className="flex flex-col gap-6 justify-center items-center h-max  flex-1">
              <h5 className="font-bold">Personas a las que cuida</h5>
              <div className="flex gap-2">
                {dependents.length ? (
                  dependents.map((dep, index) => {
                    return (
                      <div
                        key={index}
                        className="relative min-w-24"
                        
                      >
                        {/* Botón del dependiente */}
                        <div
                          type="button"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        }}
                          className="rounded-2xl bg-amber-300 text-amber-50 p-2 flex justify-center items-center"
                        >
                          {dep}
                        </div>

                        {/* Botón para eliminar */}
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
                style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                className="bg-amber-200 cursor-pointer px-4 py-2 rounded-2xl hover:bg-amber-50 transition ease-in-out 0.5s"
              >
                {" "}
                Agregar
              </button>
            </div>
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
          style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}
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
