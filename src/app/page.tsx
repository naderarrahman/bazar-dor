import AllProducts from "@/components/HomeSection/AllProducts";
import Hero from "../components/HomeSection/Hero";
import TopRisers from "@/components/HomeSection/TopRisers";
import TopFallers from "@/components/HomeSection/TopFallers";

export default function Page() {
  return (
    <main>
      <Hero />
      <TopRisers />
      <TopFallers />
      <AllProducts />
    </main>
  );
}