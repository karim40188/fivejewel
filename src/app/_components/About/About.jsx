import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

function About() {
  const t = useTranslations();

  return (
    <div id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* الصورة مع Animation */}
          <div className="relative overflow-hidden rounded-lg drop-shadow-sm transform transition-all duration-500 hover:scale-105">
            <Image
              alt="about-img"
              src="/assets/7.png"
              width={900}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>

          {/* النص والأزرار */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="animate-fade-in-up">
              <h2 className="text-main text-xl font-semibold mb-3 dark:text-[#FFCA41]">
                {t("about_us")}
              </h2>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {t("about_us_title")}
              </h3>
            </div>

            <p className="text-secondary text-lg leading-relaxed animate-fade-in-up delay-100 dark:text-gray-300">
              {t("about_us_description")}
            </p>

            <button
              className="flex bg-main text-white px-6 py-3 rounded-lg  hover:bg-[#FFCA41] hover:text-white transition-all duration-300 ease-in-out text-lg font-semibold w-[200px] justify-center items-center 
              animate-fade-in-up delay-200 dark:bg-gray-800
               dark:text-white dark:hover:bg-[#FFCA41] dark:hover:text-white"
            >
              {t("read_more")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
