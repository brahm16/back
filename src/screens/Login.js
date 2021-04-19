import React, { useState } from "react";
import authSvg from "../assets/auth.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth, setCookie } from "../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        setCookie("user",res.data.user);
        setCookie("username",res.data.user.name);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  const informParent = (response) => {
    authenticate(response, () => {
      
      if (isAuth() && isAuth().role === "admin") {   history.push("/admin")
    }
      else if (isAuth() && isAuth().role === "owner")         history.push("/owner")

      else if (isAuth() && isAuth().role === "subscriber")
      history.push("/subscriber")

      else  history.push("/login")
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = (response) => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken);
  };

  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });
            if (isAuth() && isAuth().role === "admin")   history.push("/admin/dashboard")

            else if (isAuth() && isAuth().role === "owner")
            history.push("/owner")
            else if (isAuth() && isAuth().role === "subscriber")
            history.push("/subscriber")
            else  history.push("/login")
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  const handleClick= (e)=>{
    history.push("/")
  }
  return (
    <div className="h-full bg-gray-100 text-gray-900">
      {isAuth() && isAuth().role==="admin" ? <Redirect to="/admin" /> : null}
      {isAuth() && isAuth().role==="subscriber" ? <Redirect to="/subscriber" /> : null}
      {isAuth() && isAuth().role==="owner" ? <Redirect to="/owner" /> : null}

      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-2 ">
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="2rem" 
              height="2rem"
              onClick={handleClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

           
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In for HawasBia
            </h1>
            <div className=" mt-2 text-indigo-500">
              <div className="flex flex-col ">
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      <div className="rounded-full">
                        <i className="fab fa-google " />
                      </div>
                      <span className="ml-1">Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                    >
                      <div className=" p-2 rounded-full ">
                        <i className="fab fa-facebook" />
                      </div>
                      <span className="ml-4">Sign In with Facebook</span>
                    </button>
                  )}
                />

                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  href="/register"
                  target="_self"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign Up</span>
                </a>
              </div>
              <div className="my-6 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
                <div className="flex flex-col mb-5 ">
                  <Link
                    to="/users/password/forget"
                    className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                  >
                    Forget password?
                  </Link>
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="mt-5 pt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6-ml-2" />
                    <span className="ml-3">Sign In</span>
                  </button>
                </div>
                <div className="flex flex-col ">
                  <Link
                    to="/register"
                    className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                  >
                    Registre
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className=" xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Login;
