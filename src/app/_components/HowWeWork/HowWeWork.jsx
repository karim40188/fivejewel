import Image from "next/image";
import React from "react";
import ScrollToTopButton from "../ScrollButton/ScrollToTopButton";
import { useTranslations } from "next-intl";

function HowWeWork() {
  const t = useTranslations();

  const steps = [
    {
      img: "/assets/work1.png",
      title: "call_us",
      desc: "call_us_desc",
    },
    {
      img: "/assets/work2.png",
      title: "we_collect",
      desc: "we_collect_desc",
    },
    {
      img: "/assets/work3.png",
      title: "we_clean",
      desc: "we_clean_desc",
    },
    {
      img: "/assets/work4.png",
      title: "we_deliver",
      desc: "we_deliver_desc",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-main mb-10 animate-fade-in-up dark:text-white">
          {t("how_work")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-6 text-center p-8 bg-white shadow-2xl rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in-up dark:bg-gray-800 dark:text-white dark:border-[#FFCA41]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                alt={step.title}
                width={120}
                height={120}
                src={step.img}
                className="w-auto h-auto object-contain"
              />
              <div className="flex flex-col gap-4">
                <button className="text-[#44c5d1] bg-[#e6f9fb] px-4 py-2 rounded-full hover:bg-[#534462] hover:text-white transition-colors duration-300 ease-in-out dark:bg-[#534462] dark:text-white dark:hover:bg-[#FFCA41]">
                  {`Step 0${index + 1}`}
                </button>
                <h5 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {t(step.title)}
                </h5>
                <p className="text-secondary text-lg leading-relaxed dark:text-gray-300">
                  {t(step.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default HowWeWork;
