import { useI18n } from "../hooks/useI18n";

const Hero = () => {
  const { t } = useI18n();

  return (
    <section
      className="relative overflow-hidden bg-gray-900 px-4 pb-16 pt-[140px] text-white md:pb-24 md:pt-[170px]"
      style={{
        backgroundImage: `url("/earpur_highscl.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating Blur Effects */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-green-700/20 blur-3xl animate-pulse pointer-events-none"></div>

      <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

      <div
        className="absolute left-8 bottom-10 h-20 w-20 rounded-full bg-red-500/20 blur-2xl pointer-events-none"
        style={{
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      <div
        className="absolute right-12 bottom-20 h-12 w-12 rounded-full bg-white/20 blur-xl pointer-events-none"
        style={{
          animation: "float 10s ease-in-out infinite",
        }}
      ></div>

      {/* Hero Content */}
      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          className="rounded-[30px] border border-white/25  bg-white/10 shadow-2xl text-center px-6 md:px-10 py-12 md:py-16 animate__animated animate__zoomIn"
          data-aos="zoom-in"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-lg"
            data-aos="fade-down"
          >
            <i className="fas fa-heart"></i>
            {t("welcome")}
          </span>

          {/* Heading */}
          <h2
            className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("heroHeading")} <br />
            <span className="text-yellow-300">
              {t("heroHighlight")}
            </span>
          </h2>

          {/* Description */}
          <p
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-gray-100"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            {t("heroDescription")}
          </p>

          {/* Buttons */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <a
              href="#notice"
              className="rounded-full bg-white px-7 py-3 font-semibold text-green-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-50"
            >
              <i className="fas fa-bullhorn mr-2 text-red-600"></i>
              {t("latestNotice")}
            </a>

            <a
              href="#about"
              className="rounded-full border border-white bg-white/10 px-7 py-3 font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              {t("learnMore")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;