import { type Brand, type InsertBrand, type Tutorial, type InsertTutorial, type Tip, type InsertTip } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllBrands(): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  
  getAllTutorials(): Promise<Tutorial[]>;
  getTutorialsByBrand(brandSlug: string): Promise<Tutorial[]>;
  getTutorialBySlug(slug: string): Promise<Tutorial | undefined>;
  getPopularTutorials(limit?: number): Promise<Tutorial[]>;
  searchTutorials(query: string): Promise<Tutorial[]>;
  
  getAllTips(): Promise<Tip[]>;
  getTipsByCategory(category: string): Promise<Tip[]>;
  getTipBySlug(slug: string): Promise<Tip | undefined>;
}

export class MemStorage implements IStorage {
  private brands: Map<string, Brand>;
  private tutorials: Map<string, Tutorial>;
  private tips: Map<string, Tip>;

  constructor() {
    this.brands = new Map();
    this.tutorials = new Map();
    this.tips = new Map();
    this.initializeData();
  }

  private initializeData() {
    const brandsData: InsertBrand[] = [
      { name: "HP", slug: "hp", description: "Hewlett-Packard - Líder mundial em impressoras", tutorialCount: 15 },
      { name: "Canon", slug: "canon", description: "Impressoras e scanners de alta qualidade", tutorialCount: 12 },
      { name: "Epson", slug: "epson", description: "Tecnologia de impressão avançada", tutorialCount: 10 },
      { name: "Brother", slug: "brother", description: "Soluções de impressão confiáveis", tutorialCount: 8 },
      { name: "Samsung", slug: "samsung", description: "Impressoras multifuncionais modernas", tutorialCount: 6 },
      { name: "Lexmark", slug: "lexmark", description: "Impressoras corporativas e domésticas", tutorialCount: 5 },
    ];

    brandsData.forEach(brand => {
      const id = randomUUID();
      this.brands.set(id, { ...brand, id, description: brand.description ?? null });
    });

    const tutorialsData: InsertTutorial[] = [
      {
        title: "Como Instalar Impressora HP DeskJet 2700 no Windows 11",
        slug: "hp-deskjet-2700",
        brand: "HP",
        brandSlug: "hp",
        readTime: "5 min",
        difficulty: "Fácil",
        content: "Tutorial completo de instalação da HP DeskJet 2700",
        isPopular: 1,
      },
      {
        title: "Configurar Impressão WiFi Canon PIXMA G3010",
        slug: "canon-pixma-g3010",
        brand: "Canon",
        brandSlug: "canon",
        readTime: "8 min",
        difficulty: "Médio",
        content: "Como configurar WiFi na Canon PIXMA G3010",
        isPopular: 1,
      },
      {
        title: "Instalar Driver Epson L3150 Passo a Passo",
        slug: "epson-l3150",
        brand: "Epson",
        brandSlug: "epson",
        readTime: "6 min",
        difficulty: "Fácil",
        content: "Instalação completa do driver Epson L3150",
        isPopular: 0,
      },
      {
        title: "Brother DCP-T510W: Instalação Completa WiFi",
        slug: "brother-dcp-t510w",
        brand: "Brother",
        brandSlug: "brother",
        readTime: "10 min",
        difficulty: "Médio",
        content: "Tutorial de instalação WiFi Brother DCP-T510W",
        isPopular: 0,
      },
      {
        title: "HP LaserJet Pro M404: Instalação em Rede",
        slug: "hp-laserjet-pro-m404",
        brand: "HP",
        brandSlug: "hp",
        readTime: "12 min",
        difficulty: "Avançado",
        content: "Como instalar HP LaserJet Pro M404 em rede",
        isPopular: 0,
      },
      {
        title: "Canon PIXMA TS3150: Instalação Básica",
        slug: "canon-pixma-ts3150",
        brand: "Canon",
        brandSlug: "canon",
        readTime: "5 min",
        difficulty: "Fácil",
        content: "Instalação básica Canon PIXMA TS3150",
        isPopular: 1,
      },
      {
        title: "Epson EcoTank L4260: Configuração WiFi Direct",
        slug: "epson-ecotank-l4260",
        brand: "Epson",
        brandSlug: "epson",
        readTime: "7 min",
        difficulty: "Médio",
        content: "Configurar WiFi Direct na Epson EcoTank L4260",
        isPopular: 0,
      },
      {
        title: "Brother HL-L2350DW: Instalação de Driver",
        slug: "brother-hl-l2350dw",
        brand: "Brother",
        brandSlug: "brother",
        readTime: "6 min",
        difficulty: "Fácil",
        content: "Instalar driver Brother HL-L2350DW",
        isPopular: 0,
      },
      {
        title: "Samsung Xpress M2020W: Setup WiFi",
        slug: "samsung-xpress-m2020w",
        brand: "Samsung",
        brandSlug: "samsung",
        readTime: "9 min",
        difficulty: "Médio",
        content: "Configurar WiFi Samsung Xpress M2020W",
        isPopular: 0,
      },
      {
        title: "HP OfficeJet 3833: Instalação Completa",
        slug: "hp-officejet-3833",
        brand: "HP",
        brandSlug: "hp",
        readTime: "8 min",
        difficulty: "Fácil",
        content: "Tutorial completo HP OfficeJet 3833",
        isPopular: 1,
      },
    ];

    tutorialsData.forEach(tutorial => {
      const id = randomUUID();
      this.tutorials.set(id, { ...tutorial, id, isPopular: tutorial.isPopular ?? 0 });
    });

    const tipsData: InsertTip[] = [
      {
        title: "Manutenção Preventiva",
        slug: "manutencao-preventiva",
        description: "Aprenda as melhores práticas para manter sua impressora funcionando perfeitamente por mais tempo. Inclui dicas de limpeza e cuidados essenciais.",
        content: "Conteúdo completo sobre manutenção preventiva",
        icon: "Wrench",
        category: "destaque",
      },
      {
        title: "Proteja Seu Computador",
        slug: "proteger-computador",
        description: "Dicas essenciais para manter seu computador seguro e funcionando bem durante a instalação e uso da impressora.",
        content: "Conteúdo sobre proteção do computador",
        icon: "Shield",
        category: "destaque",
      },
      {
        title: "Solução Rápida de Problemas",
        slug: "solucao-rapida",
        description: "Resolva os problemas mais comuns de impressoras rapidamente. Guia prático para solucionar erros de conexão e impressão.",
        content: "Conteúdo sobre solução de problemas",
        icon: "Zap",
        category: "destaque",
      },
      {
        title: "Atualizar Drivers Automaticamente",
        slug: "atualizar-drivers",
        description: "Configure seu sistema para manter os drivers da impressora sempre atualizados. Evite problemas de compatibilidade e aproveite novos recursos.",
        content: "Conteúdo sobre atualização de drivers",
        icon: "HardDrive",
        category: "geral",
      },
      {
        title: "Melhorar Conexão WiFi",
        slug: "melhorar-wifi",
        description: "Aprenda a otimizar a conexão WiFi entre sua impressora e computador. Solucione quedas de conexão e melhore a velocidade de impressão.",
        content: "Conteúdo sobre melhorar WiFi",
        icon: "Wifi",
        category: "geral",
      },
      {
        title: "Erros Comuns e Soluções",
        slug: "erros-comuns",
        description: "Guia completo dos erros mais frequentes em impressoras e como resolvê-los. Desde papel preso até problemas de driver.",
        content: "Conteúdo sobre erros comuns",
        icon: "AlertCircle",
        category: "geral",
      },
    ];

    tipsData.forEach(tip => {
      const id = randomUUID();
      this.tips.set(id, { ...tip, id, content: tip.content ?? null });
    });
  }

  async getAllBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find(brand => brand.slug === slug);
  }

  async getAllTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values());
  }

  async getTutorialsByBrand(brandSlug: string): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).filter(
      tutorial => tutorial.brandSlug === brandSlug
    );
  }

  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    return Array.from(this.tutorials.values()).find(
      tutorial => tutorial.slug === slug
    );
  }

  async getPopularTutorials(limit: number = 4): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values())
      .filter(tutorial => tutorial.isPopular === 1)
      .slice(0, limit);
  }

  async searchTutorials(query: string): Promise<Tutorial[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.tutorials.values()).filter(
      tutorial =>
        tutorial.title.toLowerCase().includes(lowercaseQuery) ||
        tutorial.brand.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getAllTips(): Promise<Tip[]> {
    return Array.from(this.tips.values());
  }

  async getTipsByCategory(category: string): Promise<Tip[]> {
    return Array.from(this.tips.values()).filter(
      tip => tip.category === category
    );
  }

  async getTipBySlug(slug: string): Promise<Tip | undefined> {
    return Array.from(this.tips.values()).find(tip => tip.slug === slug);
  }
}

export const storage = new MemStorage();
