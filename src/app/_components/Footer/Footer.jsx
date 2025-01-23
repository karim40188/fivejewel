"use client";
import Image from "next/image";
import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaInstagram, FaTiktok, FaTwitter, FaSnapchatGhost } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link"; 

function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { name: "about_us", href: "/about" }, 
    { name: "our_services_link", href: "/services" }, 
    { name: "blogs_news", href: "/blog" }, 
    { name: "contact_us", href: "/contact" }, 
    "how_it_works",
    "faq", 
  ];

  const ourServices = [
    "steam_ironing",
    "dry_cleaning",
    "stain_removal",
    "drapery_cleaning",
    "commercial_laundry",
    "wet_washing",
  ];

  const categories = [
    "standard",
    "express",
    "international",
    "ware_housing",
    "overnight",
    "pallet",
  ];


  const renderLinks = (links) => {
    return links.map((link, index) => (
      <li
        key={index}
        className="cursor-pointer text-gray-300 hover:text-[#FFCA41] transition-all duration-300 ease-in-out border-b border-gray-700 pb-2"
      >

        {link.href ? (
          <Link href={`/${locale}${link.href}`}>{t(link.name)}</Link> 
        ) : (
          
          t(link)
        )}
      </li>
    ));
  };

  return (
    <div className="py-16 bg-[#2B2D43] w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* العمود الأول: الشعار ووصف الشركة */}
          <div className="flex flex-col gap-6">
            <div className="w-[150px] h-auto">
              <Image
                alt="logo"
                width={400}
                height={400}
                className="w-full h-auto object-contain"
                src={"/assets/logo-2.png"}
              />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t("footer_description")}
            </p>
            <p className="text-white text-lg font-semibold">
              {t("call_us_now")}
            </p>
            <button className="flex items-center bg-[#FFCA41] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#EE4135] transition-all duration-300 ease-in-out w-[220px]">
              <BiPhoneCall size={22} />
              <p className="ml-2">+966 509557944</p>
            </button>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-2xl font-bold">{t("quick_links")}</h4>
            <ul className="flex flex-col gap-4">
              {renderLinks(quickLinks)}
            </ul>
          </div>

          {/* العمود الثالث: خدماتنا */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-2xl font-bold">{t("our_services")}</h4>
            <ul className="flex flex-col gap-4">
              {renderLinks(ourServices)}
            </ul>
          </div>

          {/* العمود الرابع: الفئات */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-2xl font-bold">{t("categories")}</h4>
            <ul className="flex flex-col gap-4">
              {renderLinks(categories)}
            </ul>
          </div>
        </div>

        {/* قسم Our Newsletter في صف منفصل في المنتصف */}
        <div className="flex flex-col items-center justify-center mt-12">
          <h4 className="text-white text-2xl font-bold mb-4">{t("our_newsletter")}</h4>
          <p className="text-gray-300 text-lg mb-6 text-center">
            {t("subscribe_to_our_newsletter")}
          </p>
          <div className="flex w-full max-w-[600px]">
            <input
              type="email"
              placeholder={t("enter_your_email")}
              className="w-full px-6 py-3 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button className="bg-[#FFCA41] text-white px-8 py-3 rounded-r-lg hover:bg-[#EE4135] transition-all duration-300 ease-in-out">
              {t("subscribe_now")}
            </button>
          </div>
        </div>

        {/* روابط التواصل الاجتماعي */}
        <div className="flex justify-center gap-8 mt-12">
          <a href="https://www.tiktok.com/@fivejewels.fw" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={30} className="text-white hover:text-[#FFCA41] transition-all duration-300 ease-in-out" />
          </a>
          <a href="https://x.com/fivej_ewels" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="text-white hover:text-[#FFCA41] transition-all duration-300 ease-in-out" />
          </a>
          <a href="https://www.instagram.com/fivejewels.fw/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} className="text-white hover:text-[#FFCA41] transition-all duration-300 ease-in-out" />
          </a>
          <a href="https://www.snapchat.com/add/fivejewels24" target="_blank" rel="noopener noreferrer">
            <FaSnapchatGhost size={30} className="text-white hover:text-[#FFCA41] transition-all duration-300 ease-in-out" />
          </a>
        </div>

        {/* قسم Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} {t("company_name")}. {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;