"use client";

import { useEffect, useState } from "react";

interface ClientDateProps {
  variant?: "full" | "year";
}

export default function ClientDate({ variant = "full" }: ClientDateProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (variant === "year") {
        setValue(new Date().getFullYear().toString());
      } else {
        setValue(
          new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
          })
        );
      }
    });
    return () => cancelAnimationFrame(id);
  }, [variant]);

  return <>{value || "\u00A0"}</>;
}