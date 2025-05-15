import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import UserTransparency from "../../components/UserTransparency";
import { useUpdates } from "../../providers/UpdatesProvider";
import { useNavigate } from "react-router-dom";
import { RiCalendarLine, RiEmotionUnhappyLine } from "react-icons/ri";

const ProjectUpdates = () => {
  const { getUpdates, updates, totalPages, recentUpdates, getRecentUpdates } =
    useUpdates();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const getData = async () => {
      const user = localStorage.getItem("user");

      if (user) {
        const currUser = JSON.parse(user);

        if (currUser) {
          await getUpdates("", currUser.barangayId, page, limit);
          await getRecentUpdates(currUser.barangayId, 2);
        }
      }
    };

    getData();
  }, [page]);

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:flex w-[100px]"></div>
        <div className="w-full flex flex-col lg:flex-row items-start justify-center px-4 py-6 gap-6">
          <div className="w-full lg:w-3/4 flex flex-col items-center justify-center gap-6">
            <UserTransparency />
            <div className="w-full flex flex-col lg:flex-row gap-4">
              {recentUpdates.length > 0 ? (
                recentUpdates.map((recentUpdate: any) => (
                  <div
                    className="w-full bg-gray-200 h-[320px] lg:h-[620px] rounded-xl flex items-end justify-center overflow-hidden cursor-pointer bg-cover bg-center"
                    onClick={() =>
                      navigate("/user/transparency/updates/view", {
                        state: recentUpdate._id,
                      })
                    }
                    style={{
                      backgroundImage:
                        recentUpdate.image !== "N/A"
                          ? `url(http://localhost:8080/api/images/${encodeURIComponent(
                              recentUpdate.image
                            )})`
                          : "",
                    }}
                    key={recentUpdate._id}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-black/60 to-black/0 flex flex-col items-start justify-end p-6 text-white">
                      <p className="w-full truncate text-sm font-semibold">
                        {recentUpdate.title}
                      </p>
                      <p className="line-clamp-3 text-xs font-normal">
                        {recentUpdate.contents}
                      </p>

                      <div className="w-full flex flex-row items-center justify-start pt-4 gap-2">
                        <RiCalendarLine size={16} />
                        <p className="text-xs font-normal">
                          {new Date(recentUpdate.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-row items-center justify-center h-[80vh]">
                  <div className="flex flex-col items-center justify-center text-green-700 gap-4">
                    <RiEmotionUnhappyLine size={46} />
                    <p className="text-xs font-semibold">
                      No Project Updates Found
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/4 flex flex-col items-center justify-center gap-4">
            {/* header */}
            <div className="w-full flex items-center justify-start bg-green-700 p-3 text-sm font-normal text-white rounded-xl">
              More Updates
            </div>
            {/* news */}
            {updates.length > 0
              ? updates.map((update: any) => (
                  <div
                    className="w-full flex flex-col items-start justify-center p-3 gap-2 cursor-pointer border-b border-black/5"
                    onClick={() =>
                      navigate("/user/transparency/updates/view", {
                        state: update._id,
                      })
                    }
                    key={update._id}
                  >
                    <p className="text-xs font-semibold line-clamp-1 text-green-700">
                      {update.title}
                    </p>
                    <div className="w-full flex flex-row items-center justify-start text-green-700 gap-1">
                      <RiCalendarLine size={16} />
                      <p className="text-xs font-normal ">
                        {new Date(update.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              : null}
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
        </div>
      </div>
    </>
  );
};

export default ProjectUpdates;
