import { useI18n } from "../hooks/useI18n";

const TopBar = () => {
  const { t, changeLanguage, language } = useI18n();

  return (
    <div
      id="top-bar"
      className="fixed top-0 left-0 right-0 z-50 h-10 bg-green-700 text-white text-xs sm:text-sm"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-3">
        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          <span className="hidden sm:flex items-center gap-1">
            <i className="fas fa-code-branch"></i>
            {t("topBarEiin")}
          </span>

          <span className="flex items-center gap-1 truncate">
            <i className="fas fa-map-marker-alt"></i>
            <span className="truncate">{t("topBarLocation")}</span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#"
            className="hidden sm:flex items-center gap-1 hover:underline"
          >
            <i className="fas fa-phone"></i>
            {t("helpLine")}
          </a>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-1 hover:underline"
          >
            <i className="fas fa-envelope"></i>
            {t("contact")}
          </a>

          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-0.5">
            <span className="hidden sm:block text-[10px] text-white/70">
              {t("language")}:
            </span>

            <button
              onClick={() => changeLanguage("bn")}
              className={`text-xs font-semibold ${
                language === "bn"
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`}
            >
              বাংলা
            </button>

            <span>|</span>

            <button
              onClick={() => changeLanguage("en")}
              className={`text-xs font-semibold ${
                language === "en"
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;