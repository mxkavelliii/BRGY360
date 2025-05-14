import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../../../components/AdminNavbar";
import { RiAddLine, RiArrowLeftSLine } from "react-icons/ri";
import PostModa from "../../../components/PostModal";
import Modal from "../../../components/Modal";
import PostModal from "../../../components/PostModal";
import DeleteModal from "../../../components/DeleteModal";

const EditNews = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [postModal, showPostModal] = useState(false);
  const [modal, showModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const [deleteModal, showDeleteModal] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, [content]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Store the file itself
      setImageChanged(true);
    }
  };

  const updateNews = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currUser = JSON.parse(user);

      if (currUser) {
        try {
          let url = `http://localhost:8080/api/users/${currUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            const barangayId = response.data.data.barangayId;
            const currentDate = new Date().toISOString().split("T")[0];

            try {
              let url = `http://localhost:8080/api/news-announcements/${state}`;

              const formData = new FormData();
              formData.append("title", title);
              formData.append("contents", content);
              formData.append("barangayId", barangayId);
              formData.append("date", currentDate);

              if (!imageChanged) {
                let url = `http://localhost:8080/api/images/${encodeURIComponent(
                  image
                )}`;

                const response = await fetch(url);
                const blob = await response.blob();

                formData.append("image", blob, image);
              } else {
                image && formData.append("image", image);
              }

              const response = await axios.put(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              if (response.data.success === true) {
                showModal(true);
                setError(false);
                setMessage(response.data.message);
              }
            } catch (error: any) {
              setError(true);
              showModal(true);
              setMessage(error.response.data.message);
            }
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };

  const deleteNews = async () => {
    try {
      let url = `http://localhost:8080/api/news-announcements/${state}`;

      let response = await axios.delete(url);

      if (response.data.success === true) {
        setError(false);
        showModal(true);
        setMessage(response.data.message);
        navigate("/admin/news");
      }
    } catch (error: any) {
      setError(true);
      showModal(true);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let url = `http://localhost:8080/api/news-announcements/${state}`;

        let response = await axios.get(url);

        if ((response.data.success = true)) {
          setTitle(response.data.data.title);
          setContent(response.data.data.contents);
          setImage(response.data.data.image);
        }
      } catch (error: any) {
        console.log(error);
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
          {/* header */}
          <div className="w-full flex flex-row items-center justify-start gap-1">
            <RiArrowLeftSLine
              size={24}
              color="black"
              className="cursor-pointer"
              onClick={() => navigate("/admin/news")}
            />
            <p className="text-sm font-semibold text-green-700">
              News and Announcements
            </p>
          </div>
          {/* image */}
          <div className="w-full h-[240px] lg:h-[660px] bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden relative">
            {image && (
              <img
                src={
                  typeof image === "string"
                    ? `http://localhost:8080/api/images/${image}` // e.g., http://localhost:3000/uploads/${image}
                    : URL.createObjectURL(image)
                }
                alt="preview"
                className="h-full w-full object-cover object-center"
              />
            )}
            <label className="absolute bottom-4 right-4 p-3 rounded-xl bg-white cursor-pointer">
              <RiAddLine size={16} color="black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {/* text */}
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {/* title */}
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">News Title</p>
              <input
                type="text"
                placeholder="header or title"
                className="outline-none text-xs font-normal capitalize p-3 border border-green-700 rounded-xl w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* content */}
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">News Content</p>
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="outline-none w-full text-xs font-normal p-3 rounded-xl border border-green-700 resize-none overflow-hidden"
                placeholder="add contents for the news or announcement"
              ></textarea>
            </div>
          </div>
          {/* button */}
          <div className="w-full flex flex-row items-center justify-end gap-2">
            <div
              className="p-3 rounded-xl bg-red-700 text-white text-xs font-normal cursor-pointer"
              onClick={() => showDeleteModal(true)}
            >
              Delete News
            </div>
            <div
              className="p-3 rounded-xl bg-green-700 text-white text-xs font-normal cursor-pointer"
              onClick={() => showPostModal(true)}
            >
              Update News
            </div>
          </div>
        </div>
        <div className="w-full h-[10vh] lg:hidden"></div>
      </div>
      {deleteModal && (
        <DeleteModal
          onDelete={() => deleteNews()}
          onClose={() => showDeleteModal(false)}
        />
      )}
      {postModal && (
        <PostModal
          onClose={() => showPostModal(false)}
          onPost={() => updateNews()}
        />
      )}
      {modal && (
        <Modal
          message={message}
          error={error}
          onClose={() => {
            showModal(false);
            showPostModal(false);
            if (!error) {
              navigate("/admin/news");
            }
          }}
        />
      )}
    </>
  );
};

export default EditNews;
