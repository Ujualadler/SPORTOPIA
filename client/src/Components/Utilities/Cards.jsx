import React from "react";
import { Link, useNavigate } from "react-router-dom"

function Cards(props) {
  const navigate=useNavigate()
  const { reg } = props;

  return (
    <>
      <div onClick={()=>navigate(reg.link?reg.link:'')} className="bg-black relative w-full md:w-auto md:flex-1 flex items-center justify-center h-80 font-heading text-white uppercase tracking-widest hover:opacity-30">
          <div className="relative z-10 text-lg font-bold">
            {reg ? reg.title : ""}
          </div>
        <img
          src={reg ? reg.image : ""}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />{" "}
      </div>
    </>
  );
}

export default Cards;
