import { useEffect } from "react";

const useBackToTop = () => {
  useEffect(() => {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    const handleScroll = () => {
      button.classList.toggle("show", window.scrollY > 400);
    };

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    button.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      button.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useBackToTop;