import AllProducts from "@/components/HomeSection/AllProducts";
import Hero from "../components/HomeSection/Hero";
import TopRisers from "@/components/HomeSection/TopRisers";

export default function Page() {
  return (
    <main>
      <Hero />
      <TopRisers />
      <AllProducts />
    </main>
  );
}