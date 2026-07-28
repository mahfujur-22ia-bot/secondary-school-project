import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { fetchAllAdministrations } from "../api/Administration";

const staticLeaders = [
  {
    id: 1,
    title: "শিক্ষা মন্ত্রী",
    name: "ডা. সি. আর. আবরার",
    designation: "শিক্ষা মন্ত্রী",
    image: null,
  },
  {
    id: 2,
    title: "সচিব",
    name: "নাম",
    designation: "সচিব",
    image: null,
  },
    {
    id: 3,
    title: "অধ্যক্ষ",
    name: "ডা. সি. আর. আবরার",
    designation: "অধ্যক্ষ",
    image: null,
  },
];

const Administration = () => {
  const { t } = useI18n();
  const [administration, setAdministration] = useState(null);

  useEffect(() => {
    async function loadAdministration() {
      const data = await fetchAllAdministrations();

      if (Array.isArray(data) && data.length > 0) {
        setAdministration(data[0]);
      }
    }

    loadAdministration();
  }, []);

  const leaders = [
    ...staticLeaders,
    ...(administration
      ? [
          {
            id: administration.id,
            title: t("principal"),
            name: administration.name,
            designation: administration.designation,
            image: administration.image,
          },
        ]
      : []),
  ];

  return (
    <section
      className="card-premium relative overflow-hidden bg-white rounded-2xl card-shadow border border-gray-100 p-5 space-y-10"
      data-aos="fade-left"
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-green-100/60 blur-2xl pointer-events-none"></div>

      <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
        <i className="fas fa-user-tie text-green-700"></i>
        {t("leadership")}
      </h3>

      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div
            key={leader.id}
            className="card-premium rounded-xl border border-gray-100 overflow-hidden"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="bg-green-700 text-white text-center py-2.5 font-bold text-sm">
              {leader.title}
            </div>

            <div className="p-5 text-center">
              <div
                className="media-zoom w-24 h-24 rounded-full mx-auto border-4 border-green-100 overflow-hidden"
                style={{
                  animationDelay: `${index * -2}s`,
                }}
              >
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="avatar-fallback w-full h-full rounded-full flex items-center justify-center text-2xl">
                    {leader.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="mt-3 font-bold text-gray-800">
                {leader.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {leader.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Administration;