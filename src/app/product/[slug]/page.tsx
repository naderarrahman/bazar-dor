import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
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

function calculatePriceSummary(markets: { min: number; max: number }[]) {
  if (markets.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }
  const allMin = markets.map((m) => m.min);
  const allMax = markets.map((m) => m.max);
  const min = Math.min(...allMin);
  const max = Math.max(...allMax);
  const avg = Math.round((min + max) / 2);
  return { min, max, avg };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const summary = calculatePriceSummary(product.markets);

  return (
    <main className="py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-green-600">হোম</Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        {/* Top Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">

            <div className="flex items-start gap-4">
              <div className="text-4xl sm:text-5xl lg:text-6xl">
                {product.image}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  বাংলাদেশের বাজারভিত্তিক সর্বশেষ দাম আপডেট
                </p>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs sm:text-sm text-gray-700">
                    {product.categoryIcon} {product.categoryNameBn}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs sm:text-sm text-gray-700">
                    প্রতি {getUnitLabel(product.unit)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto bg-gray-50 rounded-xl px-5 py-4 text-center sm:text-right">
              <p className="text-[10px] sm:text-xs text-gray-500">
                আজকের গড় দাম
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 bn-digits">
                {toBengaliNumber(product.today)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                টাকা / {getUnitLabel(product.unit)}
              </p>
              <p className={`text-xs sm:text-sm font-medium mt-2 ${getChangeColor(product.change.dir)}`}>
                {getChangeIcon(product.change.dir)}{" "}
                {toBengaliNumber(Math.abs(product.change.pct))}%
              </p>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2 bn-digits">
                {toBengaliNumber(summary.min)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2 bn-digits">
                {toBengaliNumber(summary.max)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">গড় দাম</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 bn-digits">
                {toBengaliNumber(summary.avg)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                সব বাজারের গড়
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise Table */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 sm:px-6 py-3 font-medium text-gray-600 text-xs sm:text-sm">
                      বাজার
                    </th>
                    <th className="text-left px-4 sm:px-6 py-3 font-medium text-gray-600 text-xs sm:text-sm">
                      বিভাগ
                    </th>
                    <th className="text-right px-4 sm:px-6 py-3 font-medium text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      সর্বনিম্ন
                    </th>
                    <th className="text-right px-4 sm:px-6 py-3 font-medium text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      সর্বোচ্চ
                    </th>
                    <th className="text-right px-4 sm:px-6 py-3 font-medium text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((m, idx) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm">
                          {m.market}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-500 text-xs sm:text-sm">
                          {m.division}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-gray-700 text-xs sm:text-sm whitespace-nowrap bn-digits">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-gray-700 text-xs sm:text-sm whitespace-nowrap bn-digits">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-gray-900 text-xs sm:text-sm whitespace-nowrap bn-digits">
                          {toBengaliNumber(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}