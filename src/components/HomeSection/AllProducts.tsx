import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";
import ProductCard from "../ProductCards/ProductCard";

export default async function AllProducts() {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
    } else {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  if (products.length === 0) {
    return (
      <section id="all-products" className="py-8 sm:py-12 lg:py-16 scroll-mt-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      </section>
    );
  }

  return (
    <section id="all-products" className="py-8 sm:py-12 lg:py-16 scroll-mt-64">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            মোট {toBengaliNumber(products.length)}টি নিত্য প্রয়োজনীয় পণ্য
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}