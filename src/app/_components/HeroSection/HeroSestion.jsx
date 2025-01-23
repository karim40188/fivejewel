import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import Bubbles from "../Bubbles/Bubbles";
import Link from "next/link";
function HeroSection() {
  const t = useTranslations();
const locale= useLocale()
  return (
    <div
      id="home"
      className="relative bg-main dark:bg-gray-900 bg-no-repeat pt-20 pb-20 md:pb-40 h-auto md:h-[100vh] w-full overflow-hidden"
    >
      {/* فقاعات تتحرك */}
     <Bubbles/>

      {/* المنحنى في الأسفل */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full hidden md:block"
        >
          <path
            fill="#ffffff"
            d="M0,160L48,133.3C96,107,192,53,288,64C384,75,480,149,576,192C672,235,768,245,864,213.3C960,181,1056,107,1152,74.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto relative z-8">
        <div className="grid grid-cols-1 md:grid-cols-2 text-white gap-10 md:gap-0 items-center">
          {/* النص والأزرار */}
          <div className="flex flex-col gap-6 px-4 md:px-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white dark:text-gray-100">
              {t("hero_title")}
            </h1>
            <p className="text-lg md:text-xl my-4 text-gray-100 dark:text-gray-300">
              {t("hero_description")}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="#services">
              <button className="bg-white text-main dark:bg-gray-800 dark:text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#FFCA41] hover:text-white transition-all duration-300 ease-in-out text-lg font-semibold">
                {t("explore_services")}
              </button>
              </Link>
            {/* <Link href={`/${locale}/quick-order`}>
            <button className="bg-transparent border-2 border-white 
              text-white dark:border-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg shadow-lg hover:bg-white 
               dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-300 ease-in-out text-lg font-semibold hover:text-main">
                {t("order_now")}
              </button>
            </Link> */}
             
             
            </div>
          </div>

          {/* الصورة */}
          <div className="relative">
            <Image
              alt="banner-img"
              width={900}
              height={650}
              className="w-full h-auto object-cover rounded-lg "
              src={"/assets/hero_logo.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
