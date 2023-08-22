import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from "../Components/Admin/AdminLogin/AdminLoginPage";
import AdminHomePage from "../Pages/Admin/AdminHomePage";
import AdminUserList from "../Pages/Admin/AdminUserList";
import AdminTurfList from "../Pages/Admin/AdminTurfList";

function AdminRoute() {
  const AdminToken = useSelector((store) => store.Turf.Token);

  return (
    <>
    <Routes> 
          <Route path="/" element={<AdminLoginPage/>}/>
          <Route path="/home" element={AdminToken?<AdminHomePage/>:<AdminLoginPage/>}/>
          <Route path="/viewUser" element={AdminToken?<AdminUserList/>:<AdminLoginPage/>}/>
          <Route path="/viewTurf" element={AdminToken?<AdminTurfList/>:<AdminLoginPage/>}/>
    </Routes>

    </>
  )
}

export default AdminRoute