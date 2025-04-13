import {createContext,useContext,useEffect,useState} from "react";
import {WhoAmI,Login,Logout} from "../services/api.services";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const response = await WhoAmI();
                setUser(response.data);
            } catch {
                setUser(null);
            }finally{
                setLoading(false);
            }
        };
        if(!user){
            fetchUser();
        }
        
    
    },[user]);

    const login = async(data)=>{
        
        let response = await Login(data);
        
        if (response.status === 200) {
            setUser(response.data);
            
        }
        return response;
        
        
        
        
    }

    const logout = async()=>{
        await Logout();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )

};


export const useAuth = () =>useContext(AuthContext);