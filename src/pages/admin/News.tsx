import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import {
  RiCalendarLine,
  RiDeleteBin4Line,
  RiEditLine,
  RiEmotionUnhappyLine,
  RiSearchLine,
} from "react-icons/ri";
import { useNews } from "../../providers/NewsProvider";
import axios from "axios";
import DeleteModal from "../../components/DeleteModal";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const News = () => {
  const { news, getNews, totalPages } = useNews();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [barangayId, setBarangayId] = useState("");

  const [deleteModal, showDeleteModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedNews, setSelectedNews] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (page > totalPages && totalPages !== 0) {
      setPage(page - 1);
    }
  }, [page, totalPages]);

  const deleteNews = async (newsId: string) => {
    if (newsId) {
      try {
        let url = `http://localhost:8080/api/news-announcements/${newsId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setError(false);
          showModal(true);
          setMessage(response.data.message);
          getData();
        }
      } catch (error: any) {
        setError(true);
        showModal(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const getData = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        try {
          let url = `http://localhost:8080/api/users/${currUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setBarangayId(response.data.data.barangayId);
            await getNews(search, response.data.data.barangayId, page, limit);
          }
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [search, page, limit]);

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-sm font-semibold">News and Announcements</p>
            <p className="text-xs font-normal">
              manage news and announcements for your barangay
            </p>
          </div>
          {/* search and add */}
          <div className="w-full flex flex-row items-center justify-between">
            <div className="w-3/4 lg:w-2/4 relative flex items-center justify-center">
              <input
                type="text"
                className="outline-none border border-green-700 text-xs font-normal w-full pl-10 pr-3 py-3 rounded-xl"
                placeholder="search for news and announcements"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <RiSearchLine
                size={16}
                color="black"
                className="absolute left-4"
              />
            </div>
            <div
              className="flex items-center justify-center cursor-pointer text-xs font-normal text-white bg-green-700 p-3 rounded-xl"
              onClick={() => navigate("/admin/news/add")}
            >
              Add New
            </div>
          </div>
          {/* count */}
          <div className="w-full flex items-center justify-start">
            <p className="text-xs font-normal">Count: {news.length}</p>
          </div>
          {/* data */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {news.length > 0 ? (
              news.map((news: any) => (
                <div
                  className="w-full flex flex-col items-center justify-center p-6 rounded-xl shadow-xl shadow-black/10"
                  key={news._id}
                >
                  <div className="w-full flex-col flex lg:flex-row items-center justify-between">
                    <div className="w-full lg:w-2/3 flex flex-row items-center justify-start gap-2">
                      <div
                        className="w-[60px] h-[60px] rounded-full bg-gray-200 shrink-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            news.image !== "N/A"
                              ? `url(http://localhost:8080/api/images/${encodeURIComponent(
                                  news.image
                                )})`
                              : "",
                        }}
                      ></div>
                      <div className="flex flex-col items-start justify-center gap-2">
                        <p className="line-clamp-1 text-sm font-normal cursor-pointer">
                          {news.title}
                        </p>
                        <div className="w-full flex flex-row items-center justify-start gap-1">
                          <RiCalendarLine size={14} color="black" />
                          <p className="text-xs font-normal">
                            {new Date(news.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-row items-center justify-end gap-2">
                      <div
                        className="p-3 rounded-xl bg-green-700 text-white cursor-pointer"
                        onClick={() =>
                          navigate("/admin/news/edit", { state: news._id })
                        }
                      >
                        <RiEditLine size={16} />
                      </div>
                      <div
                        className="p-3 rounded-xl bg-red-700 text-white cursor-pointer"
                        onClick={() => {
                          showDeleteModal(true);
                          setSelectedNews(news._id);
                        }}
                      >
                        <RiDeleteBin4Line size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-row items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center justify-center text-green-700 gap-4">
                  <RiEmotionUnhappyLine size={46} />
                  <p className="text-xs font-semibold">No Results Found</p>
                </div>
              </div>
            )}
          </div>
          {/* pagination */}
          <div className="flex flex-row items-center justify-center space-x-4 py-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === page ||
                  pageNumber === page - 1 ||
                  pageNumber === page + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    page === pageNumber
                      ? "font-semibold text-sm text-green-700"
                      : "font-normal text-xs text-green-700"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full h-[10vh] lg:hidden"></div>
      </div>
      {deleteModal && (
        <DeleteModal
          onDelete={() => deleteNews(selectedNews)}
          onClose={() => showDeleteModal(false)}
        />
      )}
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showDeleteModal(false);
            showModal(false);
          }}
        />
      )}
    </>
  );
};

export default News;
