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
