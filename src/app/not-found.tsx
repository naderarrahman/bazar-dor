import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-6xl sm:text-7xl font-bold text-green-600 mb-4">
          ৪০৪
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          পেজ খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm sm:text-base font-medium hover:bg-green-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}