import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TutorialCard from "@/components/TutorialCard";
import AdSpace from "@/components/AdSpace";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { Tutorial } from "@shared/schema";

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <a href="/" className="hover:text-foreground">Início</a>
              <span>/</span>
              <a href={`/marca/${tutorial.brandSlug}`} className="hover:text-foreground">{tutorial.brand}</a>
              <span>/</span>
              <span className="text-foreground">{tutorial.title}</span>
            </div>

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

          <div className="prose prose-lg max-w-none">
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

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  1
                </span>
                Preparar a Impressora
              </h2>
              <p className="mb-4">
                Remova a impressora da embalagem com cuidado. Certifique-se de remover todas as fitas 
                de proteção laranja e azul dos cartuchos e do interior da impressora.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm mb-0">
                  <strong>Dica:</strong> Guarde a embalagem original por pelo menos 30 dias em caso de 
                  necessidade de troca ou devolução.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  2
                </span>
                Conectar ao Computador
              </h2>
              <p className="mb-4">
                Conecte o cabo USB da impressora na porta USB do seu computador. 
                <strong> Não ligue a impressora ainda</strong> - o Windows detectará o dispositivo 
                e instalará os drivers básicos automaticamente.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Use uma porta USB diretamente no computador (não use hubs USB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Aguarde a mensagem "Dispositivo está pronto para uso"</span>
                </li>
              </ul>
            </section>

            <div className="flex justify-center my-8">
              <AdSpace size="in-article" />
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  3
                </span>
                Baixar Drivers Oficiais
              </h2>
              <p className="mb-4">
                Acesse o site oficial da marca e procure pelos drivers do seu modelo. 
                Baixe o pacote completo de drivers para o seu sistema operacional.
              </p>
              <p className="mb-4">
                Execute o instalador e siga as instruções na tela. O processo levará cerca de 5-10 minutos.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  4
                </span>
                Testar a Impressão
              </h2>
              <p className="mb-4">
                Após a instalação, ligue a impressora e imprima uma página de teste:
              </p>
              <ol className="space-y-3 mb-4 list-decimal list-inside">
                <li>Abra as Configurações do sistema</li>
                <li>Vá em Dispositivos → Impressoras e scanners</li>
                <li>Selecione sua impressora</li>
                <li>Clique em "Gerenciar" e depois "Imprimir página de teste"</li>
              </ol>
            </section>

            <Card className="p-6 bg-green-500/5 border-green-500/20">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Pronto!
              </h3>
              <p className="text-sm text-muted-foreground mb-0">
                Sua impressora {tutorial.brand} está instalada e pronta para uso. Se encontrar algum problema, 
                confira nosso guia de solução de problemas.
              </p>
            </Card>
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
