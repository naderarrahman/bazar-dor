"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    const nameVal = data.name?.trim();

    if (!nameVal) {
      toast.error("আপনার নাম লিখুন");
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.updateUser({
        name: nameVal,
      });

      if (error) {
        toast.error(error.message || "আপডেট করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-3" />
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6 h-56" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-400 font-medium block mb-1">
              বর্তমান নাম
            </span>
            <span className="text-sm text-gray-700">{user?.name || "N/A"}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নতুন নাম
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name || ""}
              placeholder="আপনার নাম লিখুন"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer disabled:cursor-not-allowed w-full py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors"
          >
            {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          ←{" "}
          <Link href="/profile" className="hover:text-green-600">
            প্রোফাইলে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}
