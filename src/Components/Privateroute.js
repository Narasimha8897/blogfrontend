import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Base from './Base'
import { isLoggedIn } from '../auth'

const Privateroute = () => {
    if(isLoggedIn()){
        return <Base><Outlet /></Base>
    }else{
        return <Navigate to={"/login"} />;
    }
}

export default Privateroute