import type { Tutorial } from "@shared/schema";

/**
 * Converte tempo de leitura (ex: "5 min", "10 min") para formato ISO 8601
 * Necessário para Schema.org totalTime
 */
function convertReadTimeToISO8601(readTime: string): string {
  const match = readTime.match(/(\d+)/);
  if (!match) return "PT5M"; // default 5 minutos
  
  const minutes = parseInt(match[1]);
  return `PT${minutes}M`;
}

/**
 * Gera Schema.org JSON-LD para HowTo (tutoriais)
 * Melhora SEO e visibilidade em resultados de busca do Google
 */
export function generateHowToSchema(tutorial: Tutorial, baseUrl: string) {
  const steps = extractStepsFromMarkdown(tutorial.content);

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tutorial.title,
    "description": `Tutorial passo a passo para ${tutorial.title}`,
    "totalTime": convertReadTimeToISO8601(tutorial.readTime),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    })),
    "tool": [
      {
        "@type": "HowToTool",
        "name": tutorial.brand + " Impressora"
      }
    ]
  };
}

/**
 * Extrai passos do conteúdo markdown
 * Procura por headings h2 (## Passo X) e seu conteúdo
 */
function extractStepsFromMarkdown(htmlContent: string | null): Array<{name: string, text: string}> {
  if (!htmlContent) return [];

  const steps: Array<{name: string, text: string}> = [];
  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
  
  if (!tempDiv) return steps;

  tempDiv.innerHTML = htmlContent;
  
  const headings = tempDiv.querySelectorAll('h2');
  headings.forEach((heading, index) => {
    let text = '';
    let nextElement = heading.nextElementSibling;
    
    while (nextElement && nextElement.tagName !== 'H2') {
      text += nextElement.textContent + ' ';
      nextElement = nextElement.nextElementSibling;
    }

    steps.push({
      name: heading.textContent?.trim() || `Passo ${index + 1}`,
      text: text.trim().substring(0, 500) // Limita para não ficar muito longo
    });
  });

  return steps;
}

/**
 * Gera Open Graph meta tags para compartilhamento social
 */
export function generateOpenGraphTags(params: {
  title: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
}) {
  const { title, description, url, type = 'website', image } = params;
  
  return {
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:locale': 'pt_BR',
    'og:site_name': 'Guia de Instalação de Impressoras',
    ...(image && { 'og:image': image })
  };
}
