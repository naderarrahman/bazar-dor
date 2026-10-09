import { Category } from "@/types";
import CategoryLink from "./CategoryLink";

export default async function NavCategory() {
  let categories: Category[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
    } else {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          
          {/* Home Link */}
          <li>
            <CategoryLink href="/" icon="🏠" label="হোম" />
          </li>

          {/* Category Links */}
          {categories.map((item) => (
            <li key={item.id}>
              <CategoryLink
                href={`/category/${item.slug}`}
                icon={item.icon}
                label={item.nameBn}
              />
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
}