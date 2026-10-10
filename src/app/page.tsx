import Hero from "@/components/HomeSection/Hero";
import TopRisers from "@/components/HomeSection/TopRisers";
import TopFallers from "@/components/HomeSection/TopFallers";
import AllProducts from "@/components/HomeSection/AllProducts";
import SocialLoginToast from "@/components/ui/SocialLoginToast";

export default function Page() {
  return (
    <main>
      <SocialLoginToast />
      <Hero />
      <TopRisers />
      <TopFallers />
      <AllProducts />
    </main>
  );
}