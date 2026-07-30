import { useEffect, useState } from "react";
import { fetchAllNotices } from "../api/noticeapi";

const News = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotices() {
      try {
        const data = await fetchAllNotices();
        setNotices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
        setError("নোটিশ লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8 scroll-mt-32">
      <div
        className="card-premium bg-white p-6 md:p-8 rounded-2xl card-shadow border border-gray-100"
        data-aos="fade-up"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              সাম্প্রতিক সংবাদ ও নোটিশ
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              স্কুল সম্পর্কিত সর্বশেষ আপডেট, নোটিশ ও গুরুত্বপূর্ণ তথ্য একসাথে দেখুন।
            </p>
          </div>

          <a
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors shrink-0"
          >
            হোমে ফিরুন
            <i className="fas fa-arrow-left"></i>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            নোটিশ লোড হচ্ছে...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            কোনো নোটিশ পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {notices.map((notice, index) => (
              <div
                key={notice.id}
                className="card-premium bg-gray-50 rounded-2xl p-5 border border-gray-100 card-shadow transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-xl">
                    <i className="fas fa-bullhorn"></i>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-gray-600 bg-white border border-gray-200">
                        <i className="far fa-calendar-alt mr-1"></i>
                        {notice.created_at || "নির্ধারিত নয়"}
                      </span>
                      {notice.expiry_date && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-amber-700 bg-amber-50">
                          শেষ তারিখ: {notice.expiry_date}
                        </span>
                      )}
                    </div>

                    {notice.file ? (
                      <a
                        href={notice.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-gray-800 hover:text-red-700 transition-colors leading-relaxed"
                      >
                        {notice.title}
                      </a>
                    ) : (
                      <h4 className="text-base font-semibold text-gray-800 leading-relaxed">
                        {notice.title}
                      </h4>
                    )}

                    {notice.slug && (
                      <p className="text-sm text-gray-500 mt-2">Slug: {notice.slug}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
