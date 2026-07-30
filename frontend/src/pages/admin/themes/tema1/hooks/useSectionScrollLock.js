import { useState, useEffect } from "react";

/**
 * Hook untuk mengunci scroll di section-1 sampai user benar-benar
 * scroll ke section-2, lalu snap otomatis kalau scroll kurang dari triggerPoint.
 */
export function useSectionScrollLock() {
  const [isSlide2, setIsSlide2] = useState(false);
  const [lockSection1, setLockSection1] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;

      if (window.scrollY >= triggerPoint) {
        setIsSlide2(true);
        setLockSection1(true);
      } else {
        setIsSlide2(false);
      }

      if (lockSection1 && window.scrollY < triggerPoint) {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lockSection1]);

  return { isSlide2 };
}
