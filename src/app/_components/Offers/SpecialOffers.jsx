"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function SpecialOffers() {
  const t = useTranslations();
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState([]);
  const [discounts,setDiscounts]=useState([])
  const locale = useLocale();

  const fetchOffers = async () => {
    const response = await fetch("https://test.fivejewel.com/api/pricing");
    const results = await response.json();
    setData(results);
    return results;
  };

  const fetchDiscounts = async () => {
    try {
      const response = await fetch("https://test.fivejewel.com/api/offers");
      const results = await response.json();
      setDiscounts(results)
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchDiscounts();
  }, []);

 

  const visibleData = showMore ? data : data.slice(0, 5);

  return (
    <div id="offers" className="py-12 bg-[#EDFBFC] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-main my-6 dark:text-white">
          {t("exclusive_deals")}
        </h2>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t("offers_description")}
          </p>
          <button className="bg-main text-white px-6 py-3 mt-4 rounded-lg shadow hover:bg-opacity-90 dark:bg-[#FFCA41]">
            {t("take_advantage")}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="col-span-1 flex flex-col gap-6 md:col-span-1">
            {discounts?.map((discount, index) => (
              <div
                key={index}
                className="bg-white p-5 shadow-md rounded-lg flex items-center justify-center h-[100px] text-center dark:bg-gray-800 dark:text-white"
              >
                <span className="text-gray-700 font-semibold dark:text-white">
                  {locale=="en"?discount.title_en:discount.title}
                </span>
              </div>
            ))}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-white">
            <h4 className="text-2xl font-bold text-center text-main mb-6">
              {t("basic_price_list")}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="bg-[#EDFBFC] dark:bg-gray-900">
                    <th className="py-3 px-4 border-b">{t("garments")}</th>
                    <th className="py-3 px-4 border-b">{t("regular_price")}</th>
                    <th className="py-3 px-4 border-b">{t("urgent_price")}</th>
                    <th className="py-3 px-4 border-b">{t("description")}</th>
                    <th className="py-3 px-4 border-b">{t("dry_cleaning")}</th>
                    <th className="py-3 px-4 border-b">{t("steam_ironing")}</th>
                    <th className="py-3 px-4 border-b">{t("wash_ironing")}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-[#F9F9F9] dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      }
                    >
                      <td className="py-3 px-4 border-b">
                        {locale == "en" ? item.Garments_en : item.Garments}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        {item.regular_price} SAR
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        {item.urgent_price} SAR
                      </td>
                      <td className="py-3 px-4 border-b">
                        {locale == "en"
                          ? item.description_en
                          : item.description}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex items-center justify-center">
                          {item.dry_cleaning ? (
                            <FaCheck className="text-green-500 text-lg" />
                          ) : (
                            <FaTimes className="text-red-500 text-lg" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex items-center justify-center">
                          {item.steam_ironing ? (
                            <FaCheck className="text-green-500 text-lg" />
                          ) : (
                            <FaTimes className="text-red-500 text-lg" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex items-center justify-center">
                          {item.wash_and_ironing ? (
                            <FaCheck className="text-green-500 text-lg" />
                          ) : (
                            <FaTimes className="text-red-500 text-lg" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-main text-white px-6 py-3 mt-4 rounded-lg shadow hover:bg-opacity-90 dark:bg-[#FFCA41] dark:hover:bg-[#FFCA41]"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? t("see_less") : t("see_more")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffers;
