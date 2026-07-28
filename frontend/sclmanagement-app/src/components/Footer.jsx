import { useI18n } from "../hooks/useI18n";

const Footer = () => {
  const { t } = useI18n();

  const socialLinks = [
    {
      icon: "fab fa-facebook-f",
      href: "#",
      label: "Facebook",
    },
    {
      icon: "fab fa-youtube",
      href: "#",
      label: "YouTube",
    },
    {
      icon: "fas fa-phone",
      href: "tel:#",
      label: "Phone",
    },
    {
      icon: "fas fa-envelope",
      href: "#contact",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-gray-900 border-t-4 border-green-700 py-6 px-4">
      <div
        className="container mx-auto text-center space-y-4"
        data-aos="fade-up"
      >
        {/* Social Icons */}
        <div className="flex justify-center gap-3">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              aria-label={item.label}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              <i className={item.icon}></i>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-white text-sm md:text-base font-semibold">
          {t("footerText")}
        </p>

        {/* Developer */}
        <div className="flex justify-center">
          <a
            href="https://www.facebook.com/profile.php?id=61585937196902"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="flex items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 shadow-lg hover:border-green-500 hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-laptop-code text-white text-lg"></i>
              </div>

              {/* Text */}
              <div className="text-left">
                <span className="inline-block px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] uppercase tracking-[2px] font-semibold">
                  Developed By
                </span>

                <h3 className="mt-1 text-lg md:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  MD. MAHFUJUR RAHMAN
                </h3>

                <p className="text-xs text-gray-400 tracking-wide">
                  Full Stack Developer
                </p>
              </div>

              {/* Arrow */}
              <i className="fas fa-arrow-up-right-from-square text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></i>

            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;