import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import CategoryClient from "@/components/Category/CategoryClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <main className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            ক্যাটাগরি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-6">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm sm:text-base font-medium hover:bg-green-700 transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.category === slug);

  return <CategoryClient category={category} products={products} />;
}