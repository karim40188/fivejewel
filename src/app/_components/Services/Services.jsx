// pages/services.js
"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect} from "react";

function ServicesPage() {
  const t = useTranslations();

  const locale= useLocale()
  const [services,setServices]=useState([])


  const fetchServices=async()=>{
    const response= await fetch("https://test.fivejewel.com/api/services")
    const results = await response.json()
    setServices(results)
    return results
  }

  useEffect(()=>{
    fetchServices()
  },[])

 

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
          {services?.map((service, index) => (
            <div
              key={service.title_en}
              className="bg-white p-6 text-center shadow-lg rounded-lg flex flex-col gap-6 justify-center items-center h-[350px] cursor-pointer hover:scale-[1.025] transition-transform duration-300 ease-in-out animate-fade-in-up dark:bg-gray-800 dark:text-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                alt={locale=="en"?service.title_en:service.title}
                width={100}
                height={100}
                className="w-[100px] h-auto object-contain"
                src={service.photo}
              />
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {locale=="en"?service.title_en:service.title}
              </h4>
              <p className="text-secondary text-lg leading-relaxed dark:text-gray-300">
                {locale=="en"?service.des_en:service.des}
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
