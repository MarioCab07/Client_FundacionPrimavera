import {Navigate,Outlet} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import Loading from "./Loading"


const ProtectedRoutes = ({allowedRoles}) => {
    const {user,loading} = useAuth();

    if(loading) return <Loading/>;
    if(!user) return <Navigate to="/"/>
    if(!allowedRoles.includes(user.role)) return <Navigate to="/"/>
    return <Outlet/>

}

export default ProtectedRoutes;