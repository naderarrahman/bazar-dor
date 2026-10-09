import { getCategories, getProducts } from "@/lib/api";
import CategoryClient from "@/components/Category/CategoryClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.category === slug);

  return <CategoryClient category={category} products={products} />;
}