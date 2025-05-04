import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function Private_Route() {
    const { currentAdmin } = useSelector((state) => state.user);

    return currentUser ? <Outlet/> : <Navigate to={'/admin-login'}/>
}
