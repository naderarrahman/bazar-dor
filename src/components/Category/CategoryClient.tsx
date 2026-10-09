"use client";

import { useState } from "react";
import Link from "next/link";
import { Category, Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";
import ProductCard from "../ProductCards/ProductCard";
import CategorySort from "./CategorySort";

interface CategoryClientProps {
  category: Category;
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryClient({ category, products }: CategoryClientProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.today - b.today;
    if (sort === "price-desc") return b.today - a.today;
    return 0;
  });

  if (products.length === 0) {
    return (
      <main className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-6xl mb-4">{category.icon}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {category.nameBn}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-6">
            এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।
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

  return (
    <main className="py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 mb-4 sm:mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-50 flex items-center justify-center text-2xl sm:text-3xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {category.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {category.nameBn} ক্যাটাগরির আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-5 flex items-center justify-end">
          <CategorySort value={sort} onChange={setSort} />
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          মোট {toBengaliNumber(sortedProducts.length)}টি নিত্য প্রয়োজনীয় পণ্য
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </main>
  );
}