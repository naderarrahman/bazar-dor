"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryLinkProps {
  href: string;
  icon: string;
  label: string;
}

export default function CategoryLink({ href, icon, label }: CategoryLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
        isActive
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}