import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import Loading from '../Pages/Shared/Loading/Loading';

const AdminRoute = ({children}) => {
    const {user,isLoading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email) ;
    const location = useLocation();

    if(user && isAdmin) {
        return children
    }
    if(isLoading || isAdminLoading) {
        return <Loading />
    }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default AdminRoute
