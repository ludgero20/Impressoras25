import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import type { Tip } from "@shared/schema";
import { sanitizeHtml } from "@/lib/sanitize";

export default function TipPage() {
  const [, params] = useRoute("/dica/:slug");
  const slug = params?.slug || "";

  const { data: tip, isLoading } = useQuery<Tip>({
    queryKey: ["/api/tips", slug],
    queryFn: () => fetch(`/api/tips/${slug}`).then(res => res.json()),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando dica...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Dica não encontrada</h2>
            <p className="text-muted-foreground">A dica que você procura não existe.</p>
          </div>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: tip.title }
            ]} />

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" data-testid="badge-category">
                {tip.category === "destaque" ? "Destaque" : "Dica Geral"}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {tip.title}
            </h1>

            {tip.description && (
              <p className="text-lg text-muted-foreground">
                {tip.description}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(tip.content || '') }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
