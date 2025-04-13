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