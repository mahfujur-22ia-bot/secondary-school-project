import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="উপরে যান"
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12
        rounded-full
        bg-green-700
        text-white
        shadow-lg
        hover:bg-green-800
        transition-all duration-300
        flex items-center justify-center
        ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;