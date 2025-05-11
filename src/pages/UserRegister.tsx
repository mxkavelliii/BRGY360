import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full flex h-screen items-center justify-center bg-[#008A3D]">
      <div className="w-[320px] lg:w-1/4 flex flex-col items-center justify-center bg-white p-8 rounded-2xl gap-6">
        {/* title */}
        <div className="w-full flex flex-col items-center justify-center">
          <img src={Logo} alt="/" className="w-[60px]" />
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-[#008A3D]">BRGY 360</p>
            <p className="text-xs font-normal">Sign up for an account</p>
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
          {/* confirm password */}
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="text-xs font-normal">Password</p>
            <div className="w-full flex flex-row relative items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="text-xs font-normal outline-none border border-[#008A3D] p-3 w-full rounded-xl bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="re-enter your password"
              />
              {showConfirmPassword ? (
                <RiEyeLine
                  className="absolute right-4 cursor-pointer"
                  size={12}
                  color="black"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <RiEyeCloseLine
                  className="absolute right-4 cursor-pointer"
                  size={12}
                  color="black"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
          </div>
        </div>

        {/* button */}
        <div className="w-full flex items-center justify-center bg-[#008A3D] py-3 rounded-xl text-white text-xs font-normal cursor-pointer">
          Sign Up
        </div>
        {/* redirect */}
        <p className="w-full flex flex-row items-center justify-center gap-1 text-xs font-normal whitespace-nowrap">
          <span
            className="cursor-pointer text-[#008A3D]"
            onClick={() => navigate("/")}
          >
            Login
          </span>
          <span className="">or Sign up as</span>
          <span
            className="cursor-pointer text-[#008A3D]"
            onClick={() => navigate("/register/admin")}
          >
            Admin
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
