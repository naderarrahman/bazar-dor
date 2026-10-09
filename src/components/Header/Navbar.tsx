"use client";

import Image from "next/image";
import ClientDate from "@/components/ui/ClientDate";
import UserInfo from "./UserInfo";

export default function Navbar() {
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
              <span className="text-[10px] text-gray-500 min-h-[14px]">
                <ClientDate variant="full" />
              </span>
            </div>
          </div>

          <UserInfo />

        </div>
      </div>
    </header>
  );
}