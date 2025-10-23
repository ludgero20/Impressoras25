import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TipCard from "@/components/TipCard";
import BrandCarousel from "@/components/BrandCarousel";
import TutorialCard from "@/components/TutorialCard";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Wrench, Shield, Zap, HardDrive, Wifi, AlertCircle } from "lucide-react";
import type { Brand, Tutorial, Tip } from "@shared/schema";

const iconMap: Record<string, any> = {
  Wrench,
  Shield,
  Zap,
  HardDrive,
  Wifi,
  AlertCircle,
};

export default function HomePage() {
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const { data: popularTutorials = [] } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials", { popular: true }],
    queryFn: () => fetch("/api/tutorials?popular=true").then(res => res.json()),
  });

  const { data: featuredTips = [] } = useQuery<Tip[]>({
    queryKey: ["/api/tips", { category: "destaque" }],
    queryFn: () => fetch("/api/tips?category=destaque").then(res => res.json()),
  });

  const { data: generalTips = [] } = useQuery<Tip[]>({
    queryKey: ["/api/tips", { category: "geral" }],
    queryFn: () => fetch("/api/tips?category=geral").then(res => res.json()),
  });

  const brandsWithTutorials = brands.filter(brand => brand.tutorialCount > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Dicas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTips.map((tip) => (
              <TipCard
                key={tip.id}
                icon={iconMap[tip.icon] || Wrench}
                title={tip.title}
                description={tip.description}
                href={`/dica/${tip.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Navegue por Marca</h2>
            <BrandCarousel brands={brandsWithTutorials} />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Tutoriais Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                title={tutorial.title}
                brand={tutorial.brand}
                readTime={tutorial.readTime}
                difficulty={tutorial.difficulty as "Fácil" | "Médio" | "Avançado"}
                href={`/tutorial/${tutorial.slug}`}
                isPopular={tutorial.isPopular === 1}
              />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Dicas Gerais de Cuidados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalTips.map((tip) => (
              <TipCard
                key={tip.id}
                icon={iconMap[tip.icon] || Wrench}
                title={tip.title}
                description={tip.description}
                href={`/dica/${tip.slug}`}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
