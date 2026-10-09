"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const email = data.email.trim();
    const password = data.password;

    if (!email) return toast.error("ইমেইল দিন");
    if (!email.includes("@")) return toast.error("সঠিক ইমেইল দিন");
    if (!password) return toast.error("পাসওয়ার্ড দিন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর");

    setLoading(true);

    const { data: resData, error } = await authClient.signIn.email({
      ...data,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      return toast.error(error.statusText || "সাইন ইন ব্যর্থ");
    }

    console.log(resData);
    toast.success("সাইন ইন সফল!");
    router.push("/");
  };

  const handleGoogle = () => {
    authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleGithub = () => {
    authClient.signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            সাইন ইন
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে আকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

          <form onSubmit={handleSignIn} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                  className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer disabled:cursor-not-allowed w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>

          </form>

          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-4 text-xs text-gray-400 absolute">
              অথবা
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={handleGoogle}
              className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <FaGoogle className="w-4 h-4 text-[#4285F4] shrink-0" />
              <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={handleGithub}
              className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <FaGithub className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
            </button>

          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
            একাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-green-600 font-semibold hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>

        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5">
          ←{" "}
          <Link href="/" className="hover:text-green-600">
            হোম পেজে ফিরে যান
          </Link>
        </p>

      </div>
    </div>
  );
}