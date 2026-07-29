import { useI18n } from "../hooks/useI18n";
import { Link } from "react-router-dom";

function MultipleSection() {
  const { t } = useI18n();

  const cards = [
    { to: "/students", icon: "👨‍🎓", label: t("studentList") },
    { to: "/teachers", icon: "👨‍🏫", label: t("ourTeachersCard") },
    { to: "/verify-certificate", icon: "📄", label: t("verifyCertificate") },
    { to: "/attendance", icon: "✅", label: t("attendance") },
    { to: "/results", icon: "⚡", label: t("result") },
    { to: "/exam-schedule", icon: "📅", label: t("examSchedule") },
    { to: "/news", icon: "📰", label: t("news") },
    { to: "/routine", icon: "🕒", label: t("routine") },
    { to: "/gallery", icon: "🖼️", label: t("galleryCard") },
  ];

  return (
    <section className="rounded-2xl bg-gray-100 py-6 sm:py-10">
      <div className="mx-auto flex max-w-7xl justify-center px-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group flex min-h-[100px] items-center justify-center rounded-lg bg-[#0B0D91] px-2 py-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-[#0B0D91] transition group-hover:bg-red-600 group-hover:text-white">
                    {card.icon}
                  </div>
                  <h3 className="mt-1.5 text-xs font-semibold text-white">{card.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultipleSection;
