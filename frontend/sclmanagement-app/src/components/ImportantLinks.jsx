import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { fetchAllImportantLinks } from "../api/importantLinkApi";

const ImportantLinks = () => {
  const { t } = useI18n();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLinks() {
      try {
        const data = await fetchAllImportantLinks();
        setLinks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  return (
    <section
      className="card-premium bg-white p-5 rounded-2xl card-shadow border border-gray-100"
      data-aos="fade-left"
      data-aos-delay="100"
    >
      {/* Heading */}
      <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
        <i className="fas fa-link text-green-700"></i>
        {t("importantLinks")}
      </h3>

      {loading ? (
        <p className="text-sm text-gray-500 text-center py-4">
          {t("loadingLinks")}
        </p>
      ) : links.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          {t("noLinks")}
        </p>
      ) : (
        <ul className="space-y-1 text-sm font-semibold">
          {links.map((link, index) => (
            <li
              key={link.id}
              data-aos="fade-left"
              data-aos-delay={index * 80}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-600 hover:text-green-700 flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-chevron-right text-xs text-gray-400"></i>

                {link.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImportantLinks;