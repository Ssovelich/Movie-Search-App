import styles from "./ScrollToTopBtn.module.css";
import { useState, useEffect } from "react";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Відстеження прокрутки
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Прокрутка до верху сторінки
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollButton} ${isVisible ? styles.visible : ""}`}
    >
      Up
    </button>
  );
};

export default ScrollToTopBtn;
