import { type Brand, type InsertBrand, type Tutorial, type InsertTutorial, type Tip, type InsertTip } from "@shared/schema";
import { randomUUID } from "crypto";
import { loadBrands, loadTutorials, loadTips } from "./markdown-loader";

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
    console.log('Carregando conteúdo dos arquivos markdown...');
    
    // Carregar tutoriais primeiro (usado para calcular contagem de marcas)
    const tutorialsData: InsertTutorial[] = loadTutorials();
    tutorialsData.forEach(tutorial => {
      const id = randomUUID();
      this.tutorials.set(id, { ...tutorial, id, isPopular: tutorial.isPopular ?? 0 });
    });
    console.log(`✓ ${tutorialsData.length} tutoriais carregados`);
    
    // Carregar marcas baseado nos tutoriais já carregados (evita double parsing)
    const brandsData: InsertBrand[] = loadBrands(tutorialsData);
    brandsData.forEach(brand => {
      const id = randomUUID();
      this.brands.set(id, { 
        ...brand, 
        id, 
        description: brand.description ?? null,
        tutorialCount: brand.tutorialCount ?? 0
      });
    });
    console.log(`✓ ${brandsData.length} marcas carregadas`);

    // Carregar dicas dos arquivos markdown
    const tipsData: InsertTip[] = loadTips();
    tipsData.forEach(tip => {
      const id = randomUUID();
      this.tips.set(id, { ...tip, id, content: tip.content ?? null });
    });
    console.log(`✓ ${tipsData.length} dicas carregadas`);
    
    console.log('Conteúdo carregado com sucesso!\n');
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
