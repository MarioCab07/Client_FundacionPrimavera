import axios from "axios";
import profileIcon from "../assets/icons/ProfileIcon.jpg";


const apiURL = import.meta.env.VITE_BASE_URL+"api/v1/";

const api = axios.create({
    baseURL: apiURL,
    withCredentials: true,
})
//Auth Functions
export const Login = async(data)=>{
    try {
        return await api.post("auth/login",data);
    } catch (error) {
        throw error;
    }
}

export const WhoAmI = async()=>{
    try {
        return await api.get("auth/whoami");
    } catch (error) {
        throw error;
    }
}

export const Logout = async()=>{
    try {
        return await api.post("auth/logout");
    } catch (error) {
        
    }
}


//User Functions
export const getUsers = async()=>{
    try {
        return await api.get("auth/get/users");
    } catch (error) {
        throw error;
    }
}

export const registerUser = async(data)=>{
    try {
        return await api.post("auth/register",data);
    } catch (error) {
        throw error;
        
    }
}

export const updateUser = async(userId,data)=>{
    try {
        return await api.put(`auth/update/user/${userId}`,data);
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async(userId)=>{
    try {
        
        return await api.delete(`auth/delete/user/${userId}`);
    } catch (error) {
        throw error;
    }
}

//Beneficiary Functions

export const getBeneficiaries = async(page=1, limit =10)=>{
    try {
       
        return await api.get("beneficiary/getAll",{params:{page,limit}});

    } catch (error) {
        throw error;
    }
}

export const findBeneficiary = async(benId)=>{
    try {
        return await api.get(`beneficiary/find/${benId}`);
    } catch (error) {
        throw error;
    }
}

export const getInactiveBeneficiaries = async(page=1, limit =10)=>{
    try {
        

        return await api.get("beneficiary/inactive",{params:{page,limit}});

    } catch (error) {
        throw error;
    }
}


export const getBenDocuments = async(benId)=>{
    try {
        return await api.get(`beneficiary/read/document/${benId}`)
    } catch (error) {
        throw error;
    }
}

export const getBenPhoto = async(benId)=>{
    try {
        const response =  await api.get(`beneficiary/photo/${benId}`);
        return response.data.photo;
    } catch (error) {
        return profileIcon;
    }
}


export const addBeneficiary = async(data)=>{
    try {
        return await api.post("beneficiary/create",data);
    } catch (error) {
        return ""
    }
}


export const uploadDocuments = async(benId,data)=>{
    try {
        return await api.post(`beneficiary/upload/document/${benId}`,data);
    } catch (error) {
        throw error;
    }
}


export const toggleActive = async(benId,data)=>{
    try {
        return await api.patch(`beneficiary/toggle/${benId}`,data)
    } catch (error) {
        throw error;
    }
}

export const updateBeneficiary = async(benId,data)=>{
    try {
        return await api.put(`beneficiary/update/${benId}`,data)
    } catch (error) {
        throw error;
    }
}

export const deleteBenDocument = async(benId,data)=>{
    try {
        return await api.delete(`beneficiary/delete/document/${benId}`,{data});    
    } catch (error) {
        throw error;
    }
}

export const generateCSV = async(data)=>{
    try{
        return await api.get("beneficiary/csv",data,{responseType: "blob"});

    }catch(error){
        throw error;
    }
}


//Inventory Functions
export const getImage = async(inventId)=>{
    try {
        return await api.get(`inventory/image/${inventId}`);
    } catch (error) {
        throw error;
    }
}



export const findItem = async(inventId)=>{
    try {
        return await api.get(`inventory/find/${inventId}`);
    } catch (error) {
        throw error;
    }
}

export const getInventory = async(page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return await api.get("inventory/getAll",{params:{skip,limit}});

    } catch (error) {
        throw error;
    }
}

export const addItem = async(data)=>{
    try{
        return await api.post("inventory/create",data);
    }catch(error){
        throw error;
    }

}

export const updateItem = async(inventId,data)=>{
    try {
        return await api.put(`inventory/update/${inventId}`,data);
    } catch (error) {
        throw error;
    }
}

export const deleteItem = async(inventId)=>{
    try {
        return await api.delete(`inventory/delete/${inventId}`);
    } catch (error) {
        throw error;
    }
}


//VolunteerFunctions
export const getVolunteers = async(page=1, limit =10,active = true)=>{
    try {

        return await api.get("volunteer/getAll",{params:{page,limit,active}});

    } catch (error) {
        throw error;
    }
}

export const findVolunteer = async(volunId)=>{
    try {
        return await api.get(`volunteer/find/${volunId}`);
    } catch (error) {
        throw error;
    }
}

export const addVolunteer = async(data)=>{
    try {
        return await api.post("volunteer/create",data);
    } catch (error) {
        throw error;
    }
}

export const createVolunUser = async(volunId)=>{
    try {
        return await api.post(`volunteer/create/user/${volunId}`);
    } catch (error) {
        throw error;
    }
}

export const updateVolunteer = async(volunId,data)=>{
    try {
        return await api.put(`volunteer/update/${volunId}`,data);
    } catch (error) {
        throw error;
    }
}

export const deleteVolunteer = async(volunId)=>{
    try {
        return await api.delete(`volunteer/delete/${volunId}`);
    } catch (error) {
        throw error;
    }
}

export const toggleVolunActive = async(volunId)=>{
    try {
        return await api.patch(`volunteer/toggle/active/${volunId}`);
    } catch (error) {
        throw error;
    }
}


//Petitions Functions
export const getPetitions = async(status="pending",page=1, pageSize =10)=>{
    try {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        return await api.get("petition/getAll",{params:{skip,limit}});

    } catch (error) {
        throw error;
    }
}

export const reopenPetition = async(petId)=>{
    try {
        return await api.patch(`petition/reopen/${petId}`);
    } catch (error) {
        throw error;
    }
}

export const resolvePetition = async(petId)=>{
    try {
        return await api.patch(`petition/resolve/${petId}`);
    } catch (error) {
        throw error;
    }
}

export const deletePetition = async(petId)=>{
    try {
        return await api.delete(`petition/delete/${petId}`);
    } catch (error) {
        throw error;
    }
}


//Stats Functions

export const getGeneralStats = async()=>{
    try {
        return await api.get("stats/general");
    } catch (error) {
        throw error;
    }
}

export const getIncomeStats = async()=>{
    try {
        return await api.get("stats/income");
    } catch (error) {
        throw error;
    }
}

export const getHouseStats = async()=>{
    try {
        return await api.get("stats/house");
    } catch (error) {
        throw error;
    }
}

export const getPhoneStats = async()=>{
    try {
        return await api.get("stats/phone");
    } catch (error) {
        throw error;
    }
}

export const getAgeStats = async(data)=>{
    try {
        return await api.get("stats/income",{params:data});
    } catch (error) {
        throw error;
    }
}

