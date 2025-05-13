import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { RiCheckLine, RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onLogin = async () => {
    if (email && password) {
      try {
        let url = "http://localhost:8080/api/users/login";

        let response = await axios.post(url, {
          email: email,
          password: password,
        });

        if (response.data.success === true) {
          if (response.data.data.status === "active") {
            if (response.data.data.role === "user") {
              navigate("/user/home");
            } else if (response.data.data.role === "admin") {
              navigate("/admin/dashboard");
            }
            if (remember) {
              localStorage.setItem("user", JSON.stringify(response.data.data));
            }
          } else {
            setShowModal(true);
            setError(true);
            setMessage(
              "Account Pending! Please wait for admins to approve your account"
            );
          }
        }
      } catch (error: any) {
        setShowModal(true);
        setError(true);
        setMessage("An error occurred, please try again after a second!");
      }
    } else {
      setShowModal(true);
      setError(true);
      setMessage("Missing required Fields!");
    }
  };

  return (
    <>
      <div className="w-full flex h-screen items-center justify-center bg-[#008A3D]">
        <div className="w-[320px] lg:w-1/4 flex flex-col items-center justify-center bg-white p-8 rounded-2xl gap-6">
          {/* title */}
          <div className="w-full flex flex-col items-center justify-center">
            <img src={Logo} alt="/" className="w-[60px]" />
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold text-[#008A3D]">BRGY 360</p>
              <p className="text-xs font-normal">Login to your account</p>
            </div>
          </div>
          {/* fields */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {/* email */}
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Email</p>
              <input
                type="text"
                className="text-xs font-normal outline-none border border-[#008A3D] p-3 w-full rounded-xl bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
              />
            </div>
            {/* password */}
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Password</p>
              <div className="w-full flex flex-row relative items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="text-xs font-normal outline-none border border-[#008A3D] p-3 w-full rounded-xl bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password"
                />
                {showPassword ? (
                  <RiEyeLine
                    className="absolute right-4 cursor-pointer"
                    size={12}
                    color="black"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="absolute right-4 cursor-pointer"
                    size={12}
                    color="black"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </div>
          {/* misc */}
          <div className="w-full flex flex-row items-center">
            <div className="w-1/2 flex flex-row items-center justify-start gap-2">
              {remember ? (
                <div
                  className="w-3 h-3 rounded-sm outline outline-[#008A3D] bg-[#008A3D] cursor-pointer"
                  onClick={() => setRemember(!remember)}
                >
                  <RiCheckLine size={12} color="white" />
                </div>
              ) : (
                <div
                  className="w-3 h-3 rounded-sm outline outline-[#008A3D] cursor-pointer"
                  onClick={() => {
                    setRemember(!remember);
                  }}
                ></div>
              )}
              <p className="text-xs font-normal">Remember me</p>
            </div>
          </div>
          {/* button */}
          <div
            className="w-full flex items-center justify-center bg-[#008A3D] py-3 rounded-xl text-white text-xs font-normal cursor-pointer"
            onClick={onLogin}
          >
            Login Now
          </div>
          {/* redirect */}
          <p className="w-full flex flex-row items-center justify-center gap-1 text-xs font-normal whitespace-nowrap">
            Sign up as
            <span
              className="cursor-pointer text-[#008A3D]"
              onClick={() => navigate("/register/admin")}
            >
              Admin
            </span>
            <span className="">or</span>
            <span
              className="cursor-pointer text-[#008A3D]"
              onClick={() => navigate("/register/user")}
            >
              User
            </span>
          </p>
        </div>
      </div>
      {showModal && (
        <Modal
          error={error}
          message={message}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default Login;
