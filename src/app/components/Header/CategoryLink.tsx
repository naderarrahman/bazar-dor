"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";

interface CategoryLinkProps {
  category: Category;
}

export default function CategoryLink({ category }: CategoryLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === `/category/${category.slug}`;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
        isActive
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span>{category.icon}</span>
      <span>{category.nameBn}</span>
    </Link>
  );
}