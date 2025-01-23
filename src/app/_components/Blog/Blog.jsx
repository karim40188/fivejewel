"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

function BlogPage() {
  const t = useTranslations();
  const [blogs, setBlogs] = useState();
  const locale = useLocale();
  console.log("this is locale >>>>>", locale);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://test.fivejewel.com/api/blog");
      const results = await response.json();
      setBlogs(results);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: t("blog_post_1_title"),
      description: t("blog_post_1_description"),
      image: "/assets/blog1.png",
      date: "December 31, 2024",
    },
    {
      id: 2,
      title: t("blog_post_2_title"),
      description: t("blog_post_2_description"),
      image: "/assets/blog2.webp",
      date: "November 20, 2024",
    },
    {
      id: 3,
      title: t("blog_post_3_title"),
      description: t("blog_post_3_description"),
      image: "/assets/blog3.png",
      date: "October 15, 2024",
    },
  ];

  return (
    <div className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <h1 className="text-center text-4xl font-bold text-[#EE4135] dark:text-[#FFCA41] mb-8">
          {t("blog_title")}
        </h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
          {t("blog_description")}
        </p>

        {/* المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-[1.02] duration-300"
            >
              <img
                src={post.photo}
                alt={locale=="en"?post.title_en:post.title}
                width={600}
                height={400}
                className="w-full h-auto rounded-md object-cover"
              />
              <h3 className="mt-4 text-2xl font-bold text-[#EE4135] dark:text-[#FFCA41]">
                {locale == "en" ? post.title_en : post.title}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {locale == "en" ? post.des_en : post.des}
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {post.createdAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
