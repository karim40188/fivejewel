"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslations } from "next-intl";

const reviews = [
  {
    id: 1,
    text: "review_1_text",
    name: "review_1_name",
    // avatar: "/assets/avatar1.png", // إضافة صورة المستخدم
  },
  {
    id: 2,
    text: "review_2_text",
    name: "review_2_name",
    // avatar: "/assets/avatar2.png", // إضافة صورة المستخدم
  },
  {
    id: 3,
    text: "review_3_text",
    name: "review_3_name",
    // avatar: "/assets/avatar3.png", // إضافة صورة المستخدم
  },
];

function Reviews() {
  const t = useTranslations();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // إزالة الأسهم الافتراضية
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300 hover:bg-[#EE4135]"></div>
    ),
  };

  return (
    <div className="py-20 bg-[#EDFBFC] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-main mb-10 animate-fade-in-up dark:text-white">
          {t("what_clients_say")}
        </h2>

        {/* React Slick Component */}
        <Slider {...settings}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white w-[90%] md:w-[70%] lg:w-[60%] p-8 text-center min-h-[350px] mx-auto shadow-2xl rounded-lg border-t-4 border-[#FFCA41] transform transition-all duration-500 hover:scale-105 dark:bg-gray-800 dark:border-[#FFCA41] dark:text-white"
            >
              <div className="mt-5 relative">
                {/* صورة المستخدم */}
                {/* <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFCA41]">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div> */}

                {/* نص المراجعة */}
                <p className=" text-lg italic leading-relaxed text-gray-700 relative dark:text-gray-300">
                  <span className="text-6xl font-bold text-[#EE4135] absolute -top-8 left-0">“</span>
                  {t(review.text)}
                  <span className="text-6xl font-bold text-[#EE4135] absolute -bottom-8 right-0">”</span>
                </p>

                {/* اسم المستخدم */}
                <h4 className="font-semibold text-xl mt-8 text-[#333] dark:text-white">
                  {t(review.name)}
                </h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Reviews;
