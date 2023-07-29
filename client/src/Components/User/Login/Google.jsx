import React from "react";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { decodeJwt, errors } from "jose";
import userAxios from "../../../Axios/userAxios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../../Redux/userAuth";

function Google() {
  const generaterror = (err) => toast.error(err, { position: "top-center" });
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
            userAxios
              .post("/googlelogin", 
              payload
              )
              .then((res) => {
                console.log(res.data);
                if (res.data.userSignUp.Status===true) {               
                  dispatch(UserLogin({ token: res.data.userSignUp.token }));
                  navigate("/");
                } else {
                  navigate("/login");
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

export default Google;
