// pages/services.js
"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ServicesPage() {
  const t = useTranslations();

  const locale= useLocale()

  const services = [
    {
      img: "/assets/service1.png",
      title: "service_1_title",
      desc: "service_1_desc",
    },
    {
      img: "/assets/service2.png",
      title: "service_2_title",
      desc: "service_2_desc",
    },
    {
      img: "/assets/service3.png",
      title: "service_3_title",
      desc: "service_3_desc",
    },
    {
      img: "/assets/service4.png",
      title: "service_4_title",
      desc: "service_4_desc",
    },
    {
      img: "/assets/service5.png",
      title: "service_5_title",
      desc: "service_5_desc",
    },
    {
      img: "/assets/service6.png",
      title: "service_6_title",
      desc: "service_6_desc",
    },
  ];

  return (
    <div id="services" className="bg-[#EDFBFC] py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <h2 className="text-center text-4xl font-bold text-main mb-10 animate-fade-in-up dark:text-[#FFCA41]">
          {/* {t("services_title")} */}

         {t('explore_services')}
        </h2>

        {/* الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white p-6 text-center shadow-lg rounded-lg flex flex-col gap-6 justify-center items-center h-[350px] cursor-pointer hover:scale-[1.025] transition-transform duration-300 ease-in-out animate-fade-in-up dark:bg-gray-800 dark:text-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                alt={service.title}
                width={100}
                height={100}
                className="w-[100px] h-auto object-contain"
                src={service.img}
              />
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t(service.title)}
              </h4>
              <p className="text-secondary text-lg leading-relaxed dark:text-gray-300">
                {t(service.desc)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 animate-fade-in-up delay-500">
          <Link href={`${locale}/quick-order`}>
          <button  className="bg-[#EE4135] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-in-out text-lg font-semibold dark:bg-gray-800 dark:text-white dark:hover:bg-[#FFCA41]">
            {t("order_now")}
          </button>
          </Link>

    
        </div>
       
      </div>
    </div>
  );
}

export default ServicesPage;
