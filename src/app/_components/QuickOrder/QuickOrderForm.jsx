"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function QuickOrderForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "wash",
    address: "",
    delivery: "pickup",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // إعادة تعيين الخطأ

    const apiBody = {
      Name: formData.name,
      PhoneNumber: formData.phone,
      ServiceType: formData.service,
      Address: formData.address,
      DeliveryMethod: formData.delivery,
    };

    try {
      const response = await fetch("https://test.fivejewel.com/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      console.log(response)

      setFormData({
        name: "",
        phone: "",
        service: "wash",
        address: "",
        delivery: "pickup",
      });
    } catch (error) {
      setError(error.message); // عرض الخطأ للمستخدم
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-main dark:bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-32">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {t("quick_order_title")}
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-200 dark:text-gray-400 mb-10">
          {t("quick_order_content")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12"
        >
          {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

          {/* حقل الاسم */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              {t("field_name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("field_name_placeholder")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 text-black focus:ring-main focus:outline-none"
              required
            />
          </div>

          {/* حقل رقم الجوال */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              {t("field_phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("field_phone_placeholder")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 text-black focus:ring-main focus:outline-none"
              required
            />
          </div>

          {/* حقل نوع الخدمة */}
          <div className="mb-6">
            <label
              htmlFor="service"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              {t("field_service_type")}
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-main focus:outline-none"
              required
            >
              <option value="wash">{t("field_service_option1")}</option>
              <option value="dry-clean">{t("field_service_option2")}</option>
              <option value="iron">{t("field_service_option3")}</option>
              <option value="perfume">{t("field_service_option4")}</option>
              <option value="curtains-cleaning">
                {t("field_service_option5")}
              </option>
              <option value="carpets-cleaning">
                {t("field_service_option6")}
              </option>
              <option value="alterations-and-repairs">
                {t("field_service_option7")}
              </option>
            </select>
          </div>

          {/* حقل العنوان */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              {t("field_address")}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("field_address_placeholder")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 text-black focus:ring-main focus:outline-none"
              required
            />
          </div>

          {/* حقل طريقة التوصيل */}
          <div className="mb-6">
            <label
              htmlFor="delivery"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              {t("field_delivery_method")}
            </label>
            <select
              id="delivery"
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 text-black focus:ring-main focus:outline-none"
              required
            >
              <option value="pickup">{t("field_delivery_option1")}</option>
              <option value="Home-delivery">
                {t("field_delivery_option2")}
              </option>
            </select>
          </div>

          {/* زر إرسال الطلب */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-main text-white py-3 rounded-lg font-semibold transition-all ${
              loading ? "opacity-50" : "hover:bg-[#FFCA41]"
            }`}
          >
            {loading ? t("Submitting") : t("cta_submit_order")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuickOrderForm;
