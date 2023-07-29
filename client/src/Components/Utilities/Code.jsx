// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import userAxios from "../../../Axios/userAxios";
// import toast, { Toaster } from "react-hot-toast";

// const TurfBooking = () => {
//   const token = useSelector((state) => state.User.Token);
//   const { id } = useParams();
//   const imageRef = useRef(null);

//   const [showDetails, setShowDetails] = useState(false);

//   const toggleDetails = () => {
//     setShowDetails((prevShowDetails) => !prevShowDetails);
//   };

//   const today = new Date().toISOString().split("T")[0]; // Get today's date in the format "YYYY-MM-DD"
//   const nextTwoDays = new Date();
//   nextTwoDays.setDate(nextTwoDays.getDate() + 2);
//   const maxDate = nextTwoDays.toISOString().split("T")[0];

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [data, setData] = useState("");
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [selectedSlotDisplay, setSelectedSlotDisplay] = useState("");

//   useEffect(() => {
//     userAxios
//       .get(`/getTurfDetail?id=${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const result = res.data.data;
//         console.log(res.data);
//         setData(result);

//         // Calculate the time slots between opening and closing time with 1-hour gap
//         const startTime = parseInt(result.opening.split(":")[0]);
//         const endTime = parseInt(result.closing.split(":")[0]);
//         const slots = [];
//         for (let hour = startTime; hour < endTime; hour++) {
//           slots.push({
//             start: `${hour}:00`,
//             end: `${hour + 1}:00`,
//           });
//         }
//         setTimeSlots(slots);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     // Generate a display string for the selected slots
//     const displayString = selectedSlots.map((slot) => {
//       const [start, end] = slot.split("-");
//       return `${start} to ${end}`;
//     }).join(", ");
//     setSelectedSlotDisplay(displayString);
//   }, [selectedSlots]);

//   const handleTimeSlotChange = (e) => {
//     setSelectedSlots(Array.from(e.target.selectedOptions, (option) => option.value));
//   };

//   return (
//     <section className="overflow-hidden bg-white py-11 font-poppins ">
//       <div className="max-w-6xl px-4 py-4 mx-auto  md:px-6">
//         <h2 className="max-w-xl  md:mb-10 text-2xl font-bold text-black md:text-4xl">
//           {data.turfName}
//         </h2>
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-full px-4 md:w-1/2 ">
//             <div className="sticky top-0 z-50 overflow-hidden">
//               <div className="relative mb-6 lg:mb-10 lg:h-2/4">
//                 {selectedImage ? (
//                   <img
//                     src={selectedImage ? selectedImage : ""}
//                     onClick={() => {
//                       imageRef.current.click();
//                     }}
//                     alt=""
//                     className="object-cover w-full h-40  md:h-96  rounded-lg"
//                   />
//                 ) : (
//                   <img
//                     src={data ? data.photos[0] : ""}
//                     onClick={() => {
//                       imageRef.current.click();
//                     }}
//                     alt=""
//                     className="object-cover w-full h-40  md:h-96 mt-4 rounded-lg"
//                   />
//                 )}
//               </div>
//               <div className="flex-wrap flex md:mr-3 ml-3">
//                 {data
//                   ? data.photos.map((img) => {
//                       return (
//                         <div className="p-2 sm:w-1/4 ">
//                           <a
//                             onClick={() => setSelectedImage(img)}
//                             className="block border border-transparent dark:border-transparent dark:hover:border-red-300 hover:border-red-300"
//                           >
//                             <img
//                               src={img || ""}
//                               alt=""
//                               ref={imageRef}
//                               className="object-cover h-20 w-16 md:w-full md:h-20 rounded-md"
//                             />
//                           </a>
//                         </div>
//                       );
//                     })
//                   : ""}
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 md:w-1/2">
//             <div className="lg:pl-20">
//               <div className="mb-8 mt-1">
//                 <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                   <font className="text-gray-800 mr-3 font-bold font-mono">
//                     Type
//                   </font>
//                   {data ? data.turfType : ""}
//                 </h2>
//                 <div className=" flex">
//                   <h2 className="w-16 mr-6 text-xl font-semibold text-center mb-4 flex dark:text-gray-600">
//                     <div className="text-gray-800 mr-3 font-bold font-mono">
//                       Timing
//                     </div>
//                     {data ? data.opening : ""} to {data ? data.closing : ""}
//                   </h2>
//                 </div>
//                 <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                   <font className="text-gray-800 mr-3 font-bold font-mono">
//                     Phone
//                   </font>
//                   {data ? data.phone : ""}
//                 </h2>
//                 <div className="">
//                   <button
//                     className="mr-6 text-xl font-semibold text-center w-16mb-4 dark:text-gray-600 cursor-pointer"
//                     onClick={toggleDetails}
//                   >
//                     <font className="text-white mr-3 font-bold rounded-md bg-black font-mono">
//                       See Address..
//                     </font>
//                   </button>
//                   {showDetails && (
//                     <>
//                       <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                         <font className="text-gray-800 mr-3 font-bold font-mono">
//                           Street
//                         </font>
//                         {data ? data.street : ""}
//                       </h2>
//                       <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                         <font className="text-gray-800 mr-3 font-bold font-mono">
//                           City
//                         </font>
//                         {data ? data.city : ""}
//                       </h2>
//                       <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                         <font className="text-gray-800 mr-3 font-bold font-mono">
//                           State
//                         </font>
//                         {data ? data.state : ""}
//                       </h2>
//                       <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
//                         <font className="text-gray-800 mr-3 font-bold font-mono">
//                           PIN
//                         </font>
//                         {data ? data.pin : ""}
//                       </h2>
//                     </>
//                   )}
//                 </div>

