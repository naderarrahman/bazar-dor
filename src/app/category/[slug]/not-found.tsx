import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 lg:p-16 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl sm:text-5xl">🔍</span>
          </div>

          <p className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs sm:text-sm font-medium mb-4">
            ৪০৪
          </p>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            ক্যাটাগরি খুঁজে পাওয়া যায়নি
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
          </p>

          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm sm:text-base font-medium hover:bg-green-700 transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
