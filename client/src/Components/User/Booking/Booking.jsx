import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import userAxios from "../../../Axios/userAxios";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [turfData, setTurfData] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const navigate=useNavigate()
  
  const booking=(id)=>{
    navigate(`/booking/${id}`)
  }

  useEffect(() => {
    userAxios.get("/getTurfs")
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
      <div className='flex justify-center md:justify-between'>
        <div className='mt-8 mx-11  md:text-xl font-bold tracking-wide'>BOOK YOUR FAVOURITE TURF</div>
        <input
          type="text"
          value={SearchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          id="table-search-users"
          className="border text-center border-black block p-2  mr-12 mt-8 text-sm text-gray-900 max-h-10  rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gradient-to-r from-gray-500 to-gray-300 dark:border-black dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search turfs"
        />
      </div>  
      <div>
        {turfData.filter((turf)=>turf.turfName.toLowerCase().includes(SearchInput.toLowerCase())).map((result) => (
          <div key={result._id} className="container flex justify-around mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
            <div className="mb-auto mt-auto flex">
              <div className="bg-gradient-to-r from-gray-500 to-gray-300 md:w-[10rem] md:h-[10rem] m-auto flex justify-center">
                <img
                  className="md:w-[6rem] md:h-[6rem] sm:w-[4rem] sm:h-[4rem] mb-auto mt-auto"
                  src={result.logo}
                  alt="Turf Logo"
                />
              </div>
            </div>
            <div>
              <ul className="mt-4 mb-4">
                <h2 className="font-bold mt-4 text-lg tracking-wide">{result.turfName}</h2>
                <li className="font-semibold mt-3 text-gray-800">
                  CITY: {result.city}
                </li>
                <li className="font-semibold mt-3 text-gray-800">
                  TYPE: {result.turfType}
                </li>
                <li className="font-semibold mt-3 text-gray-800">
                  PHONE: {result.phone}
                </li>
                <li className="font-semibold mt-3 text-gray-800">
                  AMOUNT: ₹{result.total}
                </li>
              </ul>
            </div>
            <div className="my-auto">
              <button onClick={()=>{booking(result._id)}}  className="bg-gray-900  md:w-[6rem] s:w-[4rem] h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold">
                VIEW
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
  
}

export default Booking;
