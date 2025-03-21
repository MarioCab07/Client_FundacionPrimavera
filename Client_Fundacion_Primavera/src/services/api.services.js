import axios from "axios";

const apiURL = import.meta.env.BASE_URL;

const api = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})
//Auth Functions
export const Login = async(data)=>{
    try {
        return api.post("auth/login",data);
    } catch (error) {
        throw error;
    }
}

export const WhoAmI = async()=>{
    try {
        return api.get("auth/whoami");
    } catch (error) {
        throw error;
    }
}

export const Logout = async()=>{
    try {
        return api.post("auth/logout");
    } catch (error) {
        
    }
}


//User Functions
export const getUsers = async()=>{
    try {
        return api.get("auth/get/users");
    } catch (error) {
        throw error;
    }
}

export const registerUser = async(data)=>{
    try {
        return api.post("auth/register",data);
    } catch (error) {
        throw error;
        
    }
}

export const updateUser = async(userId,data)=>{
    try {
        return api.put(`auth/update/user/${userId}`,data);
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async(userId)=>{
    try {
        
        return api.delete(`auth/delete/user/${userId}`);
    } catch (error) {
        throw error;
    }
}

//Beneficiary Functions

export const getBeneficiaries = async(page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return api.get("beneficiary/getAll",{params:{skip,limit}});

    } catch (error) {
        
    }
}

export const findBeneficiary = async(benId)=>{
    try {
        return api.get(`beneficiary/find/${benId}`);
    } catch (error) {
        
    }
}

export const getInactiveBeneficiaries = async(page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return api.get("beneficiary/inactive",{params:{skip,limit}});

    } catch (error) {
        
    }
}


export const getBenDocuments = async(benId)=>{
    try {
        return api.get(`beneficiary/read/document/${benId}`)
    } catch (error) {
        
    }
}

export const getBenPhoto = async(benId)=>{
    try {
        return api.get(`beneficiary/photo/${benId}`)
    } catch (error) {
        
    }
}


export const addBeneficiary = async(data)=>{
    try {
        return api.post("beneficiary/create",data);
    } catch (error) {
        
    }
}


export const uploadDocuments = async(benId,data)=>{
    try {
        return api.post(`beneficiary/upload/document/${benId}`,data);
    } catch (error) {
        
    }
}


export const toggleActive = async(benId,data)=>{
    try {
        return api.patch(`beneficiary/toggle/${benId}`,data)
    } catch (error) {
        
    }
}

export const updateBeneficiary = async(benId,data)=>{
    try {
        return api.put(`beneficiary/update/${benId}`,data)
    } catch (error) {
        
    }
}

export const deleteBenDocument = async(benId,data)=>{
    try {
        return api.delete(`beneficiary/delete/document/${benId}`,{data});    
    } catch (error) {
        
    }
}


//Inventory Functions
export const getImage = async(inventId)=>{
    try {
        return api.get(`inventory/image/${inventId}`);
    } catch (error) {
        
    }
}

export const findItem = async(inventId)=>{
    try {
        return api.get(`inventory/find/${inventId}`);
    } catch (error) {
        
    }
}

export const getInventory = async(page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return api.get("inventory/getAll",{params:{skip,limit}});

    } catch (error) {
        
    }
}

export const addItem = async(data)=>{
    try{
        return api.post("inventory/create",data);
    }catch(error){
        throw error;
    }

}

export const updateItem = async(inventId,data)=>{
    try {
        return api.put(`inventory/update/${inventId}`,data);
    } catch (error) {
        throw error;
    }
}

export const deleteItem = async(inventId)=>{
    try {
        return api.delete(`inventory/delete/${inventId}`);
    } catch (error) {
        throw error;
    }
}


//VolunteerFunctions
export const getVolunteers = async(page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return api.get("volunteer/getAll",{params:{skip,limit}});

    } catch (error) {
        
    }
}

export const findVolunteer = async(volunId)=>{
    try {
        return api.get(`volunteer/find/${volunId}`);
    } catch (error) {
        
    }
}

export const addVolunteer = async(data)=>{
    try {
        return api.post("volunteer/create",data);
    } catch (error) {
        
    }
}

export const createVolunUser = async(volunId)=>{
    try {
        return api.post(`volunteer/create/user/${volunId}`);
    } catch (error) {
        
    }
}

export const updateVolunteer = async(volunId,data)=>{
    try {
        return api.put(`volunteer/update/${volunId}`,data);
    } catch (error) {
        
    }
}

export const deleteVolunteer = async(volunId)=>{
    try {
        return api.delete(`volunteer/delete/${volunId}`);
    } catch (error) {
        
    }
}

export const toggleVolunActive = async(volunId)=>{
    try {
        return api.patch(`volunteer/toggle/active/${volunId}`);
    } catch (error) {
        
    }
}


//Petitions Functions
export const getPetitions = async(status="pending",page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return api.get("petition/getAll",{params:{skip,limit}});

    } catch (error) {
        
    }
}

export const reopenPetition = async(petId)=>{
    try {
        return api.patch(`petition/reopen/${petId}`);
    } catch (error) {
        
    }
}

export const resolvePetition = async(petId)=>{
    try {
        return api.patch(`petition/resolve/${petId}`);
    } catch (error) {
        
    }
}

export const deletePetition = async(petId)=>{
    try {
        return api.delete(`petition/delete/${petId}`);
    } catch (error) {
        
    }
}


//Stats Functions

export const getGeneralStats = async()=>{
    try {
        return api.get("stats/general");
    } catch (error) {
        
    }
}

export const getIncomeStats = async()=>{
    try {
        return api.get("stats/income");
    } catch (error) {
        
    }
}

export const getHouseStats = async()=>{
    try {
        return api.get("stats/house");
    } catch (error) {
        
    }
}

export const getPhoneStats = async()=>{
    try {
        return api.get("stats/phone");
    } catch (error) {
        
    }
}

export const getAgeStats = async(data)=>{
    try {
        return api.get("stats/income",{params:data});
    } catch (error) {
        
    }
}

