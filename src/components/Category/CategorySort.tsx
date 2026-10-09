"use client";

interface CategorySortProps {
  value: string;
  onChange: (value: "default" | "price-asc" | "price-desc") => void;
}

export default function CategorySort({ value, onChange }: CategorySortProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs sm:text-sm text-gray-500">সাজান:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value as "default" | "price-asc" | "price-desc")
          }
          className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:border-green-500 transition"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}