import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiCheckFill, RiCloseFill, RiCloseLine } from "react-icons/ri";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const UserApproval = ({
  onClose,
  userId,
}: {
  onClose: () => void;
  userId: string;
}) => {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [modal, showModal] = useState(false);
  const navigate = useNavigate();

  const declineUser = async () => {
    try {
      let url = `http://localhost:8080/api/users/${userId}`;

      const formData = new FormData();
      back && formData.append("back", back);
      front && formData.append("front", front);
      formData.append("status", "inactive");
      profile && formData.append("profile", profile);

      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success === true) {
        showModal(true);
        setError(false);
        setMessage("Status successfully updated!");
      }
    } catch (error: any) {
      setError(true);
      setMessage("An error occurred, please try again later");
      showModal(true);
    }
  };

  const approveUser = async () => {
    try {
      let url = `http://localhost:8080/api/users/${userId}`;

      const formData = new FormData();
      back && formData.append("back", back);
      front && formData.append("front", front);
      formData.append("status", "active");
      profile && formData.append("profile", profile);

      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success === true) {
        showModal(true);
        setError(false);
        setMessage("Status successfully updated!");
      }
    } catch (error: any) {
      setError(true);
      setMessage("An error occurred, please try again later");
      showModal(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          let url = `http://localhost:8080/api/users/${userId}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setBack(response.data.data.validId.back);
            setFront(response.data.data.validId.front);
            setProfile(response.data.data.profile);
            setName(
              `${response.data.data.firstName} ${response.data.data.lastName}`
            );
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 bg-black/20 w-full h-screen flex flex-col items-center justify-start p-6 overflow-y-auto">
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-2xl flex flex-col items-center justify-center gap-6">
          {/* top */}
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-xs font-semibold w-1/2 text-left truncate">
              {`${name}'s ID Card:`}
            </p>
            <RiCloseLine
              size={16}
              color="black"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          {/* id */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div
              className="w-full h-[220px] lg:h-[320px] flex items-center justify-center bg-gray-200 rounded-xl overflow-hidden"
              style={{
                backgroundImage: front
                  ? `url("http://localhost:8080/api/images/${front}")`
                  : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="w-full h-[220px] lg:h-[320px] flex items-center justify-center bg-gray-200 rounded-xl overflow-hidden"
              style={{
                backgroundImage: back
                  ? `url("http://localhost:8080/api/images/${back}")`
                  : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          {/* guidelines */}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="text-xs font-semibold">
                Guideline for Identity Verification:
              </p>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <div className="w-full flex flex-row items-center justify-start gap-2">
                  <div className="p-1 rounded-full bg-green-700">
                    <RiCheckFill size={16} color="white" />
                  </div>
                  <p className="text-xs font-normal">Government issued</p>
                </div>
                <div className="w-full flex flex-row items-center justify-start gap-2">
                  <div className="p-1 rounded-full bg-green-700">
                    <RiCheckFill size={16} color="white" />
                  </div>
                  <p className="text-xs font-normal">Original and unedited</p>
                </div>
                <div className="w-full flex flex-row items-center justify-start gap-2">
                  <div className="p-1 rounded-full bg-green-700">
                    <RiCheckFill size={16} color="white" />
                  </div>
                  <p className="text-xs font-normal">
                    Readable, well-lit and coloured
                  </p>
                </div>

                <div className="w-full flex flex-row items-center justify-start  gap-2">
                  <div className="p-1 rounded-full bg-red-700">
                    <RiCloseFill size={16} color="white" />
                  </div>
                  <p className="text-xs font-normal">
                    No blurred or cut images
                  </p>
                </div>
                <div className="w-full flex flex-row items-center justify-start  gap-2">
                  <div className="p-1 rounded-full bg-red-700">
                    <RiCloseFill size={16} color="white" />
                  </div>
                  <p className="text-xs font-normal">
                    No black or white images
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="w-full flex flex-row items-center justify-end gap-2">
            <div
              className="p-2 rounded-xl bg-green-700 text-xs font-normal text-white cursor-pointer"
              onClick={approveUser}
            >
              Approve
            </div>
            <div
              className="p-2 rounded-xl bg-red-700 text-xs font-normal text-white cursor-pointer"
              onClick={declineUser}
            >
              Decline
            </div>
          </div>
        </div>
        <div className="w-full min-h-[10vh]"></div>
      </div>
      {modal && (
        <Modal
          error={error}
          message={message}
          onClose={() => {
            showModal(false);
            if (!error) {
              onClose();
              navigate("/admin/users");
            }
          }}
        />
      )}
    </>
  );
};

export default UserApproval;
