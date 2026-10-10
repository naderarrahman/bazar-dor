"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function SocialLoginToast() {
  const searchParams = useSearchParams();
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;

    const social = searchParams.get("social");

    if (social === "success") {
      hasShown.current = true;
      toast.success("সাইন ইন সফল!");

      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/");
      }
    }
  }, [searchParams]);

  return null;
}