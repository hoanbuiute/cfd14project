import React, { useEffect } from 'react'
import tokenMethod from '../../utils/token';
import { MODAL_TYPE } from '../../constants/general';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

const PrivateRoute  = ({ redirectPath = "/" }) => {
    const { handleShowModal } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
      if (!!!tokenMethod.get()) {
        handleShowModal?.(MODAL_TYPE.login);
      
      }
    }, [handleShowModal]);
    
    if (!!!tokenMethod.get()) {
      handleShowModal?.(MODAL_TYPE.login);
      if(redirectPath){
        return <Navigate to={redirectPath} />;
      }else{
        navigate(-1);
      }
    
    } 


    // if (!!!tokenMethod.get()) {
    //   handleShowModal?.(MODAL_TYPE.login);
    //   return <Navigate to={redirectPath} />;
    // }else{
    //   Navigate(-1);
    // }
  return (
    <>
    <Outlet/>
  </>
  )
}

export default PrivateRoute 