import { getCategories } from "@/lib/api";
import CategoryLink from "./CategoryLink";

export default async function NavCategory() {
  const categories = await getCategories();

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">

          <li>
            <CategoryLink href="/" icon="🏠" label="হোম" />
          </li>

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