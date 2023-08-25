import React from "react";
import {Routes,Route} from "react-router-dom";
import TurfLoginPage from "../Components/TurfAdmin/TurfLogin/TurfLogin";
import TurfSignUp from "../Components/TurfAdmin/TurfSignUp/TurfSignUp";
import VerifyTurfMail from "../Components/TurfAdmin/VerifyTurf/VerifyTurfMail";
import TurfCreate from "../Pages/TurfAdmin/TurfCreate";
import TurfsListing from "../Pages/TurfAdmin/TurfsListing";
import TurfEditPage from "../Pages/TurfAdmin/TurfEditPage";
import TurfBookHistoryPage from "../Pages/TurfAdmin/TurfBookHistoryPage";
import { useSelector } from "react-redux";
import TurfAdminHome from "../Pages/TurfAdmin/TurfAdminHome";
import TurfAdminProfilePage from "../Pages/TurfAdmin/TurfAdminProfilePage";
import TurfEditProfilePage from "../Pages/TurfAdmin/TurfEditProfilePage";

function TurfRoute() {
  const TurfToken = useSelector((store) => store.Turf.Token);

  return (
    <>
      <Routes>
        <Route path="/" element={TurfToken?<TurfAdminHome/>:<TurfLoginPage/>} />
        <Route path="/login" element={<TurfLoginPage/>} />
        <Route path="/signup" element={<TurfSignUp />} />
        <Route path="/verifyTurf/:user_id" element={<VerifyTurfMail />} />
        <Route path="/registration" element={TurfToken?<TurfCreate />:<TurfLoginPage/>} />
        <Route path="/listing" element={TurfToken?<TurfsListing />:<TurfLoginPage/>} />
        <Route path="/editTurf/:id" element={TurfToken?<TurfEditPage />:<TurfLoginPage/>} />
        <Route path="/bookingHistory" element={TurfToken?<TurfBookHistoryPage />:<TurfLoginPage/>} />
        <Route path="/profile" element={TurfToken?<TurfAdminProfilePage />:<TurfLoginPage/>} />
        <Route path="/editProfile" element={TurfToken?<TurfEditProfilePage />:<TurfLoginPage/>} />
      </Routes>
    </>
  );
}

export default TurfRoute;
