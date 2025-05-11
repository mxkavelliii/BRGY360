import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { RiAddLine, RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const AdminRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [barangay, setBarangay] = useState("");
  const [street, setStreet] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [idType, setIdType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-[#008A3D] py-6 overflow-auto">
      <div className="w-5/6 md:w-2/4 flex flex-col items-center justify-center gap-12 bg-white rounded-2xl p-6">
        {/* title */}
        <div className="w-full flex flex-row items-center justify-start gap-2">
          <img src={Logo} width={40} alt="/" />
          <p className="text-sm font-bold text-[#008A3D]">
            Create User Account
          </p>
        </div>
        {/* image */}
        <div className="w-full flex flex-row items-center justify-start gap-4">
          <div className="relative rounded-full">
            <div className="h-[120px] w-[120px] rounded-full bg-black"></div>
            <div className="absolute p-2 rounded-md bg-[#008A3D] right-1 bottom-1 cursor-pointer">
              <RiAddLine size={16} color="white" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {/* name */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">First Name</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Last Name</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          {/* mobile, email */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Mobile Number</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter mobile number"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setMobileNumber(value.slice(0, 11));
                }}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Email</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* address */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Barangay</p>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full p-3 rounded-xl outline-none border border-[#008A3D] text-xs font-normal"
              >
                <option value="" disabled>
                  Select an option
                </option>
              </select>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Street No.</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter street number"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
          {/* birthday, age, sex */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-2/4 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Birthday</p>
              <input
                type="date"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/4 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Age</p>
              <input
                type="text"
                className="outline-none border border-[#008A3D] p-3 rounded-xl text-xs font-normal w-full"
                placeholder="enter age"
                value={age}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setAge(value.slice(0, 2));
                }}
              />
            </div>
            <div className="w-full lg:w-1/4 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Sex</p>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full p-3 rounded-xl outline-none border border-[#008A3D] text-xs font-normal"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {/* passwords */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
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
            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Confirm Password</p>
              <div className="w-full flex flex-row relative items-center">
                <input
                  type={showRePassword ? "text" : "password"}
                  className="text-xs font-normal outline-none border border-[#008A3D] p-3 w-full rounded-xl bg-white"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="re-enter your password"
                />
                {showPassword ? (
                  <RiEyeLine
                    className="absolute right-4 cursor-pointer"
                    size={12}
                    color="black"
                    onClick={() => setShowRePassword(!showRePassword)}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="absolute right-4 cursor-pointer"
                    size={12}
                    color="black"
                    onClick={() => setShowRePassword(!showRePassword)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* id */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {/* id type */}
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="text-xs font-normal">Choose Valid ID</p>
            <select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="text-xs font-normal outline-none border border-[#008A3D] p-3 rounded-xl"
            >
              <option value="" disabled>
                Select ID
              </option>
              <option value="national-id">National ID </option>
            </select>
          </div>
          {/* image */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/2 bg-black/10 h-[220px] rounded-xl"></div>
            <div className="w-full lg:w-1/2 bg-black/10 h-[220px] rounded-xl"></div>
          </div>
        </div>
        {/* buttons */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="w-full lg:w-1/2 flex items-center justify-center truncate bg-black/10 p-3 rounded-xl text-xs font-normal cursor-pointer">
            Cancel
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center truncate bg-black p-3 rounded-xl text-xs font-normal text-white cursor-pointer">
            Create Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
