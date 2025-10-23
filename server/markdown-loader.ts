import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { type InsertBrand, type InsertTutorial, type InsertTip } from '@shared/schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BRANDS_DIR = path.join(CONTENT_DIR, 'marcas');
const TIPS_DIR = path.join(CONTENT_DIR, 'dicas');

/**
 * Capitaliza a primeira letra de cada palavra
 */
function capitalizeWords(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Gera uma descrição genérica para a marca
 */
function generateBrandDescription(brandName: string): string {
  return `Tutoriais de instalação para impressoras ${brandName}`;
}

/**
 * Lê todos os arquivos markdown de um diretório
 */
function readMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Valida campos obrigatórios do frontmatter
 */
function validateTutorialFrontmatter(data: any, filePath: string): boolean {
  const required = ['title', 'slug', 'brand', 'brandSlug', 'readTime', 'difficulty'];
  for (const field of required) {
    if (!data[field]) {
      console.error(`Campo obrigatório "${field}" faltando em ${filePath}`);
      return false;
    }
  }
  return true;
}

function validateTipFrontmatter(data: any, filePath: string): boolean {
  const required = ['title', 'slug', 'description', 'icon', 'category'];
  for (const field of required) {
    if (!data[field]) {
      console.error(`Campo obrigatório "${field}" faltando em ${filePath}`);
      return false;
    }
  }
  return true;
}

/**
 * Carrega todos os tutoriais dos arquivos markdown
 */
export function loadTutorials(): InsertTutorial[] {
  const tutorials: InsertTutorial[] = [];
  
  if (!fs.existsSync(BRANDS_DIR)) {
    console.warn('Diretório de marcas não encontrado:', BRANDS_DIR);
    return tutorials;
  }
  
  const brandDirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true });
  
  for (const brandDir of brandDirs) {
    if (!brandDir.isDirectory()) continue;
    
    const brandSlug = brandDir.name;
    const brandPath = path.join(BRANDS_DIR, brandSlug);
    const markdownFiles = readMarkdownFiles(brandPath);
    
    for (const filePath of markdownFiles) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Validar frontmatter
        if (!validateTutorialFrontmatter(data, filePath)) {
          continue;
        }
        
        // Converter markdown para HTML usando marked
        const htmlContent = marked.parse(content) as string;
        
        tutorials.push({
          title: data.title,
          slug: data.slug,
          brand: data.brand,
          brandSlug: data.brandSlug,
          readTime: data.readTime,
          difficulty: data.difficulty,
          content: htmlContent,
          isPopular: data.isPopular ? 1 : 0,
        });
      } catch (error) {
        console.error(`Erro ao carregar tutorial ${filePath}:`, error);
      }
    }
  }
  
  return tutorials;
}

/**
 * Carrega todas as marcas automaticamente lendo as pastas em content/marcas/
 * Aceita tutoriais pré-carregados para evitar double parsing
 */
export function loadBrands(preloadedTutorials?: InsertTutorial[]): InsertBrand[] {
  const brands: InsertBrand[] = [];
  const tutorials = preloadedTutorials || loadTutorials();
  
  if (!fs.existsSync(BRANDS_DIR)) {
    console.warn('Diretório de marcas não encontrado:', BRANDS_DIR);
    return brands;
  }
  
  // Contar tutoriais por marca
  const tutorialCount: { [key: string]: number } = {};
  for (const tutorial of tutorials) {
    tutorialCount[tutorial.brandSlug] = (tutorialCount[tutorial.brandSlug] || 0) + 1;
  }
  
  // Ler todas as pastas em content/marcas/
  const brandDirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true });
  
  for (const brandDir of brandDirs) {
    if (!brandDir.isDirectory()) continue;
    
    const slug = brandDir.name;
    const count = tutorialCount[slug] || 0;
    
    // Apenas incluir marcas que têm pelo menos 1 tutorial
    if (count > 0) {
      // Gerar nome da marca a partir do slug (capitalizar)
      const brandName = capitalizeWords(slug);
      
      brands.push({
        name: brandName,
        slug,
        description: generateBrandDescription(brandName),
        tutorialCount: count,
      });
    }
  }
  
  // Ordenar alfabeticamente por nome
  brands.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  
  return brands;
}

/**
 * Carrega todas as dicas dos arquivos markdown
 */
export function loadTips(): InsertTip[] {
  const tips: InsertTip[] = [];
  
  if (!fs.existsSync(TIPS_DIR)) {
    console.warn('Diretório de dicas não encontrado:', TIPS_DIR);
    return tips;
  }
  
  const markdownFiles = readMarkdownFiles(TIPS_DIR);
  
  for (const filePath of markdownFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // Validar frontmatter
      if (!validateTipFrontmatter(data, filePath)) {
        continue;
      }
      
      // Converter markdown para HTML usando marked
      const htmlContent = marked.parse(content) as string;
      
      tips.push({
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: htmlContent,
        icon: data.icon,
        category: data.category,
      });
    } catch (error) {
      console.error(`Erro ao carregar dica ${filePath}:`, error);
    }
  }
  
  return tips;
}
