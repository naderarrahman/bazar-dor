"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirm: string;
    };

    const name = data.name.trim();
    const email = data.email.trim();
    const password = data.password;
    const confirm = data.confirm;

    if (!name) return toast.error("আপনার নাম লিখুন");
    if (!email.includes("@")) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর");

    if (password !== confirm) {
      setPasswordMismatch(true);
      return toast.error("পাসওয়ার্ড মিলছে না");
    }

    setPasswordMismatch(false);
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      return toast.error(error.statusText || "সাইন আপ ব্যর্থ");
    }

    toast.success("সাইন আপ সফল! সাইন ইন করুন।");
    form.reset();
    router.push("/sign-in");
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
            আকাউন্ট তৈরি করুন
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            বিনা খরচে সাইন আপ করে সব দাম দেখুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
              />
            </div>

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
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
                  }
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                placeholder="আবার লিখুন"
                onChange={(e) => {
                  if (passwordMismatch && e.target.value === "") {
                    setPasswordMismatch(false);
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition ${
                  passwordMismatch
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-green-600"
                }`}
              />
              {passwordMismatch && (
                <p className="text-xs text-red-500 mt-1.5">
                  পাসওয়ার্ড মিলছে না
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer disabled:cursor-not-allowed w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors"
            >
              {loading ? "অপেক্ষা করুন..." : "আকাউন্ট তৈরি করুন"}
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
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="whitespace-nowrap">
                Google দিয়ে চালিয়ে যান
              </span>
            </button>

            <button
              type="button"
              onClick={handleGithub}
              className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <FaGithub className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">
                GitHub দিয়ে চালিয়ে যান
              </span>
            </button>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
            একাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-green-600 font-semibold hover:underline"
            >
              সাইন ইন করুন
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
