import { useState } from "react";

// Components Import
import DatePicker from "../DatePicker";
import CheckboxValue from "../Checkbox";
import BasicSelect from "../Select";

// Icons Import
import { FiSave } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsUpload } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";

// Default Profile Icon
import profileIcon from "../../assets/icons/ProfileIcon.jpg";
import { Link } from "react-router-dom";

// Day.js plugins
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { addBeneficiary } from "../../services/api.services";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { sleep, inputStyle,handleDuiChange,handleNumbers,handlePhoneChange } from "../../tools/tools";


const BenForm = () => {
  // Styles
  const inpStyle = inputStyle();
  const spanStyle = `
    flex flex-col gap-1
    `;

  // State Variables
  const [form, setForm] = useState({
    name: "",
    dui: "",
    birth_date: "",
    starting_date: "",
    phone_number: "",
    adress: "",
    birth_place: "",
    work_occup: "",
    income_level: "",
    pension: false,
    weight: "",
    height: "",
    phone_company: "",
    whatsapp: false,
    illness: "",
    medicines: "",
    blood_type: "",
    personIC_name: "",
    personIC_phone_number: "",
    personIC_dui: "",
    medical_service: "",
    house_type: "",
    shirt_size: "",
    shoe_size: "",
    discapacities: "",
    affiliation: "Fundacion Primavera",
    dependents: [],
    active: true,
    reason: "",
    gender: "",
  });
  const [picture, setPicture] = useState(profileIcon);
  const [image,setImage] = useState(null);
  const [birthDate, setBirthDate] = useState(dayjs().utc());
  const [startingDate, setStartingDate] = useState(dayjs().utc());
  const [dependent, setDependent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions
  // Function to handle the opening and closing of the modal
  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle the addition of a dependent
  const handleDependent = (e) => {
    setDependent(e.target.value);
  };

  // Function to handle the addition of a dependent to the form state
  const handleAddDependent = () => {
    if (dependent) {
      const updatedDependents = [...form.dependents, dependent]; // Add the new dependent to the array
      
      
      setForm({ ...form, dependents: updatedDependents }); // Update the form state
      setDependent([]); // Reset the dependent state
    } 
  };

 
  // Function to handle the change in other input fields
  const handleChange = (e) => {
    const field = e.target.id;
    let value;
    if(field==="adress"){
        value = e.target.value;
    }else{
        value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }
    
    
    setForm({ ...form, [field]: value }); 
  };

  // Function to handle the change in the file input field
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file in state
      const reader = new FileReader();
      reader.onload = (event) => {
        setPicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    
    const toastId = toast.loading("Agregando Beneficiario...");
    const starting_date = startingDate.format("MM-DD-YYYY");
    const birth_date = birthDate.format("MM-DD-YYYY");
        const updatedForm = {
            ...form,
            birth_date,
            starting_date,
        };
    try {
      
      await sleep(500);
      const formData = new FormData();
       // Append the picture file to the FormData object
      
      for(const key in updatedForm) {
        formData.append(key, updatedForm[key]); // Append all other form fields to the FormData object
      }
      formData.append("photo", image);

      
      

      const response = await addBeneficiary(formData);
      
      
      
      if (response.status === 201) {
        toast.update(toastId, {
          render: "Beneficiario agregado exitosamente!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });
        await sleep(800);
        setForm({
          name: "",
          dui: "",
          birth_date: "",
          starting_date: "",
          phone_number: "",
          adress: "",
          birth_place: "",
          work_occup: "",
          income_level: "",
          pension: false,
          weight: "",
          height: "",
          phone_company: "",
          whatsapp: false,
          illness: "",
          medicines: "",
          blood_type: "",
          personIC_name: "",
          personIC_phone_number: "",
          personIC_dui: "",
          medical_service: "",
          house_type: "",
          shirt_size: "",
          shoe_size: "",
          discapacities: "",
          affiliation: "Fundacion Primavera",
          dependents: [],
          active: true,
          reason: "",
          gender: "",
        });
        setPicture(profileIcon); // Reset the picture to the default icon
        setBirthDate(dayjs().utc()); // Reset the birth date to the current date
        setStartingDate(dayjs().utc()); // Reset the starting date to the current date

      }else {

        toast.update(toastId, {
          render: "Ya existe Beneficiario con ese DUI!",
          type: "error",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });
      }


    } catch (error) {
      
      
      toast.update(toastId, {
        render: error.response.data.error || "Error al agregar beneficiario",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <>
      <section className="flex-col flex items-center justify-center p-10 gap-10">
        <article className=" w-1/2  font-bold text-3xl  flex justify-center items-center gap-5">
          <HiOutlinePencilAlt size={50} />
          <h2 className=" text-6xl ms-madi-regular ">Nuevo Beneficiario...</h2>
        </article>
        <div className="flex gap-4 items-center justify-end w-full">
            <Link style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  " to={"/GestionarBeneficiarios"}> Beneficiarios <BsFillPeopleFill size={30}/></Link>
            
          </div>
        <article
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className="w-full bg-white  py-4 rounded-4xl  "
        >
          <form className="flex flex-col max-h-1/2 " onSubmit={handleSubmit}>
            <div className=" flex  gap-10 justify-center">
              {/* Upload Picture*/}
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

              <div className="flex flex-col w-1/3 gap-8 p-4">
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    className={inpStyle}
                    value={form.name}
                    onChange={handleChange}
                  />
                </span>
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="adress">
                    Direccion
                  </label>
                  <input
                    required
                    id="adress"
                    type="text"
                    className={inpStyle}
                    value={form.adress}
                    onChange={handleChange}
                  />
                </span>
                <span className={spanStyle}>
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
                  <p className="font-semibold">Fecha de Nacimiento</p>
                  <DatePicker date={birthDate} setDate={setBirthDate} />
                </span>
              </div>

              <div className="flex flex-col  gap-4 p-4">
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="dui">
                    DUI
                  </label>
                  <input
                    id="dui"
                    type="text"
                    className={inpStyle}
                    placeholder="12345678-9"
                    value={form.dui} // Bind the value to the form state
                    onChange={(e)=>{handleDuiChange(e,setForm,form)}} // Format the input dynamically
                    maxLength={10}
                    required // Limit the input length to 10 characters (8 digits + 1 dash)
                  />
                </span>
                <span className={spanStyle}>
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
                    onChange={(e)=>{ handleNumbers(e,setForm,form)}}
                  />
                </span>
                <span className={spanStyle}>
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
                    onChange={(e)=>{ handleNumbers(e,setForm,form)}}
                  />
                </span>
                <CheckboxValue
                  label={"Pensión"}
                  checked={form.pension}
                  setChecked={(value) => setForm({ ...form, pension: value })}
                />
              </div>

              <div className="flex flex-col gap-4 p-4 ">
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="phone_number">
                    Telefono
                  </label>
                  <input
                    value={form.phone_number}
                    onChange={(e)=>{handlePhoneChange(e,setForm,form)}}
                    id="phone_number"
                    type="text"
                    className={inpStyle}
                  />
                </span>
                <span className={`${spanStyle} gap-6`}>
                  <BasicSelect
                    label={"Compañía Telefónica"}
                    options={["Movistar", "Tigo", "Claro", "Digicel"]}
                    value={form.phone_company}
                    setValue={(value) =>
                      setForm({ ...form, phone_company: value })
                    }
                  />
                </span>
                <CheckboxValue
                  label={"Whatsapp"}
                  checked={form.whatsapp}
                  setChecked={(value) => setForm({ ...form, whatsapp: value })}
                />
                <span className={`${spanStyle} gap-6`}>
                  <BasicSelect
                    label={"Genero"}
                    options={["M", "F"]}
                    value={form.gender}
                    setValue={(value) => setForm({ ...form, gender: value })}
                  />
                </span>
              </div>
            </div>

            <div className=" w-full  gap-6 h-full flex p-4">
              <div className="flex flex-1 flex-col gap-4 p-4 ">
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="illness">
                    Enfermedades
                  </label>
                  <input
                    id="illness"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.illness}
                    onChange={handleChange}
                  />
                </span>
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="medicines">
                    Medicinas
                  </label>
                  <input
                    id="medicines"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.medicines}
                    onChange={handleChange}
                  />
                </span>
                <span className={`${spanStyle} gap-6`}>
                  <BasicSelect
                    label={"Tipo de Sangre"}
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                    value={form.blood_type}
                    setValue={(value) =>
                      setForm({ ...form, blood_type: value })
                    }
                  />
                </span>
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="medical_service">
                    Servicio Medico
                  </label>
                  <input
                    id="medical_service"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.medical_service}
                    onChange={handleChange}
                  />
                </span>
                <span className={spanStyle}>
                  <label className="font-semibold" htmlFor="discapacities">
                    Discapacidades
                  </label>
                  <input
                    id="discapacities"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.discapacities}
                    onChange={handleChange}
                  />
                </span>
                <span className="flex gap-6 items-center">
                  <p className="font-semibold">Fecha de Inicio</p>
                  <DatePicker date={startingDate} setDate={setStartingDate} />
                </span>
              </div>

              <div className="flex w-2xl  flex-wrap  gap-4 p-4">
                <span className={`flex justify-center items-center gap-6`}>
                  <p className="font-semibold">Talla de camisa</p>
                  <BasicSelect
                    label={"Talla"}
                    options={["XS", "S", "M", "L", "XL", "XXL"]}
                    value={form.shirt_size}
                    setValue={(value) =>
                      setForm({ ...form, shirt_size: value })
                    }
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
                <span className={`flex justify-center items-center gap-6`}>
                  <p className="font-semibold">Tipo de vivienda</p>
                  <BasicSelect
                    label={"Vivienda"}
                    options={["Meson", "Propia", "Dominio Ajeno", "Rentada"]}
                    value={form.house_type}
                    setValue={(value) =>
                      setForm({ ...form, house_type: value })
                    }
                  />
                </span>
                <span className={`flex justify-center items-center gap-6`}>
                  <label className="font-semibold" htmlFor="work_occup">
                    Ocupacion
                  </label>
                  <input
                    id="work_occup"
                    type="text"
                    className={inpStyle}
                    placeholder=""
                    value={form.work_occup}
                    onChange={handleChange}
                  />
                </span>
                <span className={`flex justify-center items-center gap-6`}>
                  <label className="font-semibold" htmlFor="affiliation">
                    Afiliacion
                  </label>
                  <input
                    id="affiliation"
                    type="text"
                    className={inpStyle}
                    placeholder="Fundacion Primavera"
                    value={form.affiliation}
                    onChange={handleChange}
                  />
                </span>
                <span className={`flex justify-center items-center gap-6`}>
                  <p className="font-semibold">Nivel de ingresos</p>
                  <BasicSelect
                    label={"Ingresos"}
                    options={["Sin Ingresos", "Bajos", "Medio", "Altos"]}
                    value={form.income_level}
                    setValue={(value) =>
                      setForm({ ...form, income_level: value })
                    }
                  />
                </span>
                <div className="flex flex-wrap gap-6 justify-center">
                  <span
                    className={`flex  w-full justify-start items-center gap-6`}
                  >
                    <label className="font-semibold" htmlFor="personIC_name">
                      Persona Responsable
                    </label>
                    <input
                      id="personIC_name"
                      type="text"
                      className={`${inpStyle} flex-1`}
                      placeholder=""
                      value={form.personIC_name}
                      onChange={handleChange}
                    />
                  </span>
                  <span
                    className={`flex flex-col justify-center items-center gap-2`}
                  >
                    <input
                      id="personIC_dui"
                      type="text"
                      className={inpStyle}
                      placeholder=""
                      value={form.personIC_dui}
                      onChange={(e)=>{handleDuiChange(e,setForm, form)}}
                    />
                    <label className="font-semibold" htmlFor="personIC_dui">
                      DUI
                    </label>
                  </span>
                  <span
                    className={`flex flex-col justify-center items-center gap-2`}
                  >
                    <input
                      id="personIC_phone_number"
                      type="text"
                      className={inpStyle}
                      placeholder=""
                      value={form.personIC_phone_number}
                      onChange={(e)=>{handlePhoneChange(e,setForm, form)}}

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
              <div className="  w-1/4 flex flex-col  items-center  gap-9">
                <h5 className="font-bold">Personas que Cuida</h5>
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
                <button
                  className="bg-[#FFFA64] px-4 py-2 rounded-2xl hover:bg-black hover:text-[#FFFA64] hover:cursor-pointer flex items-center gap-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal();
                  }}
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                  Agregar <RiUserAddLine />
                </button>
              </div>
            </div>

            <span className=" flex justify-center p-6">
              <button
                className="p-5 rounded-2xl w-40 text-amber-50 relative  overflow-hidden cursor-pointer group"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                type="submit"
              >
                {/* Text that transitions out */}
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full font-bold ">
                  Agregar
                </span>

                {/* Checkmark that transitions in */}
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform translate-x-full group-hover:translate-x-0">
                  <FiSave />
                </span>
              </button>
            </span>
          </form>
        </article>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Transparent overlay to keep the form background visible */}
            <div
              className="absolute inset-0 bg-transparent"
              onClick={handleCloseModal} // Close the modal when clicking outside
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
                  className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddDependent();
                    handleCloseModal(); // Close the modal
                  }}
                >
                  Agregar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseModal();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      
    </>
  );
};
export default BenForm;
