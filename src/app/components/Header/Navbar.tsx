import Image from "next/image";

export default function Navbar() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900">বাজার দর</span>
              <span className="text-[10px] text-gray-500">{date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              সাইন ইন
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
              সাইন আপ
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}