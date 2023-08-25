import React from "react";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt, errors } from "jose";
import TurfAxios from "../../../Axios/turfAxios";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { TurfLogin } from "../../../Redux/Slices/turfAuth";

function TurfGoogle() {
  const turfAxios=TurfAxios()
  const generaterror = (err) => toast.error(err);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center h-12  mt-8 rounded font-semibold text-sm text-blue-100">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const { credential } = credentialResponse;
          const payload = credential ? decodeJwt(credential) : undefined;
          console.log(payload.email,'===========================');
          if (payload) {
            turfAxios
              .post("/googlelogin", 
              payload
              )
              .then((res) => {
                console.log(res.data);
                if (res.data.userSignUp.Status===true) {               
                  dispatch(TurfLogin({ token: res.data.userSignUp.token }));
                  navigate("/");
                } else {
                  navigate("/turf/login");
                  generaterror(res.data.userSignUp.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
        onError={(error) => console.log(error)}
      />
    </div>
  );
}

export default TurfGoogle;
