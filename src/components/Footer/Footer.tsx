import { FiMail } from "react-icons/fi";
import { FaLinkedin, FaFacebookF } from "react-icons/fa";

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 sm:pb-8 border-b border-gray-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              বাজার দর
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 md:text-right md:max-w-md">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {date} বাজার দর। সকল অধিকার সংরক্ষিত।
          </p>

          <div className="flex items-center gap-3">
            <a
              href="mailto:naderarrahman@gmail.com"
              aria-label="Email"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition"
            >
              <FiMail className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/naderarrahman/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>

            <a
              href="https://web.facebook.com/naderarrahman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
