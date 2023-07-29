import React, { useEffect, useState } from "react";
import Carousal from "../../Utilities/Carousal";
import Cards from "../../Utilities/Cards";


import { dummySlides } from "../../../utils/dummy";

function TurfHome() {
  

  const [slides, setSlides] = useState(dummySlides)

  

  console.log(slides);

  let register = {
    image: "/UserImages/register now.jpg",
    title: "BOOKING HISTORY",
    description: "Here admin can view the booking history",
    button: "VIEW LIST",
    link:''
  };

  let bookinglist = {
    image: "/UserImages/register now.jpg",
    title: "REGISTER YOUR TURF",
    description: "Here you can register your turf in Sportopia",
    button: "REGISTER NOW",
    link:'/turf/registration'
  };
  let viewTurfs = {
    image: "/UserImages/register now.jpg",
    title: "VIEW TURF DETAILS",
    description: "Here admin can view his turf details",
    button: "VIEW NOW",
    link:'/turf/listing'
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl text-black font-bold tracking-[6px] ml-8 mt-5">
          WELCOME TURF ADMIN
        </div>
      </div>
      <Carousal slides={slides} />
      <div className="container md:flex justify-between md:m-8 xs:m-4 ">
        <Cards reg={register} />
        <Cards reg={bookinglist} />
        <Cards reg={viewTurfs} />
      </div>
    </>
  );
}

export default TurfHome;
