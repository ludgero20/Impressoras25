import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function getContentDir() {
  const prodContentDir = path.join(__dirname, "..", "dist", "content");
  const altContentDir = path.join(__dirname, "..", "content");
  
  if (fs.existsSync(prodContentDir)) {
    return prodContentDir;
  }
  return altContentDir;
}

const CONTENT_DIR = getContentDir();
const BRANDS_DIR = path.join(CONTENT_DIR, "marcas");
const TIPS_DIR = path.join(CONTENT_DIR, "dicas");

function capitalizeWords(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function generateBrandDescription(brandName) {
  return `Tutoriais de instalação para impressoras ${brandName}`;
}

function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const frontmatter = match[1];
  const body = match[2];
  const data = {};
  
  frontmatter.split("\n").forEach(line => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (value === "true") value = true;
      if (value === "false") value = false;
      data[key] = value;
    }
  });
  
  return { data, content: body };
}

function markdownToHtml(markdown) {
  return markdown
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\- (.*$)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>")
    .replace(/<p><h/g, "<h")
    .replace(/<\/h(\d)><\/p>/g, "</h$1>")
    .replace(/<p><ul>/g, "<ul>")
    .replace(/<\/ul><\/p>/g, "</ul>")
    .replace(/<p><li>/g, "<li>")
    .replace(/<\/li><\/p>/g, "</li>");
}

function loadTutorials() {
  const tutorials = [];
  
  if (!fs.existsSync(BRANDS_DIR)) {
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
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = parseFrontmatter(fileContent);
        
        if (!data.title || !data.slug) continue;
        
        const htmlContent = markdownToHtml(content);
        
        tutorials.push({
          title: data.title,
          slug: data.slug,
          brand: data.brand || capitalizeWords(brandSlug),
          brandSlug: data.brandSlug || brandSlug,
          readTime: data.readTime || "5 min",
          difficulty: data.difficulty || "Médio",
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

function loadBrands(preloadedTutorials) {
  const brands = [];
  const tutorials = preloadedTutorials || loadTutorials();
  
  if (!fs.existsSync(BRANDS_DIR)) {
    return brands;
  }
  
  const tutorialCount = {};
  for (const tutorial of tutorials) {
    tutorialCount[tutorial.brandSlug] = (tutorialCount[tutorial.brandSlug] || 0) + 1;
  }
  
  const brandDirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true });
  
  for (const brandDir of brandDirs) {
    if (!brandDir.isDirectory()) continue;
    
    const slug = brandDir.name;
    const count = tutorialCount[slug] || 0;
    
    if (count > 0) {
      const brandName = capitalizeWords(slug);
      
      brands.push({
        name: brandName,
        slug,
        description: generateBrandDescription(brandName),
        tutorialCount: count,
      });
    }
  }
  
  brands.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  
  return brands;
}

function loadTips() {
  const tips = [];
  
  if (!fs.existsSync(TIPS_DIR)) {
    return tips;
  }
  
  const markdownFiles = readMarkdownFiles(TIPS_DIR);
  
  for (const filePath of markdownFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(fileContent);
      
      if (!data.title || !data.slug) continue;
      
      const htmlContent = markdownToHtml(content);
      
      tips.push({
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        content: htmlContent,
        icon: data.icon || "Lightbulb",
        category: data.category || "geral",
      });
    } catch (error) {
      console.error(`Erro ao carregar dica ${filePath}:`, error);
    }
  }
  
  return tips;
}

let tutorials = [];
let brands = [];
let tips = [];

try {
  tutorials = loadTutorials();
  brands = loadBrands(tutorials);
  tips = loadTips();
  console.log(`Loaded: ${tutorials.length} tutorials, ${brands.length} brands, ${tips.length} tips`);
} catch (error) {
  console.error("Error loading content:", error);
}

app.get("/api/brands", (req, res) => {
  res.json(brands);
});

app.get("/api/brands/:slug", (req, res) => {
  const brand = brands.find(b => b.slug === req.params.slug);
  if (!brand) {
    return res.status(404).json({ message: "Marca não encontrada" });
  }
  res.json(brand);
});

app.get("/api/tutorials", (req, res) => {
  let result = [...tutorials];
  
  if (req.query.brand) {
    result = result.filter(t => t.brandSlug === req.query.brand);
  }
  
  if (req.query.popular === "true") {
    result = result.filter(t => t.isPopular === 1);
  }
  
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(t => 
      t.title.toLowerCase().includes(search) ||
      t.brand.toLowerCase().includes(search)
    );
  }
  
  res.json(result);
});

app.get("/api/tutorials/:slug", (req, res) => {
  const tutorial = tutorials.find(t => t.slug === req.params.slug);
  if (!tutorial) {
    return res.status(404).json({ message: "Tutorial não encontrado" });
  }
  res.json(tutorial);
});

app.get("/api/tips", (req, res) => {
  let result = [...tips];
  
  if (req.query.category) {
    result = result.filter(t => t.category === req.query.category);
  }
  
  res.json(result);
});

app.get("/api/tips/:slug", (req, res) => {
  const tip = tips.find(t => t.slug === req.params.slug);
  if (!tip) {
    return res.status(404).json({ message: "Dica não encontrada" });
  }
  res.json(tip);
});

const distPath = path.join(__dirname, "..", "dist", "public");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

export default app;
