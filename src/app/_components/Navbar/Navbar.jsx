"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { useLocale, useTranslations } from "next-intl"; 
import LocaleSelect from "../langaugeSwitcher/LangaugeSwitcher";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Navbar() {
  const locale = useLocale();
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "services", href: "/services" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "/contact-us" },
    { name: "pricing", href: "/pricing" }, 
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Navbar */}
      <nav
        className={`bg-main dark:bg-gray-900 text-white py-3 transition-all duration-500 top-0 left-0 right-0 w-full z-10 fixed shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-[100px] h-auto">
                <Link href={`/${locale}`}>
                  <Image
                    src="/assets/logo-2.png"
                    width={900}
                    height={900}
                    className="w-full h-auto object-contain"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>

            {/* Menu button for small screens */}
            <button
              className="md:hidden text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            {/* Navbar links */}
            <ul className="hidden md:flex gap-8 items-center text-lg">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="hover:text-[#FFCA41] hover:border-b-2 hover:border-[#FFCA41] transition-all duration-300 ease-in-out"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
              <li>
                <div className="flex items-center bg-white dark:bg-gray-800 cursor-pointer text-main dark:text-white px-4 py-2 rounded-lg gap-2 hover:bg-[#FFCA41] hover:text-white transition-all duration-300 ease-in-out">
                  <BiPhoneCall size={22} />
                  <p className="text-[12px]">+966 509557944</p>
                </div>
              </li>
              {/* Order Now Button */}
              <li>
                <Link
                  href={`/${locale}/quick-order`}
                  className="bg-[#FFCA41] text-main px-4 py-2 rounded-lg ml-1 hover:bg-main hover:text-white transition-all duration-300"
                >
                  Order Now
                </Link>
              </li>
            </ul>

            {/* Language Selector and Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <LocaleSelect defaultValue={locale} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div
        className={`${
          menuOpen ? "left-0" : "-left-full"
        } md:hidden fixed top-0 bottom-0 w-[250px] bg-white dark:bg-gray-800 z-20 transition-all duration-300 ease-in-out shadow-lg`}
      >
        <div className="p-4">
          <div className="w-[100px] h-auto">
            <Image
              src="/assets/logo-2.png"
              width={900}
              height={900}
              className="w-full h-auto object-contain"
              alt="logo"
            />
          </div>
          <ul className="flex flex-col gap-4 mt-6">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="block py-2 hover:text-[#FFCA41] dark:text-white transition-all duration-300 ease-in-out"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(link.name)}
                </Link>
              </li>
            ))}
            <li>
              <div className="flex items-center bg-main   dark:bg-gray-900 text-white px-4 py-2 rounded-lg gap-2 transition-all duration-300 ease-in-out">
                <BiPhoneCall size={22} />
                <p className="text-[16px] ">+966 509557944</p>
              </div>
            </li>
            {/* Order Now Button in Sidebar */}
            <li>
              <Link
                href={`/${locale}/quick-order`}
                className="bg-[#FFCA41] text-main px-4 py-2 rounded-lg hover:bg-main hover:text-white transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Order Now
              </Link>
            </li>
            {/* Language Selector in Sidebar */}
            <li>
              <LocaleSelect defaultValue={locale} />
            </li>
            {/* Theme Toggle in Sidebar */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay to close sidebar when clicked outside */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
