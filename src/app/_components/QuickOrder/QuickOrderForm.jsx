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
    status: "pending", // إضافة الحالة كـ pending بشكل افتراضي
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData); // تأكد من أن جميع الحقول تحتوي على قيم صحيحة

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      alert(t("Order submitted successfully!"));
      setFormData({
        name: "",
        phone: "",
        service: "wash",
        address: "",
        delivery: "pickup", // استعادة القيمة الافتراضية
        status: "pending",  // استعادة القيمة الافتراضية
      });
    } catch (error) {
      console.error(error);
      alert(t("Error submitting order"));
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
              <option value="Home-delivery">{t("field_delivery_option2")}</option>
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