//                 <p className="inline-block mt-4 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
//                   <span>Total amount</span>
//                   <span>{data ? data.total : ""}</span>
//                 </p>
                
//                 <p className="inline-block mt-4 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
//                   <span>Advance amount</span>
//                   <text >{data ? data.advance : ""}</text>
//                 </p>
//                 <p className="inline-block mt-4 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
//                   <span>Date</span>
//                   <input type="date" min={today} max={maxDate}/>
//                 </p>
//               <p className="inline-block mt-4 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
//           <span>Time Slots</span>
//           <select
//             multiple
//             size="4" // Adjust the size as needed to show more slots at once
//             value={selectedSlots}
//             onChange={handleTimeSlotChange}
//           >
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={`${slot.start}-${slot.end}`}>
//                 {`${slot.start} to ${slot.end}`}
//               </option>
//             ))}
//           </select>
//         </p>
//         <p className="inline-block mt-4 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400">
//           <span>Selected Slots:</span>
//           <span>{selectedSlotDisplay}</span>
//         </p>
//               </div>
//               <div className="flex items-center mb-8">
//                 <h2 className="w-16 text-xl font-bold dark:text-gray-400">
//                   Size:
//                 </h2>
//                 <div className="flex flex-wrap -mx-2 -mb-2">
//                   <button className="py-1 mb-2 mr-1 border w-11 hover:border-red-400 dark:border-gray-400 hover:text-red-600 dark:hover:border-gray-300 dark:text-gray-400">
//                     XL
//                   </button>
//                   <button className="py-1 mb-2 mr-1 border w-11 hover:border-red-400 hover:text-red-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
//                     S
//                   </button>
//                   <button className="py-1 mb-2 mr-1 border w-11 hover:border-red-400 hover:text-red-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
//                     M
//                   </button>
//                   <button className="py-1 mb-2 mr-1 border w-11 hover:border-red-400 hover:text-red-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
//                     XS
//                   </button>
//                 </div>
//               </div>
//               <div className="w-32 mb-8"></div>
//               <div className="flex flex-wrap items-center -mx-4">
//                 <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
//                   <button className="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300">
//                     BOOK NOW
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TurfBooking;
