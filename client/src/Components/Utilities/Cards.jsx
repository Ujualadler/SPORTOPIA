import React from "react";
import { Link } from "react-router-dom";

function Cards(props) {
  const { reg } = props;



 
  return (
    <>
      <div className="rounded-md">
        <div className="card w-96 bg-gray-900 shadow-xl rounded-lg">
          <figure className="px-10 pt-10">
            <img
              src={reg ? reg.image : ""}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-white mt-4">{reg ? reg.title : ""}</h2>
            <p className="text-white mt-4">{reg ? reg.description : ""}</p>
            <div className="card-actions">
              <button  className="btn btn-primary bg- text-white mt-2 mb-2">
               <Link to={reg?reg.link:''}>{reg ? reg.button : ""}</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;



