import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ChevronRight } from "lucide-react";
import type { Tip } from "@shared/schema";

export default function DicasGeraisPage() {
  const { data: tips, isLoading } = useQuery<Tip[]>({
    queryKey: ["/api/tips"],
  });

  const dicasDestaque = tips?.filter(tip => tip.category === "destaque") || [];
  const dicasGerais = tips?.filter(tip => tip.category === "geral") || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: "Dicas Gerais" }
            ]} />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Dicas Gerais
                </h1>
                <p className="text-muted-foreground">
                  {tips?.length || 0} dicas disponíveis
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">
              Dicas úteis para manter sua impressora funcionando perfeitamente
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando dicas...</p>
            </div>
          ) : (
            <>
              {dicasDestaque.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Em Destaque</h2>
                  <div className="grid gap-4">
                    {dicasDestaque.map((tip) => (
                      <Link key={tip.slug} href={`/dica/${tip.slug}`}>
                        <Card 
                          className="p-6 hover-elevate cursor-pointer"
                          data-testid={`card-tip-${tip.slug}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default" data-testid={`badge-destaque-${tip.slug}`}>
                                  Destaque
                                </Badge>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {tip.title}
                              </h3>
                              {tip.description && (
                                <p className="text-muted-foreground">
                                  {tip.description}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {dicasGerais.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6">Todas as Dicas</h2>
                  <div className="grid gap-4">
                    {dicasGerais.map((tip) => (
                      <Link key={tip.slug} href={`/dica/${tip.slug}`}>
                        <Card 
                          className="p-6 hover-elevate cursor-pointer"
                          data-testid={`card-tip-${tip.slug}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" data-testid={`badge-geral-${tip.slug}`}>
                                  Dica Geral
                                </Badge>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {tip.title}
                              </h3>
                              {tip.description && (
                                <p className="text-muted-foreground">
                                  {tip.description}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {tips?.length === 0 && (
                <div className="text-center py-12">
                  <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma dica disponível</h3>
                  <p className="text-muted-foreground">
                    Em breve adicionaremos mais dicas úteis.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
