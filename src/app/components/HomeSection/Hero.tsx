import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs sm:text-sm font-medium">
                {date}
              </span>

              <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক
                জায়গায়।
              </p>

              <Link
                href="#সব-পণ্য"
                className="inline-block mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-green-600 text-white text-sm sm:text-base font-medium hover:bg-green-700 transition"
              >
                সব পণ্য দেখুন
              </Link>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের সবজি ও ফলের ঝুড়ি"
                width={400}
                height={300}
                priority
                className="w-48 sm:w-64 md:w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
