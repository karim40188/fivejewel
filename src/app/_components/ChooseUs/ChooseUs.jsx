import { useTranslations,useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ChooseUs() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* النص والأزرار */}
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <div>
              <h2 className="text-main text-xl font-semibold mb-3 dark:text-[#FFCA41]">
                {t("why_choose_us")}
              </h2>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                {t("why_choose_us_title")}
              </h3>
            </div>

            <p className="text-secondary text-lg leading-relaxed dark:text-gray-300">
              {t("why_choose_us_desc")}
            </p>

            <div className="space-y-6">
              <div className="flex gap-5 items-center animate-fade-in-up delay-100">
                <Image
                  alt="drop-off-laundry"
                  src={"/assets/icon1.png"}
                  width={60}
                  height={60}
                  className="w-auto h-auto"
                />
                <div>
                  <h4 className="text-xl text-[#534462] font-semibold dark:text-white">
                    {t("drop_off_laundry")}
                  </h4>
                  <p className="text-secondary text-lg dark:text-gray-300">
                    {t("drop_off_laundry_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-center animate-fade-in-up delay-200">
                <Image
                  alt="online-booking"
                  src={"/assets/icon2.png"}
                  width={60}
                  height={60}
                  className="w-auto h-auto"
                />
                <div>
                  <h4 className="text-xl text-[#534462] font-semibold dark:text-white">
                    {t("online_booking")}
                  </h4>
                  <p className="text-secondary text-lg dark:text-gray-300">
                    {t("online_booking_desc")}
                  </p>
                </div>
              </div>
            </div>
            <Link href={`/${locale}/about`}>
              <button className="flex bg-main text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#FFCA41] hover:text-white transition-all duration-300 ease-in-out text-lg font-semibold w-[200px] justify-center items-center animate-fade-in-up delay-300 dark:bg-gray-800 dark:text-white dark:hover:bg-[#FFCA41]">
                {t("read_more_btn")}
              </button>
            </Link>
          </div>

          {/* الصورة */}
          <div className="relative overflow-hidden rounded-lg drop-shadow-lg transform transition-all duration-500 hover:scale-105 animate-fade-in-up delay-400">
            <Image
              alt="choose-logo"
              width={900}
              height={900}
              className="w-full h-full object-cover"
              src={"/assets/1.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
