import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialCard from "@/components/TutorialCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSpace from "@/components/AdSpace";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import type { Tutorial } from "@shared/schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { generateHowToSchema, generateOpenGraphTags } from "@/lib/structured-data";

export default function TutorialPage() {
  const [, params] = useRoute("/tutorial/:slug");
  const slug = params?.slug || "";

  const { data: tutorial, isLoading } = useQuery<Tutorial>({
    queryKey: ["/api/tutorials", slug],
    queryFn: () => fetch(`/api/tutorials/${slug}`).then(res => res.json()),
    enabled: !!slug,
  });

  const { data: relatedTutorials = [] } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials", { brand: tutorial?.brandSlug }],
    queryFn: () => fetch(`/api/tutorials?brand=${tutorial?.brandSlug}`).then(res => res.json()),
    enabled: !!tutorial?.brandSlug,
  });

  const filteredRelated = relatedTutorials
    .filter(t => t.slug !== slug)
    .slice(0, 2);

  useEffect(() => {
    if (!tutorial) return;

    const baseUrl = window.location.origin;
    const url = `${baseUrl}/tutorial/${slug}`;

    document.title = `${tutorial.title} | Guia de Instalação de Impressoras`;

    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', `Aprenda a instalar ${tutorial.title}. Tutorial completo passo a passo com ${tutorial.readTime} de leitura. Nível: ${tutorial.difficulty}.`);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    const ogTags = generateOpenGraphTags({
      title: tutorial.title,
      description: `Tutorial completo para ${tutorial.title}`,
      url: url,
      type: 'article'
    });

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
      metaTag.setAttribute('property', property);
      metaTag.setAttribute('content', content);
      if (!document.querySelector(`meta[property="${property}"]`)) {
        document.head.appendChild(metaTag);
      }
    });

    let schemaScript = document.getElementById('tutorial-schema') as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'tutorial-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(generateHowToSchema(tutorial, baseUrl));

    return () => {
      const schema = document.getElementById('tutorial-schema');
      if (schema) schema.remove();
    };
  }, [tutorial, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando tutorial...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Tutorial não encontrado</h2>
            <p className="text-muted-foreground">O tutorial que você procura não existe.</p>
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
              { label: tutorial.brand, href: `/marca/${tutorial.brandSlug}` },
              { label: tutorial.title }
            ]} />

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" data-testid="badge-brand">{tutorial.brand}</Badge>
              <Badge className={
                tutorial.difficulty === "Fácil" ? "bg-green-500/10 text-green-700 dark:text-green-400" :
                tutorial.difficulty === "Médio" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" :
                "bg-red-500/10 text-red-700 dark:text-red-400"
              } data-testid="badge-difficulty">
                {tutorial.difficulty}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {tutorial.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tutorial.readTime} de leitura</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center mb-8">
            <AdSpace size="rectangle" />
          </div>

          <Card className="p-6 mb-8 border-l-4 border-l-primary">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2 mt-0">Antes de Começar</h3>
                <p className="text-sm text-muted-foreground mb-0">
                  Certifique-se de que sua impressora está desligada e que você tem o cabo USB em mãos. 
                  Você também precisará de uma conexão com a internet para baixar os drivers.
                </p>
              </div>
            </div>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(tutorial.content) }} />
          </div>

          <div className="flex justify-center my-8">
            <AdSpace size="in-article" />
          </div>

          {filteredRelated.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6">Tutoriais Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRelated.map((relatedTutorial) => (
                  <TutorialCard
                    key={relatedTutorial.id}
                    title={relatedTutorial.title}
                    brand={relatedTutorial.brand}
                    readTime={relatedTutorial.readTime}
                    difficulty={relatedTutorial.difficulty as "Fácil" | "Médio" | "Avançado"}
                    href={`/tutorial/${relatedTutorial.slug}`}
                    isPopular={relatedTutorial.isPopular === 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
