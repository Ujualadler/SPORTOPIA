import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bookingAxios from "../../../Axios/bookingAxios";
import userAxios from "../../../Axios/userAxios";
import CustomCheckbox from "../../Utilities/CustomCheckBox";
import moment from "moment-timezone";

const TurfBooking = () => {
  const token = useSelector((state) => state.User.Token);
  const { id } = useParams();
  const imageRef = useRef(null);

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
	const maxDate = moment()
		.tz("Asia/Kolkata")
		.add(2, "days")
		.format("YYYY-MM-DD");

  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState("");
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedSlotDisplay, setSelectedSlotDisplay] = useState("");
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    userAxios
      .get(`/getTurfDetail?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const result = res.data.data;
        console.log(res.data.data, '----------------------');
        setData(result);

        const currentDate = new Date();

				const startTime = parseInt(result.opening.split(":")[0]);
				const endTime = parseInt(result.closing.split(":")[0]);
				const currentHour = currentDate.getHours();

				const slots = [];
				for (
					let hour = currentHour + 1 < startTime ? startTime : currentHour + 1;
					hour < endTime;
					hour++
				) {
					slots.push({
						start: `${hour}:00`,
						end: `${hour + 1}:00`,
					});
				}
				setTimeSlots(slots);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${suffix}`;
  };

  useEffect(() => {
    const displayString = selectedSlots
      .map((slot) => {
        const [start, end] = slot.split("-");
        return `${start} to ${end}`;
      })
      .join(", ");
    setSelectedSlotDisplay(displayString);
  }, [selectedSlots]);

  useEffect(() => {
    const advancePerSlot = parseFloat(data.advance);
    const totalPerSlot = parseFloat(data.total);
    const numberOfSlots = selectedSlots.length;
    const totalAdvanceAmount = advancePerSlot * numberOfSlots;
    const totalAmount = totalPerSlot * numberOfSlots;
    setTotalAdvance(totalAdvanceAmount);
    setTotalAmount(totalAmount);
  }, [data.advance, selectedSlots, totalAmount]);

  const handleSelectSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots((prevSlots) => [...prevSlots, slot]);
    }
  };

  const handlePayment = async () => {
    if (!date || selectedSlots.length === 0) {
      toast.error("Please select a date and at least one time slot.");
      return;
    }

    try {
      const response = await bookingAxios.post(
        "/create-checkout-session",
        {
          turfId: id,
          date,
          selectedSlots,
          totalAdvance,
          totalAmount,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.error) {
        toast.error(`${response.data.error}[${response.data.slots}]`);
      }
      if (response.data.url) {
        window.location.href = response.data.url;
      }

      console.log(response);
    } catch (error) {
      console.error("Error handling payment:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <section className="overflow-hidden bg-white py-11 font-poppins border border-gray-600 mt-3 ml-5 mr-5 ">
      <div className=" px-4 md:px-1 ml-5 mr-5 mx-auto ">
        <div className="flex items-stretch">
        <img className="w-[5rem] " src={data.logo} alt="" />
        <h2 className="max-w-xl   md:mb-10 text-xl font-bold text-black md:text-3xl">
          {data.turfName}
        </h2>
        </div>
        
        <div className="flex flex-wrap -mx-4">
          <div className="w-full  md:w-1/2  border border-gray-200 rounded-lg shadow-2xl">
            <div className="sticky top-0 z-50 overflow-hidden m-2">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                {selectedImage ? (
                  <img
                    src={selectedImage ? selectedImage : ""}
                    onClick={() => {
                      imageRef.current.click();
                    }}
                    alt=""
                    className="object-cover w-full h-40  md:h-96  rounded-lg"
                  />
                ) : (
                  <img
                    src={data ? data.photos[0] : ""}
                    onClick={() => {
                      imageRef.current.click();
                    }}
                    alt=""
                    className="object-cover w-full h-40  md:h-96 mt-4 rounded-lg"
                  />
                )}
              </div>
              <div className="flex-wrap shadow-2xl border bg-slate-900 rounded-2xl border-gray-200 flex md:mr-3 ml-3">
                {data
                  ? data.photos.map((img) => {
                      return (
                        <div className="p-2 sm:w-1/4 ">
                          <a
                            onClick={() => setSelectedImage(img)}
                            className="block border border-transparent dark:border-transparent dark:hover:border-red-300 hover:border-red-300"
                          >
                            <img
                              src={img || ""}
                              alt=""
                              ref={imageRef}
                              className="object-cover h-20 w-16 md:w-full md:h-20 rounded-md"
                            />
                          </a>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="lg:pl-20  shadow-2xl p-4 border border-gray-200 rounded-lg ">
              <div className="mb-8 mt-1 m-3 overflow-y-auto max-h-[40rem] overflow-hidden">
                <div className="w-16 mr-6 text-xl flex font-semibold mb-4 dark:text-gray-600">
                  <div className="text-gray-800 mr-3 w-64 font-bold font-poppins">
                    AVAILABLE SPORTS
                  </div>
                  <div>{data ? data.turfType : ""}</div>
                </div>
                <div className=" flex">
                  <div className="w-16 justify-stretch mr-6 text-xl font-semibold text-center mb-4 flex dark:text-gray-600">
                    <div className="text-gray-800 mr-3 font-bold font-poppins">
                      TIMING
                    </div>
                    <div>{data ? data.opening : ""} to {data ? data.closing : ""}</div>
                  </div>
                </div>
                <h2 className="w-16 mr-6 text-xl font-semibold mb-4 dark:text-gray-600">
                  <font className="text-gray-800 mr-3 font-bold font-poppins">
                    PHONE
                  </font>
                  {data ? data.phone : ""}
                </h2>
                <div className="">
                  <button
                    className="mr-6 text-xl font-semibold text-center w-16mb-4 dark:text-gray-800 cursor-pointer"
                    onClick={toggleDetails}
                  >
                    <font className="text-white mr-3 font-semibold font-poppins rounded-md bg-black ">
                      SEE ADDRESS..
                    </font>
                  </button>
                  {showDetails && (
                    <>
                      <h2 className="w-16 mr-6 text-xl font-semibold mb-4 text-gray-600">
                        <font className="text-gray-800 mr-3 font-bold font-poppins">
                          STREET
                        </font>
                        {data ? data.street : ""}
                      </h2>
                      <h2 className="w-16 mr-6 text-xl font-semibold mb-4 text-gray-600">
                        <font className="text-gray-800 mr-3 font-bold font-poppins">
                          CITY
                        </font>
                        {data ? data.city : ""}
                      </h2>
                      <h2 className="w-16 mr-6 text-xl font-semibold mb-4 text-gray-600">
                        <font className="text-gray-800 mr-3 font-bold font-poppins">
                          STATE
                        </font>
                        {data ? data.state : ""}
                      </h2>
                      <h2 className="w-16 mr-6 text-xl font-semibold mb-4 text-gray-600">
                        <font className="text-gray-800 mr-3 font-bold font-poppins">
                          PIN
                        </font>
                        {data ? data.pin : ""}
                      </h2>
                    </>
                  )}
                </div>

                <p className="mt-4 mb-8 text-xl font-bold font-poppins text-gray-700 dark:text-gray-800">
                  <span className="mr-3">FOR 1 HOUR</span>
                  <span className="text-gray-600">
                    ₹{data ? data.total : ""}
                  </span>
                </p>

                <p className=" mt-4 mb-8 text-xl font-bold font-poppins  text-gray-700 dark:text-gray-800">
                  <span className="mr-3">ADVANCE AMOUNT</span>
                  <text className="text-gray-600">
                    ₹{data ? data.advance : ""}
                  </text>
                </p>
                <p className=" mt-4 mb-8 text-xl font-bold text-gray-800 font-poppins dark:text-gray-800">
                  <span className="mr-3">DATE</span>
                  <input
                    type="date"
                    className="text-gray-600"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    min={today}
                    max={maxDate}
                  />
                </p>
                <p className="inline-block mt-4 mb-8 text-xl font-bold font-poppins text-gray-800 ">
                  <span className="mr-3 mb-4">TIME SLOTS</span>
                  <div className="flex flex-wrap text-gray-600">
                  {timeSlots.map((slot, index) => {
											const bookedSlot = data.turfBookings.find(
												(booking) =>
													booking.bookedDate.split("T")[0] === date &&
													booking.bookedSlots.some((bookedSlot) =>
														bookedSlot.includes(`${slot.start}-${slot.end}`)
													)
											);

											const isSlotBooked = bookedSlot !== undefined;
											return (
												<div
													key={index}
													className={`flex w-1/2 items-center mb-2 ${
														isSlotBooked ? "booked" : ""
													}`}
												>
													<CustomCheckbox
														checked={selectedSlots.includes(
															`${slot.start}-${slot.end}`
														)}
														onChange={() => {
															if (!isSlotBooked) {
																handleSelectSlot(`${slot.start}-${slot.end}`);
															}
														}}
													/>
													<label>{`${slot.start} to ${slot.end}`}</label>
												</div>
											);
										})}
                  </div>
                </p>
                <div className="">
                  <div className=" mt-4 mb-8 text-xl font-bold font-poppins text-gray-800 ">
                    <span className="mr-5">SELECTED SLOTS</span>
                    <div className="mr-5 text-gray-600">
                      {selectedSlotDisplay}
                    </div>
                  </div>
                  <div className=" mt-4 mb-8 text-xl font-bold font-poppins text-gray-800 ">
                    <span className="mr-3">TOTAL ADVANCE TO BE PAID</span>
                    <span>₹{totalAdvance}</span>
                  </div>
                  <div className=" mt-4 mb-8 text-xl font-bold font-poppins text-gray-800 ">
                    <span className="mr-3">TOTAL AMOUNT</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              <div className="w-32 mb-8"></div>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                  <button
                    type="submit"
                    onClick={handlePayment}
                    className="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TurfBooking;
