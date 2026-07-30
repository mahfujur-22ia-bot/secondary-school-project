import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { fetchAllNotices } from "../api/noticeapi";

const NoticeBoard = ({ limit }) => {
  const { t } = useI18n();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchAllNotices();
        setNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <section
      id="notice"
      className="card-premium bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden scroll-mt-32 animate__animated animate__fadeIn"
      data-aos="fade-right"
    >
      {/* Header */}
      <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="relative inline-flex">
            <i className="fas fa-bell animate-bounce"></i>
            <span className="badge-ping absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-300"></span>
          </span>
          {t("noticeTitle")}
        </h3>

        <a
          href="/news"
          className="btn-animated text-xs bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded-full font-semibold"
        >
          {t("viewAll")}
        </a>
      </div>

      {/* Notice List */}
      <div className="p-4 divide-y divide-gray-100">
        {loading ? (
          <div className="py-6 text-center text-gray-500">
            {t("loadingNotices")}
          </div>
        ) : notices.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            {t("noNotices")}
          </div>
        ) : (
          (limit ? notices.slice(0, limit) : notices).map((notice, index) => (
            <div
              key={notice.id}
              className="py-3 first:pt-0 last:pb-0 hover:bg-gray-50 px-2 rounded-lg transition-all hover:translate-x-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-gray-500 bg-gray-100">
                <i className="far fa-calendar-alt mr-1"></i>
                {new Date(notice.created_at).toLocaleDateString("en-BD", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              {notice.file ? (
                <a
                  href={notice.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold mt-2 leading-relaxed hover:text-green-700 text-gray-700"
                >
                  {notice.title}
                </a>
              ) : (
                <p className="block text-sm font-semibold mt-2 leading-relaxed text-gray-700">
                  {notice.title}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default NoticeBoard;
