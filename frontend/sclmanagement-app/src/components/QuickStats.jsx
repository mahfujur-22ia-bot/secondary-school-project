import { useI18n } from "../hooks/useI18n";

const QuickStats = () => {
  const { t } = useI18n();
  const stats = [
    {
      number: "১০০০+",
      title: t("statistics.students"),
      delay: 0,
    },
    {
      number: "৩৫+",
      title: t("statistics.teachers"),
      delay: 100,
    },
    {
      number: "৩টি",
      title: t("statistics.departments"),
      delay: 200,
    },
    {
      number: "৯৮%",
      title: t("statistics.passRate"),
      delay: 300,
    },
  ];

  return (
    <section className="container mx-auto px-4  relative z-10 mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-100 soft-shadow">
        {stats.map((item, index) => (
          <div
            key={index}
            className="card-premium text-center px-4 py-6 rounded-2xl bg-white card-shadow transition-shadow"
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <p className="text-3xl font-bold text-green-700 mb-1">
              {item.number}
            </p>

            <p className="text-sm text-gray-500 font-semibold">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;