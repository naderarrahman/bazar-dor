import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Header/Navbar";
import NavCategory from "../components/Header/NavCategory";
import Marquee from "../components/Header/Marquee";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${notoSansBengali.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <NavCategory />
        <Marquee />
        <main>{children}</main>
      </body>
    </html>
  );
}