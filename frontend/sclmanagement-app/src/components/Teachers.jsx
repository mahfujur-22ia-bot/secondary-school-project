import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { fetchAllTeachers } from "../api/teacherApi";

const Teachers = ({ limit }) => {
  const { t } = useI18n();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const data = await fetchAllTeachers();
        setTeachers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTeachers();
  }, []);

  return (
    <section
      id="teachers"
      className="container mx-auto px-4 py-8 scroll-mt-32"
    >
      <div
        className="card-premium bg-white p-6 md:p-8 rounded-2xl card-shadow border border-gray-100"
        data-aos="fade-up"
      >
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {t("ourTeachers")}
            </h3>

            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {t("teachersDescription")}
            </p>
          </div>

          <a
            href="/teachers"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors shrink-0"
          >
            {t("viewTeachers")}
            <i className="fas fa-arrow-left"></i>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            {t("loadingTeachers")}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {t("noTeachers")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {(limit ? teachers.slice(0, limit) : teachers).map((teacher, index) => (
              <div
                key={teacher.id}
                className="card-premium bg-gray-50 rounded-2xl p-5 border border-gray-100 card-shadow transition-shadow animate__animated animate__fadeInUp"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="media-zoom w-28 h-36 rounded-xl border-4 border-green-100 shadow-inner overflow-hidden">
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-28 h-36 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="avatar-fallback w-full h-full  rounded-xl text-3xl">
                        {teacher.name}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h4 className="font-bold text-gray-800">
                      {teacher.name}
                    </h4>

                    <p className="text-sm font-semibold text-gray-500">
                      {teacher.designation}
                    </p>

                    <p className="text-sm font-semibold text-green-700 mt-1">
                      {teacher.department}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm font-semibold text-gray-600">
                  {teacher.email && (
                    <p>
                      <span className="font-semibold text-gray-800">
                        {t("emailLabel")} :
                      </span>{" "}
                      {teacher.email}
                    </p>
                  )}

                  {teacher.mobile && (
                    <p>
                      <span className="font-semibold text-gray-800">
                        {t("mobileLabel")} :
                      </span>{" "}
                      {teacher.mobile}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Teachers;