"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function UserInfo() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const initial = user.name?.trim().charAt(0)?.toUpperCase() || "U";
  const isVerified = user.emailVerified === true;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-gray-50 transition"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold">
          {initial}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name}
        </span>
        <span className="text-xs text-gray-400 hidden sm:block">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 z-50">
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            {isVerified ? (
              <>
                <FiCheckCircle className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  ইমেইল ভেরিফাইড
                </span>
              </>
            ) : (
              <>
                <FiXCircle className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs text-amber-600 font-medium">
                  ইমেইল ভেরিফাইড নয়
                </span>
              </>
            )}
          </div>

          <div className="border-t border-gray-100 my-2" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="cursor-pointer flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FaUser className="w-3.5 h-3.5 text-green-600" />
            আমার প্রোফাইল
          </Link>

          <button
            onClick={handleSignOut}
            className="cursor-pointer w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}