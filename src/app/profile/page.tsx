"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;

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
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-3" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500">ত্রুটি: {error.message}</p>
      </div>
    );
  }

  const initial = user?.name?.trim().charAt(0)?.toUpperCase() || "U";
  const isVerified = user?.emailVerified === true;
  const loginType = "Email & Password";
  const createdAt = (user as { createdAt?: Date } | undefined)?.createdAt;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-semibold shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {user?.name || "গেস্ট ইউজার"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user?.email || "লগইন করা হয়নি"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors shrink-0"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            সাইন আউট
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">তথ্য</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-medium block mb-1">
              ইউজারের নাম
            </span>
            <span className="font-semibold text-gray-800 text-sm truncate block">
              {user?.name || "N/A"}
            </span>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-medium block mb-1">
              ইমেইল এড্রেস
            </span>
            <span className="font-semibold text-gray-800 text-sm truncate block">
              {user?.email || "N/A"}
            </span>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-medium block mb-1">
              ইমেইল ভেরিফিকেশন
            </span>
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                <FiCheckCircle className="w-3 h-3" />
                ভেরিফাইড
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full border border-amber-200">
                <FiXCircle className="w-3 h-3" />
                ভেরিফাইড নয়
              </span>
            )}
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-medium block mb-1">
              লগইন টাইপ
            </span>
            <span className="font-semibold text-gray-800 text-sm">
              {loginType}
            </span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50/40 rounded-xl border border-green-100 space-y-2">
          <div className="flex justify-between items-center gap-2">
            <span className="text-xs font-medium text-gray-500 shrink-0">
              ইউজার আইডি:
            </span>
            <span className="font-mono text-[11px] text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 truncate">
              {user?.id || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2 pt-2 border-t border-green-100">
            <span className="text-xs font-medium text-gray-500 shrink-0">
              অ্যাকাউন্ট তৈরির সময়:
            </span>
            <span className="text-xs font-medium text-gray-700">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          তথ্য পরিবর্তন
        </h2>

        <Link
          href="/profile/update"
          className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-green-600 hover:text-green-700 transition-colors"
        >
          <FaEdit className="w-3.5 h-3.5" />
          তথ্য আপডেট করুন
        </Link>
      </div>

      <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
        ←{" "}
        <Link href="/" className="hover:text-green-600">
          হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
