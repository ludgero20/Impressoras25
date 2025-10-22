import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Printer, Target, Users, Heart } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: "Sobre" }
            ]} />

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Sobre o Site
            </h1>

            <p className="text-lg text-muted-foreground">
              Guias completos e simplificados para instalação de impressoras
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2>Nossa Missão</h2>
            <p>
              Facilitar a vida de quem precisa instalar impressoras, oferecendo tutoriais 
              passo a passo claros e objetivos. Sabemos que configurar uma impressora pode 
              ser frustrante, e nosso objetivo é tornar esse processo o mais simples possível.
            </p>

            <h2>O Que Oferecemos</h2>
            <p>
              Organizamos nossos guias por marca de impressora (HP, Canon, Epson, Brother, 
              Samsung, Lexmark e outras), facilitando para você encontrar exatamente o que 
              precisa. Cada tutorial é escrito em português claro e inclui:
            </p>
            <ul>
              <li>Instruções passo a passo detalhadas</li>
              <li>Indicação de nível de dificuldade</li>
              <li>Tempo estimado de leitura</li>
              <li>Dicas de manutenção preventiva</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Printer className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tutoriais Práticos</h3>
                  <p className="text-sm text-muted-foreground">
                    Guias testados e validados para as principais marcas de impressoras do mercado.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Foco na Simplicidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Linguagem clara e acessível para qualquer nível de conhecimento técnico.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Para Todos</h3>
                  <p className="text-sm text-muted-foreground">
                    Desde iniciantes até usuários mais experientes, nossos guias atendem todos.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Conteúdo Gratuito</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os tutoriais e dicas são 100% gratuitos e sempre atualizados.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>Conteúdo Sempre Atualizado</h2>
            <p>
              Trabalhamos constantemente para adicionar novos tutoriais e manter nossos 
              guias atualizados com as últimas versões de drivers e softwares. Se você 
              não encontrou o modelo específico da sua impressora, volte em breve - 
              estamos sempre expandindo nossa biblioteca de tutoriais.
            </p>

            <h2>Dúvidas ou Sugestões?</h2>
            <p>
              Nosso conteúdo é criado pensando em você. Se tiver sugestões de tutoriais 
              que gostaria de ver ou encontrou alguma informação desatualizada, ficaremos 
              felizes em ouvir seu feedback.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
