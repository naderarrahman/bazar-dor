import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

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

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl sm:text-4xl">{product.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            প্রতি {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
            আজকের দাম
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">
            {toBengaliNumber(product.today)}{" "}
            <span className="text-xs sm:text-sm font-normal text-gray-500">টাকা</span>
          </p>
        </div>
        <span className={`text-xs sm:text-sm font-medium ${getChangeColor(product.change.dir)}`}>
          {getChangeIcon(product.change.dir)}{" "}
          {toBengaliNumber(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
}