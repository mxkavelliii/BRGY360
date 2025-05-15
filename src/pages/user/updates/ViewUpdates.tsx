import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiCalendarLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../../../components/UserNavbar";

const ViewUpdates = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      if (state) {
        try {
          let url = `http://localhost:8080/api/projects/${state}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setData(response.data.data);
            console.log(response.data.data.image);
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
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center px-4 py-6 gap-6">
          {/* header */}
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <RiArrowLeftSLine
              size={24}
              color="black"
              className="cursor-pointer"
              onClick={() => navigate("/user/transparency/updates")}
            />
            <p className="text-sm font-semibold text-green-700">
              Project Updates
            </p>
          </div>
          {/* image */}
          <div
            className="w-full h-[220px] lg:h-[620px] bg-gray-200 rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                data.image !== "N/A"
                  ? `url(http://localhost:8080/api/images/${encodeURIComponent(
                      data.image
                    )})`
                  : "",
            }}
          ></div>
          {/* title */}
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="text-sm font-semibold text-green-700">{data.title}</p>
            <div className="w-full flex flex-row items-center justify-start gap-2 text-green-700">
              <RiCalendarLine size={16} />
              <p className="text-xs font-normal">
                {new Date(data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-start">
            <pre className="text-xs font-normal whitespace-pre-wrap break-words font-sans">
              {data.contents}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUpdates;
