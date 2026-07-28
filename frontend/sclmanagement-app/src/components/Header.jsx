import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMobileMenu } from "../hooks/useMobileMenu";

const Header = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useMobileMenu();

  const scrollToSection = (id) => {
    setIsOpen(false);

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      const headerHeight =
        document.getElementById("site-header")?.offsetHeight || 100;

      const top =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        20;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const header = document.getElementById("site-header");

    const handleScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "home", label: t("home") },
    { id: "about", label: t("about") },
    { id: "notice", label: t("noticeBoard") },
    { id: "teachers", label: t("teachersPage") },
    { id: "gallery", label: t("gallery") },
    { id: "contact", label: t("contact") },
  ];

  return (
    <header
      id="site-header"
      className="fixed top-[40px] sm:top-[40px] z-40 w-full border-b-4 border-red-600 bg-white/90 backdrop-blur-xl shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* Logo */}
          <a
            href="/"
            onClick={() => scrollToSection("home")}
            className="flex flex-1 items-center gap-3 min-w-0"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-600 bg-green-100 text-2xl shadow-sm">
              🎓
            </div>

            <div className="min-w-0">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-green-800 leading-tight whitespace-nowrap">
                {t("schoolName")}
              </h1>

              <p className="text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                {t("schoolTagline")}
              </p>

              <p className="text-[11px] text-red-600 whitespace-nowrap">
                {t("schoolSubtitle")}
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1 xl:gap-4 flex-shrink-0">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-[14px] lg:text-[15px] font-semibold text-gray-700 transition-all duration-300 hover:bg-green-50 hover:text-green-700"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? t("closeMenu") : t("menu")}
            className="md:hidden flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
            <span>{t("menu")}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;