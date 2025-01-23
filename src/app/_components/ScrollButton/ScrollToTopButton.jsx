"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      // ظهور الزر عند التمرير للأسفل بمقدار 300 بكسل
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // إضافة مستمع الحدث عند التمرير
    window.addEventListener("scroll", handleScroll);

    // تنظيف مستمع الحدث عند تدمير المكون
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[100px] right-[30px] bg-[#FFCA41] text-white rounded-full p-3 cursor-pointer shadow-lg transition-all transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-20 scale-75"
      } ${isVisible ? "infinite-move" : ""}`}
      onClick={handleScrollToTop}
    >
      <FaArrowUp size={18} />
    </div>
  );
}

export default ScrollToTopButton;
