import React from "react";
import Bubbles from "@/app/_components/Bubbles/Bubbles";
import { useTranslations } from "next-intl";
import Image from "next/image";

function AboutPage() {
  const t = useTranslations();
  return (
    <div className="relative">
      <Bubbles />
      <div id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* الصورة الأولى مع Animation */}
            <div className="relative overflow-hidden rounded-lg drop-shadow-sm transform transition-all duration-500 hover:scale-105">
              <Image
                alt="about-img"
                src="/assets/7.png"
                width={900}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>

            {/* النص الأول والأزرار */}
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
            </div>
          </div>

          {/* القسم الجديد */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* النص الجديد */}
            <div className="flex flex-col justify-center space-y-6 order-2 md:order-1">
              <div className="animate-fade-in-up">
                <h2 className="text-main text-xl font-semibold mb-3 dark:text-[#FFCA41]">
                  {t("additional_about_us")}
                </h2>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {t("additional_about_us_title")}
                </h3>
              </div>

              <p className="text-secondary text-lg leading-relaxed animate-fade-in-up delay-100 dark:text-gray-300">
                {t("additional_about_us_description")}
              </p>
            </div>

            {/* الصورة الجديدة مع Animation */}
            <div className="relative overflow-hidden rounded-lg drop-shadow-sm transform transition-all duration-500 hover:scale-105 order-1 md:order-2">
              <Image
                alt="additional-about-img"
                src="/assets/4.png"
                width={900}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
