import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TipCard from "@/components/TipCard";
import BrandCard from "@/components/BrandCard";
import TutorialCard from "@/components/TutorialCard";
import Footer from "@/components/Footer";
import { Wrench, Shield, Zap, HardDrive, Wifi, AlertCircle } from "lucide-react";

export default function HomePage() {
  //todo: remove mock functionality
  const featuredTips = [
    {
      icon: Wrench,
      title: "Manutenção Preventiva",
      description: "Aprenda as melhores práticas para manter sua impressora funcionando perfeitamente por mais tempo. Inclui dicas de limpeza e cuidados essenciais.",
      href: "/dicas/manutencao-preventiva",
    },
    {
      icon: Shield,
      title: "Proteja Seu Computador",
      description: "Dicas essenciais para manter seu computador seguro e funcionando bem durante a instalação e uso da impressora.",
      href: "/dicas/proteger-computador",
    },
    {
      icon: Zap,
      title: "Solução Rápida de Problemas",
      description: "Resolva os problemas mais comuns de impressoras rapidamente. Guia prático para solucionar erros de conexão e impressão.",
      href: "/dicas/solucao-rapida",
    },
  ];

  const brands = [
    { name: "HP", slug: "hp", tutorialCount: 15 },
    { name: "Canon", slug: "canon", tutorialCount: 12 },
    { name: "Epson", slug: "epson", tutorialCount: 10 },
    { name: "Brother", slug: "brother", tutorialCount: 8 },
    { name: "Samsung", slug: "samsung", tutorialCount: 6 },
    { name: "Lexmark", slug: "lexmark", tutorialCount: 5 },
  ];

  const latestTutorials = [
    {
      title: "Como Instalar Impressora HP DeskJet 2700 no Windows 11",
      brand: "HP",
      readTime: "5 min",
      difficulty: "Fácil" as const,
      href: "/tutorial/hp-deskjet-2700",
      isPopular: true,
    },
    {
      title: "Configurar Impressão WiFi Canon PIXMA G3010",
      brand: "Canon",
      readTime: "8 min",
      difficulty: "Médio" as const,
      href: "/tutorial/canon-pixma-g3010",
      isPopular: true,
    },
    {
      title: "Instalar Driver Epson L3150 Passo a Passo",
      brand: "Epson",
      readTime: "6 min",
      difficulty: "Fácil" as const,
      href: "/tutorial/epson-l3150",
      isPopular: false,
    },
    {
      title: "Brother DCP-T510W: Instalação Completa WiFi",
      brand: "Brother",
      readTime: "10 min",
      difficulty: "Médio" as const,
      href: "/tutorial/brother-dcp-t510w",
      isPopular: false,
    },
  ];

  const generalTips = [
    {
      icon: HardDrive,
      title: "Atualizar Drivers Automaticamente",
      description: "Configure seu sistema para manter os drivers da impressora sempre atualizados. Evite problemas de compatibilidade e aproveite novos recursos.",
      href: "/dicas/atualizar-drivers",
    },
    {
      icon: Wifi,
      title: "Melhorar Conexão WiFi",
      description: "Aprenda a otimizar a conexão WiFi entre sua impressora e computador. Solucione quedas de conexão e melhore a velocidade de impressão.",
      href: "/dicas/melhorar-wifi",
    },
    {
      icon: AlertCircle,
      title: "Erros Comuns e Soluções",
      description: "Guia completo dos erros mais frequentes em impressoras e como resolvê-los. Desde papel preso até problemas de driver.",
      href: "/dicas/erros-comuns",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Dicas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTips.map((tip) => (
              <TipCard key={tip.title} {...tip} />
            ))}
          </div>
        </section>

        <section className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Navegue por Marca</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <BrandCard key={brand.slug} {...brand} />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Tutoriais Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.title} {...tutorial} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Dicas Gerais de Cuidados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalTips.map((tip) => (
              <TipCard key={tip.title} {...tip} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
