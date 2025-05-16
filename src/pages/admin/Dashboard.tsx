import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import {
  RiAddLine,
  RiCalendarLine,
  RiEmotionUnhappyLine,
  RiFilePdf2Line,
  RiUploadCloud2Line,
  RiUser4Line,
} from "react-icons/ri";
import { useNews } from "../../providers/NewsProvider";
import { useUpdates } from "../../providers/UpdatesProvider";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [barangayId, setBarangayId] = useState("");
  const [name, setName] = useState("");
  const { recentNews, getRecentNews } = useNews();
  const { recentUpdates, getRecentUpdates } = useUpdates();
  const navigate = useNavigate();

  // data
  const [users, setUsers] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [indigencyCount, setIndigencyCount] = useState(0);
  const [clearanceCount, setClearanceCount] = useState(0);
  const [residencyCount, setResidencyCount] = useState(0);
  const [jobseekerCount, setJobseekerCount] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        setBarangayId(currUser.barangayId);
        setName(`${currUser.firstName} ${currUser.lastName}`);
        await getRecentNews(currUser.barangayId, 5);
        await getRecentUpdates(currUser.barangayId, 5);

        try {
          let url = `http://localhost:8080/api/barangays/reports/${currUser.barangayId}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setUsers(response.data.data.users ? response.data.data.users : 0);
            setPending(
              response.data.data.requests.statusCounts.pending
                ? response.data.data.requests.statusCounts.pending
                : 0
            );
            setCompleted(
              response.data.data.requests.statusCounts.completed
                ? response.data.data.requests.statusCounts.completed
                : 0
            );
            setGraphData(response.data.data.requests.typeDistribution);

            const clearanceData =
              response.data.data.requests.typeDistribution.find(
                (item: any) => item.type === "barangay-clearance"
              );

            const indigencyData =
              response.data.data.requests.typeDistribution.find(
                (item: any) => item.type === "barangay-indigency"
              );

            const jobseekerData =
              response.data.data.requests.typeDistribution.find(
                (item: any) => item.type === "first-time-job-seeker"
              );

            const residencyData =
              response.data.data.requests.typeDistribution.find(
                (item: any) => item.type === "certificate-of-residency"
              );

            setClearanceCount(clearanceData ? clearanceData.count : 0);
            setIndigencyCount(indigencyData ? indigencyData.count : 0);
            setJobseekerCount(jobseekerData ? jobseekerData.count : 0);
            setResidencyCount(residencyData ? residencyData.count : 0);
          }
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row items-center justify-start">
            <p className="text-md font-semibold capitalize">{`Welcome Back Admin ${name}! `}</p>
          </div>
          {/* top */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-gray-200 p-6 rounded-2xl gap-12">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <RiUser4Line size={24} color="black" />
                <p className="text-xs font-normal">Total Users</p>
              </div>
              <div className="w-full flex items-center justify-start">
                <p className="text-xl font-semibold text-green-700">{users}</p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-gray-200 p-6 rounded-2xl gap-12">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <RiFilePdf2Line size={24} color="black" />
                <p className="text-xs font-normal">Pending Requests</p>
              </div>
              <div className="w-full flex items-center justify-start">
                <p className="text-xl font-semibold text-green-700">
                  {pending}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-gray-200 p-6 rounded-2xl gap-12">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <RiFilePdf2Line size={24} color="black" />
                <p className="text-xs font-normal">Completed Documents</p>
              </div>
              <div className="w-full flex items-center justify-start">
                <p className="text-xl font-semibold text-green-700">
                  {completed}
                </p>
              </div>
            </div>
          </div>
          {/* mid */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            {/* news */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-start p-6 rounded-2xl bg-gray-200 gap-6">
              <div className="w-full flex items-center justify-start">
                <p className="text-xs font-normal">Recent News</p>
              </div>
              {recentNews.length > 0 ? (
                recentNews.map((news: any) => (
                  <div
                    className="w-full flex flex-col items-start justify-center gap-2 cursor-pointer border-b border-black/5 p-3"
                    key={news._id}
                    onClick={() =>
                      navigate("/admin/news/edit", { state: news._id })
                    }
                  >
                    <p className="text-xs font-normal">{news.title}</p>
                    <div className="w-full flex flex-row items-center justify-start gap-2">
                      <RiCalendarLine size={16} color="black" />
                      <p className="text-xs font-normal">
                        {new Date(news.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-row items-center justify-center h-[20vh]">
                  <div className="flex flex-col items-center justify-center text-green-700 gap-4">
                    <RiEmotionUnhappyLine size={46} />
                    <p className="text-xs font-semibold">Nothing to show</p>
                  </div>
                </div>
              )}
            </div>
            {/* updates */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-start p-6 rounded-2xl bg-gray-200 gap-6">
              <div className="w-full flex items-center justify-start">
                <p className="text-xs font-normal">Recent Updates</p>
              </div>
              {recentUpdates.length > 0 ? (
                recentUpdates.map((updates: any) => (
                  <div
                    className="w-full flex flex-col items-start justify-center gap-2 cursor-pointer border-b border-black/5 p-3"
                    key={updates._id}
                    onClick={() =>
                      navigate("/admin/transparency/updates/edit", {
                        state: updates._id,
                      })
                    }
                  >
                    <p className="text-xs font-normal">{updates.title}</p>
                    <div className="w-full flex flex-row items-center justify-start gap-2">
                      <RiCalendarLine size={16} color="black" />
                      <p className="text-xs font-normal">
                        {new Date(updates.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-row items-center justify-center h-[20vh]">
                  <div className="flex flex-col items-center justify-center text-green-700 gap-4">
                    <RiEmotionUnhappyLine size={46} />
                    <p className="text-xs font-semibold">Nothing to show</p>
                  </div>
                </div>
              )}
            </div>
            {/* calendar */}
            <div className="w-full lg:w-1/3 flex items-center justify-center">
              <Calendar />
            </div>
          </div>
          {/* quick buttons */}
          <div className="w-full flex flex-row items-center justify-start gap-4">
            <button
              className="flex flex-row gap-2 items-center justify-centers p-3 rounded-xl bg-green-700 text-xs font-normal text-white"
              onClick={() => navigate("/admin/news/add")}
            >
              <RiAddLine size={24} />
              <p>Add News/Announcements</p>
            </button>
            <button
              className="flex flex-row gap-2 items-center justify-centers p-3 rounded-xl bg-green-700 text-xs font-normal text-white"
              onClick={() => navigate("/admin/transparency/updates/add")}
            >
              <RiUploadCloud2Line size={24} />
              <p>Upload Updates</p>
            </button>
          </div>
          {/* summary */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {/* chart */}
            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">
                Document Distribution Overview
              </p>
              <p className="text-xs font-normal">
                overview of requested barangay documents
              </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
              <div className="w-full lg:w-1/2 h-[40vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={graphData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-1/2 grid grid-cols-2 items-start justify-start gap-4">
                {/* clearance */}
                <div className="w-full flex flex-col items-start justify-center gap-6 p-6 rounded-xl bg-gray-200">
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <RiFilePdf2Line size={24} />
                    <p className="text-xs font-normal">Barangay Clearance</p>
                  </div>
                  <p className="text-md font-semibold text-green-700">
                    {clearanceCount}
                  </p>
                </div>
                {/* indigency */}
                <div className="w-full flex flex-col items-start justify-center gap-6 p-6 rounded-xl bg-gray-200">
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <RiFilePdf2Line size={24} />
                    <p className="text-xs font-normal">Barangay Indigency</p>
                  </div>
                  <p className="text-md font-semibold text-green-700">
                    {indigencyCount}
                  </p>
                </div>
                {/* residency */}
                <div className="w-full flex flex-col items-start justify-center gap-6 p-6 rounded-xl bg-gray-200">
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <RiFilePdf2Line size={24} />
                    <p className="text-xs font-normal">
                      Certificate of Residency
                    </p>
                  </div>
                  <p className="text-md font-semibold text-green-700">
                    {residencyCount}
                  </p>
                </div>
                {/* jobseeker */}
                <div className="w-full flex flex-col items-start justify-center gap-6 p-6 rounded-xl bg-gray-200">
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <RiFilePdf2Line size={24} />
                    <p className="text-xs font-normal">First Time Job Seeker</p>
                  </div>
                  <p className="text-md font-semibold text-green-700">
                    {jobseekerCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
