import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { FaGlobe } from "react-icons/fa"; // أيقونة العالم من react-icons
import { HiChevronDown } from "react-icons/hi"; // أيقونة السهم من react-icons

export default function LocaleSelect({ defaultValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (value) => {
    router.replace({ pathname, params }, { locale: value });
  };

  return (
    <div className="relative group">
      {/* أيقونة العالم */}
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <FaGlobe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>

      {/* حقل الاختيار */}
      <select
        id="locale-select"
        value={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        className="w-32 pl-8 pr-6 py-2 bg-white dark:bg-gray-800 cursor-pointer text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFCA41] transition-all duration-200 ease-in-out hover:shadow-md appearance-none bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
      >
        <option value="en" className="py-1">English</option>
        <option value="ar" className="py-1">العربية</option>
      </select>

      {/* أيقونة السهم */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <HiChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
}