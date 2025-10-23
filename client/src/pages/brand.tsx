import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialCard from "@/components/TutorialCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Brand, Tutorial } from "@shared/schema";

export default function BrandPage() {
  const [, params] = useRoute("/marca/:slug");
  const slug = params?.slug || "";

  const { data: brand } = useQuery<Brand>({
    queryKey: ["/api/brands", slug],
    queryFn: () => fetch(`/api/brands/${slug}`).then(res => res.json()),
    enabled: !!slug,
  });

  const { data: tutorials = [] } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials", { brand: slug }],
    queryFn: () => fetch(`/api/tutorials?brand=${slug}`).then(res => res.json()),
    enabled: !!slug,
  });

  const sortedTutorials = [...tutorials].sort((a, b) => 
    a.title.localeCompare(b.title, 'pt-BR')
  );

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: brand.name }
            ]} />

            <h1 className="text-4xl font-bold mb-4">
              Tutoriais {brand.name}
            </h1>
            {brand.description && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {brand.description}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {sortedTutorials.length} {sortedTutorials.length === 1 ? 'tutorial disponível' : 'tutoriais disponíveis'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTutorials.map((tutorial) => (
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

          {sortedTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Ainda não há tutoriais disponíveis para esta marca.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
