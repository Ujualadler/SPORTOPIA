import { Link, useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/userAxios";
import { Toaster, toast } from "react-hot-toast";
import { UserLogin } from "../../../Redux/userAuth";
import { useState, react } from "react";
import { useDispatch } from "react-redux";
import Google from "./Google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateError = (err) => {
    toast.error(err, { position: "bottom-center" });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      generateError("Please fill in all the fields");
      return;
    }
    if (!email.trim()) {
      generateError("Please fill the Email field");
      return;
    }
    if (!password.trim()) {
      generateError("Please fill the Password field");
      return;
    }

    try {
      const response = await userAxios.post("/login", { email, password });
      const result = response.data.userSignUp;
      console.log(result);
      console.log("first");
      if (result.Status === true) {
        const token = result.token;
        dispatch(UserLogin({ token: token }));
        navigate("/");
      } else {
        generateError(result.message);
      }
    } catch (error) {
      generateError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-signup">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="bg-slate-900 rounded-lg space-y-9 ">
          <div className="bg-slate-800 m-5 rounded-2xl border border-black">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto mt-2"
                src="/UserImages/sportopianextlogo.jpg"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                LOG IN TO YOUR ACCOUNT
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={LoginSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                    {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <Google />
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-3"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
              <div className="flex justify-center"></div>

              <p className="mt-3 mb-2 text-center text-sm text-gray-200">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-gray-400 hover:text-indigo-500"
                > 
                  <Link to="/signup">Register here</Link>
                </a>
              </p>
              <p className="mt-3 mb-2 text-center text-sm text-gray-200">
                Try otp login?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-gray-400 hover:text-indigo-500"
                > 
                  
                  <Link to="/otpLogin">Click here</Link>
                  

                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
