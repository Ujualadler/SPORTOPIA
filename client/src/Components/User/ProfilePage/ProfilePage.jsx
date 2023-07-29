import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    console.log("sdfghjfghj")
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  let token = useSelector((state) => state.User.Token);

  
    useEffect(() => {
        if (!token) {
            navigate("/login");
          }
      userAxios.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response)=>{
        setUserData(response.data.data)
      }).catch((err)=>{
        console.log(err)
      })
    }, []);
  

  return (
    <div className="p-12">
      <div className="space-x-8 flex justify-end mt-32 md:mt-0 ">
        <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
        <Link to='/editProfile'>EDIT PROFILE</Link> 
        </button>
      </div>
      <div className="p-8 bg-white shadow mt-24 border border-black">
        <div className="grid grid-cols-1 md:grid-cols-1">
          {/* <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">22</p>
              <p className="text-gray-400">Friends</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Photos</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div> */}
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-32  flex items-center justify-center text-indigo-500">
              <img  className="w-44 h-44 rounded-full" src={UserData?UserData.image:''} alt="" />
               
            </div>
          </div>
        </div>
        <div className="mt-20 font-semibold text-center border border-gray-200 pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {UserData?UserData.name:""}
          </h1>
          <p className="mt-8 text-gray-600">
            CONTACT NUMBER -{UserData?UserData.contactNumber:""}
          </p>
          <p className="mt-2 font-semibold t text-gray-600">EMAIL:{UserData?UserData.email:""}</p>
          <p className="mt-2 font-semibold text-gray-600">AGE:{UserData?UserData.age:""}</p>
          <p className="mt-2 font-semibold text-gray-600">STREET:{UserData?UserData.street:""}</p>
          <p className="mt-2 font-semibold text-gray-600">CITY:{UserData?UserData.city:""}</p>
          <p className="mt-2 font-semibold text-gray-600">STATE:{UserData?UserData.state:""}</p>
          <p className="mt-2 font-semibold text-gray-600">PIN CODE:{UserData?UserData.pin:""}</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">

          </p>
          <button className="text-indigo-500  px-4 font-medium ">
            <Link to='/editProfile'>ADD MORE DETAILS</Link> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
