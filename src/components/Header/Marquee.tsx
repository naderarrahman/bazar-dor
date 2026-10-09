import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] || unit;
}

function getChangeColor(dir: string): string {
  if (dir === "up") return "text-green-600";
  if (dir === "down") return "text-red-600";
  return "text-gray-500";
}

function getChangeIcon(dir: string): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-100 overflow-hidden">
      <MarqueeText duration={30} direction="right">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 mx-2 sm:mx-3 text-xs sm:text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition whitespace-nowrap"
          >
            <span className="text-sm sm:text-base">{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span className="text-gray-500">
              {toBengaliNumber(product.today)} টাকা/
              {getUnitLabel(product.unit)}
            </span>
            <span className={getChangeColor(product.change.dir)}>
              {getChangeIcon(product.change.dir)}{" "}
              {toBengaliNumber(product.change.pct)}%
            </span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
}