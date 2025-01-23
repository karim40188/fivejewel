import Bubbles from "@/app/_components/Bubbles/Bubbles";
import { useTranslations } from "next-intl";
import React from "react";

function ContactUs() {
  const t = useTranslations();

  return (
    <div className=" relative py-12 bg-gray-100 dark:bg-gray-900">
      <Bubbles/>
      <div className="container mx-auto px-4 text-gray-700 dark:text-white">
        {/* العنوان الرئيسي */}
        <h2 className="text-center text-4xl font-bold text-[#EE4135] my-6 dark:text-[#FFCA41]">
          {t("contact_title")}
        </h2>
        <p className="text-center text-lg mb-8">{t("contact_description")}</p>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* قسم المعلومات */}
          <div className="bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold text-[#EE4135] mb-4 dark:text-[#FFCA41]">
              {t("contact_info_title")}
            </h3>
            <ul className="space-y-4">
              <li>
                <strong className="text-[#EE4135] dark:text-[#FFCA41]">
                  {t("address")}:
                </strong>{" "}
                Prince Sultan Bin Abdulaziz Rd, As Sulimaniyah, Riyadh
              </li>
              <li>
                <strong className="text-[#EE4135] dark:text-[#FFCA41]">
                {t('phone_number_label')}
                 :
                </strong>{" "}
                {t("phone_number")}
              </li>
              <li>
                <strong className="text-[#EE4135] dark:text-[#FFCA41]">
                  {t("email_address")}:
                </strong>{" "}
                jewelsfive03@gmail.com
              </li>
              <li>
                <strong className="text-[#EE4135] dark:text-[#FFCA41]">
                  {t("working_hours")}:
                </strong>{" "}
                8:00 AM - 12:00 PM
              </li>
            </ul>
          </div>

          {/* قسم النموذج */}
          <div className="bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block font-semibold mb-2">
                  {t("form_name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4135] dark:bg-gray-700 dark:border-gray-600"
                  placeholder={t("form_name_placeholder")}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block font-semibold mb-2">
                  {t("form_email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4135] dark:bg-gray-700 dark:border-gray-600"
                  placeholder={t("form_email_placeholder")}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block font-semibold mb-2">
                  {t("form_message")}
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4135] dark:bg-gray-700 dark:border-gray-600"
                  placeholder={t("form_message_placeholder")}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#EE4135] text-white py-3 rounded-md hover:bg-opacity-90 transition dark:bg-[#FFCA41] dark:hover:bg-[#EE4135]"
              >
                {t("form_submit_button")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;