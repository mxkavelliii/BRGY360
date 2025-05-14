import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminTransparency from "../../components/AdminTransparency";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransparencyDashboard = () => {
  const [barangayName, setBarangayName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const user = localStorage.getItem("user");

      if (user) {
        const currUser = JSON.parse(user);

        if (currUser) {
          try {
            let url = `http://localhost:8080/api/barangays/${currUser.barangayId}`;

            let response = await axios.get(url);

            if (response.data.success === true) {
              setBarangayName(response.data.data.barangayName);
            }
          } catch (error: any) {
            console.log(error);
          }
        }
      }
    };

    getData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          <AdminTransparency />
          <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-2">
            <p className="text-xl font-bold text-green-700 uppercase">
              {barangayName}
            </p>
            <p className="text-xs font-normal w-[80vw] lg:w-[50vw] text-center">
              One of the largest barangays in Olongapo City is committed to
              transparency, accountability, and community development. Through
              open governance, it ensures residents have access to essential
              information on projects, budget allocations, and accomplishments.
              Stay informed and engaged as the community works together toward a
              safer and more progressive future.
            </p>

            <div
              className="flex p-3 rounded-xl bg-green-700 text-white font-normal text-xs mt-6 cursor-pointer"
              onClick={() => navigate("/admin/transparency/updates")}
            >
              View More
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransparencyDashboard;
