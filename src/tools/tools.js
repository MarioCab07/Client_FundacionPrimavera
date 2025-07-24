export const sleep = (ms)=> new Promise((resolve)=>setTimeout(resolve,ms));
/* 
SuperAdmin: 4 inventario - stats - voluntarios - usuarios
Admin: 3 inventario - stats - voluntarios
Gerente: 2 inventario - voluntarios
Colaborador y voluntario directo a inventario
*/ 
export const parserHeaderRole = (role) => {
    const baseOptions = ["Inventario"]; // Common options for all roles
    const sharedOptions = {
        stats: "Estadísticas",
        volunteers: "Voluntarios",
        users: "Usuarios",
    };

    const roleSpecificOptions = {
        SUPER_ADMIN: [sharedOptions.stats, sharedOptions.volunteers, sharedOptions.users],
        ADMIN_AND_GERENTE: [sharedOptions.stats, sharedOptions.volunteers], // Shared options for ADMIN and GERENTE
    };

    // Map ADMIN and GERENTE to the same options
    const normalizedRole = role === "ADMIN" || role === "GERENTE" ? "ADMIN_AND_GERENTE" : role;

    // Combine base options with role-specific options (if any)
    return [...baseOptions, ...(roleSpecificOptions[normalizedRole] || [])];
};


export const validateBeneficiaryForm = (form) => {
    const {name,dui,birth_date,starting_date,adress,birth_place,income_level,pension,weight,height,whatsapp,house_type,shirt_size,shoe_size,gender} = form;
    const errors = {};
    if (!name) errors.name = "El nombre es requerido";
    if (!dui) errors.dui = "El dui es requerido";
    if (!birth_date) errors.birth_date = "La fecha de nacimiento es requerida";
    if (!starting_date) errors.starting_date = "La fecha de inicio es requerida";
    if (!adress) errors.adress = "La dirección es requerida";
    if (!birth_place) errors.birth_place = "El lugar de nacimiento es requerido";
    if (!income_level) errors.income_level = "El nivel de ingresos es requerido";
    if (!pension) errors.pension = "La pensión es requerida";
    if (!weight) errors.weight = "El peso es requerido";
    if (!height) errors.height = "La altura es requerida";
    if (!whatsapp) errors.whatsapp = "El whatsapp es requerido";
    if (!house_type) errors.house_type = "El tipo de casa es requerido";
    if (!shirt_size) errors.shirt_size = "La talla de camisa es requerida";
    if (!shoe_size) errors.shoe_size = "La talla de zapatos es requerida";
    if(!gender) errors.gender = "El género es requerido";

    return errors;
}

export const validateInput = (field, value) => {
    
    if (value === "") {
        return true;
    }
    const patterns = {
        name: /^[\s a-zA-Z\s]+$/, // Only letters and spaces
        phone_number: /^\d{4}-\d{4}$/, // Matches "1234-5678"
        dui: /^\d{8}-\d$/, // Matches "12345678-9"
        address: /^[a-zA-Z0-9\s,.-]+$/,
         // Letters, numbers, spaces, commas, periods, and dashes
    };

    if (patterns[field]) {
        return patterns[field].test(value); // Validate against the pattern
    }
    return true; // If no pattern is defined, assume valid
};

export const sanitizeInput = (input) => {
    // Remove potentially harmful characters or patterns
    return input.replace(/['";<>${}`[\]]/g, ""); // Removes single quotes, double quotes, semicolons, and angle brackets
};

import dayjs from "dayjs";
export const sanitizeDate = (isoDate) => {
    return dayjs(isoDate).format("DD/MM/YYYY");
};


export const parseRol = (role) => {
  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN";

  

  return {isAdmin, isSuperAdmin};
};


export const smoothScrollToBottom = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollStep = 50; // Ajusta este valor para controlar la velocidad (menor = más lento)
    const delay = 15; // Tiempo entre cada paso (en ms)
  
    const scrollInterval = setInterval(() => {
      const currentScroll = window.scrollY;
      if (currentScroll + window.innerHeight >= scrollHeight) {
        clearInterval(scrollInterval); // Detén el intervalo cuando llegues al final
      } else {
        window.scrollBy(0, scrollStep); // Desplázate hacia abajo
      }
    }, delay);
  };


export const inputStyle =()=>{

  return `
      border-b border-black 
      bg-transparent 
      focus:bg-gray-200
      focus:border-0
      focus:rounded-2xl
      outline-none 
      p-2
  `
}

export const handleDuiChange = (e,setForm,form)=>{
  const field = e.target.id;
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8, 9); // Add a '-' after the first 8 digits
    }
    setForm({ ...form, [field]: value });
}

export const handleNumbers = (e,setForm,form) => {
  const field = e.target.id;
  let value = e.target.value.replace(/\D/g, "");
  if (!value) {
    value = null;
  } // Remove all non-numeric characters
  value = parseInt(value);
  setForm({ ...form, [field]: value });
};

export const handlePhoneChange = (e,setForm,form) => {
  const field = e.target.id;
  let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
  if (value.length > 4) {
    value = value.slice(0, 4) + "-" + value.slice(4, 8); // Add a '-' after the first 8 digits
  }
  setForm({ ...form, [field]: value }); // Update the form state with the formatted value
};

export const hasRole = (user, role) => user?.role === role;

export const hasAnyRole = (user, roles = []) => roles.includes(user?.role);