import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(percent);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    return () =>
      window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div className="scroll-progress-bg"></div>

      <div
        className="scroll-progress-bar"
        style={{
          width: `${progress}%`,
        }}
      >
        <div className="scroll-progress-glow"></div>
      </div>
    </>
  );
};

export default ScrollProgress;