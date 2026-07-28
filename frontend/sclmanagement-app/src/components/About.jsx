import { useI18n } from "../hooks/useI18n";

const About = () => {
  const { t } = useI18n();
  const departments = [
    {
      id: 1,
      icon: "fas fa-flask",
      title: t("departments.science"),
      description: t("departments.scienceDesc"),
      bg: "bg-green-50",
      border: "border-green-100",
      iconColor: "text-green-700",
    },
    {
      id: 2,
      icon: "fas fa-book",
      title: t("departments.humanities"),
      description: t("departments.humanitiesDesc"),
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconColor: "text-blue-700",
    },
    {
      id: 3,
      icon: "fas fa-chart-line",
      title: t("departments.business"),
      description: t("departments.businessDesc"),
      bg: "bg-purple-50",
      border: "border-purple-100",
      iconColor: "text-purple-700",
    },
  ];

  return (
    <section
      id="about"
      className="card-premium bg-white p-6 md:p-8 rounded-2xl card-shadow border border-gray-100 scroll-mt-32"
      data-aos="fade-right"
    >
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-green-600 flex items-center gap-2">
        <i className="fas fa-university text-green-700 icon-bounce"></i>
        {t("schoolIntro")}
      </h3>

      {/* Paragraph 1 */}
      <p
        className="text-gray-600 leading-relaxed mb-4 text-justify animate__animated animate__fadeIn"
        data-aos="fade-left"
        data-aos-delay="50"
      >
        {t("schoolIntroText1")}
      </p>

      {/* Paragraph 2 */}
      <p
        className="text-gray-600 leading-relaxed text-justify animate__animated animate__fadeIn"
        data-aos="fade-left"
        data-aos-delay="150"
      >
        {t("schoolIntroText2")}
      </p>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {departments.map((dept, index) => (
          <div
            key={dept.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className={`group ${dept.bg} p-5 rounded-xl border ${dept.border}
            text-center transition-all hover:-translate-y-1 hover:shadow-lg`}
          >
            <i
              className={`icon-bounce ${dept.icon} text-2xl ${dept.iconColor} mb-2`}
            ></i>

            <h4 className="font-bold text-gray-800 text-sm mb-1">
              {dept.title}
            </h4>

            <p className="text-xs text-gray-500 leading-relaxed">
              {dept.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;