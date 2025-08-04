import { useEffect, useState, useRef } from "react";

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
import { useNavigate } from "react-router-dom";

// Day.js plugins
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { addBeneficiary } from "../../services/api.services";
import { toast } from "react-toastify";
import {
  sleep,
  inputStyle,
  handleDuiChange,
  handleNumbers,
  handlePhoneChange,
} from "../../tools/tools";

import { useQueryClient } from "@tanstack/react-query";
import {
  GeneralSection,
  ContactSection,
  HouseSection,
  MedicalSection,
  WorkSection,
  FamilySection,
  FoundationSection,
  RegisterSection,
} from "./BenAddComponents";

const BenForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Styles
  const inpStyle = inputStyle();
  const spanStyle = `
    flex flex-col gap-1
    `;
  const sections = [
    "Información general",
    "Información de contacto",
    "Información de vivienda",
    "Información médica",
    "Información de oficio",
    "Información familiar",
    "Información de fundación",
    "Registrar Beneficiario",
  ];

  // State Variables
  const [form, setForm] = useState({
    name: "",
    dui: "",
    birth_date: "",
    starting_date: "",
    phone_number: "",
    home_phone: "",
    address: "",
    birth_place: "",
    occupation: "",
    income_type: "",
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
    house_condition: "",
    shirt_size: "",
    shoe_size: "",
    discapacities: "",
    affiliation: "Fundacion Primavera",
    dependents: [],
    active: true,
    reason: "",
    gender: "",
    write_and_read: false,
    education_level: "",
    people_in_house_quantity: "",
    people_in_house_relationship: "",
    department: "",
    municipality: "",
    zone: "",
    reference_address: "",
    referral_source: "",
    transportation_difficulty: false,
    transportation_difficulty_person: false,
    agreement: true,
  });
  const [picture, setPicture] = useState(profileIcon);
  const [image, setImage] = useState(null);
  const [birthDate, setBirthDate] = useState(dayjs().utc());
  const [startingDate, setStartingDate] = useState(dayjs().utc());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [medicalFilter, setMedicalFilter] = useState({
    illness: null,
    medicines: null,
    discapacities: null,
    medical_service: null,
  });
  const [workFilter, setWorkFilter] = useState({
    occupation: null,
    income: false,
  });
  const [responsible, setResponsible] = useState("");
  const [referralControl, setReferralControl] = useState(false);

  const newActive = useRef(false);
  const newInactive = useRef(false);

  // Functions

  const handleChangeSection = (section) => {
    setActiveSection(section);
  };

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
  const handleAddDependent = (dependent, setDependent) => {
    if (dependent) {
      setForm({ ...form, dependents: [...form.dependents, dependent] });
      setDependent(""); // Limpiar el select después de agregar
    }
  };

  // Function to handle the change in other input fields
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
      const formData = new FormData();
      // Append the picture file to the FormData object

      for (const key in updatedForm) {
        const value = updatedForm[key];
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
      formData.append("photo", image);
      if (form.active) newActive.current = true;
      if (!form.active) newInactive.current = true;

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
          home_phone: "",
          address: "",
          birth_place: "",
          occupation: "",
          income_type: "",
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
          house_condition: "",
          shirt_size: "",
          shoe_size: "",
          discapacities: "",
          affiliation: "Fundacion Primavera",
          dependents: [],
          active: true,
          reason: "",
          gender: "",
          write_and_read: false,
          education_level: "",
          people_in_house_quantity: "",
          people_in_house_relationship: "",
          department: "",
          municipality: "",
          zone: "",
          reference_address: "",
          referral_source: "",
          transportation_difficulty: false,
          transportation_difficulty_person: false,
          agreement: true,
        });
        setPicture(profileIcon); // Reset the picture to the default icon
        setBirthDate(dayjs().utc()); // Reset the birth date to the current date
        setStartingDate(dayjs().utc()); // Reset the starting date to the current date
        setActiveSection(sections[0]); // Reset the active section to the first one
      } else {
        toast.update(toastId, {
          render: response.data,
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

  const handleNavigate = async () => {
    if (newActive.current && newInactive.current) {
      await queryClient.refetchQueries({
        queryKey: ["beneficiaries", "active"],
      });
      await queryClient.refetchQueries({
        queryKey: ["beneficiaries", "inactive"],
      });
    } else if (newActive.current) {
      await queryClient.refetchQueries({
        queryKey: ["beneficiaries", "active"],
      });
    } else if (newInactive.current) {
      await queryClient.refetchQueries({
        queryKey: ["beneficiaries", "inactive"],
      });
    }

    // Resetear los flags si quieres que no afecten navegación futura
    newActive.current = false;
    newInactive.current = false;

    navigate("/GestionarBeneficiarios");
  };

  return (
    <>
      <section className="flex-col flex items-center justify-center  gap-7 ">
        <article className=" w-1/2  font-bold text-3xl p-10 flex justify-center items-center gap-5">
          <HiOutlinePencilAlt size={50} color="#4B5563" />
          <h2 className=" text-5xl text-gray-500  ">Nuevo Beneficiario...</h2>
        </article>
        <div className="flex gap-4 items-center justify-end w-full px-4">
          <button
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  "
            onClick={handleNavigate}
          >
            {" "}
            Beneficiarios <BsFillPeopleFill size={30} />
          </button>
        </div>
        <section className="flex w-full h-full">
          <article className="flex h-full w-1/5 max-w-3xl bg-white/75 backdrop-blur-sm  shadow-xl overflow-hidden">
            {/* Sidebar */}
            <div className="p-6 relative flex flex-col gap-5">
              <h1 className=" font-semibold mb-1 text-3xl">
                Formulario de Registro
              </h1>
              <div className="relative">
                {/* línea vertical gris */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded"></div>
                <ul className="flex flex-col gap-5 pl-4 text-sm">
                  {sections.map((section) => (
                    <li
                      key={section}
                      onClick={() => handleChangeSection(section)}
                      className={`relative cursor-pointer transition-colors duration-150 py-1.5 text-lg ${
                        activeSection === section
                          ? "text-black font-semibold"
                          : "text-gray-400"
                      }`}
                      aria-current={
                        activeSection === section ? "page" : undefined
                      }
                    >
                      {/* indicador morado */}
                      {activeSection === section && (
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#d8d512] rounded-r-md"></span>
                      )}
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          <form className="w-full flex-1 bg-white/75 backdrop-blur-sm p-6 shadow-xl min-h-[700px]">
            {activeSection === "Información general" && (
              <GeneralSection
                picture={picture}
                handlePictureChange={handlePictureChange}
                form={form}
                handleChange={handleChange}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
              />
            )}
            {activeSection === "Información de contacto" && (
              <ContactSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
              />
            )}
            {activeSection === "Información de vivienda" && (
              <HouseSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
                handleChange={handleChange}
              />
            )}
            {activeSection === "Información médica" && (
              <MedicalSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
                handleChange={handleChange}
                medicalFilter={medicalFilter}
                setMedicalFilter={setMedicalFilter}
              />
            )}
            {activeSection === "Información de oficio" && (
              <WorkSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
                handleChange={handleChange}
                workFilter={workFilter}
                setWorkFilter={setWorkFilter}
              />
            )}
            {activeSection === "Información familiar" && (
              <FamilySection
                form={form}
                handleChangeSection={handleChangeSection}
                handleChange={handleChange}
                handleAddDependent={handleAddDependent}
                setForm={setForm}
                responsible={responsible}
                setResponsible={setResponsible}
              />
            )}
            {activeSection === "Información de fundación" && (
              <FoundationSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
                handleChange={handleChange}
                setStartingDate={setStartingDate}
                startingDate={startingDate}
                referralControl={referralControl}
                setReferralControl={setReferralControl}
              />
            )}
            {activeSection === "Registrar Beneficiario" && (
              <RegisterSection
                form={form}
                setForm={setForm}
                handleChangeSection={handleChangeSection}
                handleSubmit={handleSubmit}
              />
            )}
          </form>
        </section>
      </section>
    </>
  );
};
export default BenForm;
