import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialCard from "@/components/TutorialCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Tutorial } from "@shared/schema";

export default function SearchPage() {
  const searchParams = useSearch();
  const initialQuery = new URLSearchParams(searchParams).get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: results = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials", { search: debouncedQuery }],
    queryFn: () => fetch(`/api/tutorials?search=${encodeURIComponent(debouncedQuery)}`).then(res => res.json()),
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-6">Buscar Tutoriais</h1>
            
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Digite o modelo ou marca da impressora..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-page"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {searchQuery.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Digite algo para buscar tutoriais de instalação.
              </p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Buscando...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum tutorial encontrado para "{searchQuery}".
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((tutorial) => (
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
