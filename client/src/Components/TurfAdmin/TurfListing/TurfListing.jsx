import React from "react";
import Turfaxios from "../../../Axios/turfAxios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TurfListing() {
  const token = useSelector((store) => store.Turf.Token);
  const [turfData, setTurfData] = useState([]);
  const navigate=useNavigate()

  const editTurf=(id)=>{
    navigate(`/turf/editTurf/${id}`)
  }

  useEffect(() => {
    Turfaxios.get("/getTurfsAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setTurfData(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {turfData.map((result) => {
        return (
          <div className="container flex justify-around bg-gray-200 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
            <div className="mb-auto mt-auto flex">
              <div className="bg-gradient-to-r from-gray-500 to-gray-300 md:w-[10rem] md:h-[10rem] m-auto flex justify-center">
                <img
                  className="md:w-[6rem] md:h-[6rem] sm:w-[4rem] sm:h-[4rem] mb-auto mt-auto"
                  src={result.logo}
                />
              </div>
            </div>
            <div>
              <ul className="mt-4 mb-4">
                <h2 className="font-bold mt-4 text-lg trackinge-wide">
                  {result.turfName}
                </h2>
                <li className="font-semibold mt-3  text-gray-800">
                  City:{result.city}
                </li>
                <li className="font-semibold mt-3  text-gray-800">
                  Type:{result.turfType}
                </li>
                <li className="font-semibold mt-3  text-gray-800">
                  Phone:{result.phone}
                </li>
                <li className="font-semibold mt-3  text-gray-800">
                  Amount:₹{result.total}
                </li>
              </ul>
            </div>
            <div className="my-auto">
              <button onClick={()=>{editTurf(result._id)}} className="bg-gray-900 md:w-[6rem] s:w-[4rem] h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold ">
                EDIT
              </button>
            </div>
          </div>
        );
      })}
    </>
  );  
}

export default TurfListing;
