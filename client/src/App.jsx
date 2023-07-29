import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/User/HomePage";
import Login from "./Components/User/Login/Login";
import SignUp from "./Components/User/SignUp/SignUp";
import TurfSignUp from "./Components/TurfAdmin/TurfSignUp/TurfSignUp";
import TurfAdminHome from "./Pages/TurfAdmin/TurfAdminHome";
import TurfCreate from "./Pages/TurfAdmin/TurfCreate";
import GetTurfs from "./Pages/User/GetTurfs";
import TurfsListing from "./Pages/TurfAdmin/TurfsListing";
import AdminLoginPage from "./Components/Admin/AdminLogin/AdminLoginPage";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import AdminUserList from "./Pages/Admin/AdminUserList";
import AdminTurfList from "./Pages/Admin/AdminTurfList";
import VerifyMail from "./Components/User/VerifyMail/VerifyMail";
import TurfLoginPage from "./Components/TurfAdmin/TurfLogin/TurfLogin";
import VerifyTurfMail from "./Components/TurfAdmin/VerifyTurf/VerifyTurfMail";
import Profile from "./Pages/User/Profile";
import { useSelector } from "react-redux/es/hooks/useSelector";
import EditProfile from "./Pages/User/EditProfile";
import TurfEditPage from "./Pages/TurfAdmin/TurfEditPage";
import OtpLogin from "./Components/User/Login/OtpLogin";
import TurfBookingPage from "./Pages/User/TurfBookingPage";
import PaySuccess from "./Components/User/Checkout/PaySuccess";
import PayFail from "./Components/User/Checkout/PayFail";

function App() {
  const userToken = useSelector((store) => store.User.Token);
  const adminToken= useSelector((state) => state.Admin.Token);
  const turfToken= useSelector((state) => state.Turf.Token);
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={userToken?<HomePage/>:<Login/>}/>
          <Route path="/otpLogin" element={userToken?<OtpLogin/>:<OtpLogin/>}/>
          <Route path="/signup" element={userToken?<HomePage/>:<SignUp/>}/>
          <Route path="/profile" element={userToken?<Profile/>:<Login/>}/>
          <Route path="/getTurfs" element={<GetTurfs/>}/>
          <Route path="/verify/:user_id" element={<VerifyMail/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/booking/:id" element={<TurfBookingPage/>}/>
          <Route path="/paymentSuccess" element={<PaySuccess/>}/>
          <Route path="/paymentFail" element={<PayFail/>}/>


          <Route path="/turf" element={<TurfAdminHome/>}/>
          <Route path="/turf/login" element={<TurfLoginPage/>}/>
          <Route path="/turf/signup" element={<TurfSignUp/>}/>
          <Route path="/turf/verifyTurf/:user_id" element={<VerifyTurfMail/>}/>
          <Route path="turf/registration" element={<TurfCreate/>} />         
          <Route path="turf/listing" element={<TurfsListing/>} />
          <Route path="turf/editTurf/:id" element={<TurfEditPage/>}/>


          <Route path="/admin" element={<AdminLoginPage/>}/>
          <Route path="/admin/home" element={adminToken?<AdminHomePage/>:<AdminLoginPage/>}/>
          <Route path="/admin/viewUser" element={adminToken?<AdminUserList/>:<AdminLoginPage/>}/>
          <Route path="/admin/viewTurf" element={adminToken?<AdminTurfList/>:<AdminLoginPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
