import React, { useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import { RiCalendarLine, RiEmotionUnhappyLine } from "react-icons/ri";
import { useNews } from "../../providers/NewsProvider";
import { useNavigate } from "react-router-dom";

const News = () => {
  const { recentNews, getRecentNews } = useNews();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const user = localStorage.getItem("user");

      if (user) {
        const currUser = JSON.parse(user);

        if (currUser) {
          try {
            await getRecentNews(currUser.barangayId, 3);
          } catch (error: any) {
            console.log(error.response.data);
          }
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
          {/* title */}
          <div className="w-full flex flex-col items-start justify-center">
            <p className="text-sm font-semibold">News and Announcements</p>
            <p className="text-xs font-normal">
              latest news and annoucements for your barangay
            </p>
          </div>
          {/* recent news */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            {recentNews.length > 0 ? (
              recentNews.map((recentNews: any) => (
                <div
                  className="w-full bg-gray-200 h-[320px] lg:h-[620px] rounded-xl flex items-end justify-center overflow-hidden cursor-pointer bg-cover bg-center"
                  onClick={() =>
                    navigate("/user/news/view", { state: recentNews._id })
                  }
                  style={{
                    backgroundImage:
                      recentNews.image !== "N/A"
                        ? `url(http://localhost:8080/api/images/${encodeURIComponent(
                            recentNews.image
                          )})`
                        : "",
                  }}
                  key={recentNews._id}
                >
                  <div className="w-full h-full bg-gradient-to-t from-black/60 to-black/0 flex flex-col items-start justify-end p-6 text-white">
                    <p className="w-full truncate text-sm font-semibold">
                      {recentNews.title}
                    </p>
                    <p className="line-clamp-3 text-xs font-normal">
                      {recentNews.contents}
                    </p>

                    <div className="w-full flex flex-row items-center justify-start pt-4 gap-2">
                      <RiCalendarLine size={16} />
                      <p className="text-xs font-normal">
                        {new Date(recentNews.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
                    No News and Announcements Found
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* button */}
          {recentNews.length > 0 ? (
            <div className="w-full flex flex-row items-center justify-end">
              <div
                className="p-3 rounded-xl bg-green-700 text-xs font-normal text-white cursor-pointer"
                onClick={() => navigate("/user/news/all")}
              >
                View All
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full h-[10vh] lg:hidden"></div>
      </div>
    </>
  );
};

export default News;
