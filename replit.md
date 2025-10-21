# Site de Instalação de Impressoras

## Visão Geral
Site em português brasileiro focado em tutoriais de instalação de impressoras, otimizado para monetização com Google AdSense. O conteúdo é organizado por marcas de impressoras e inclui dicas gerais de manutenção.

## Objetivo
Fornecer guias passo a passo simplificados para instalação de impressoras, organizados por marca, com estrutura otimizada para SEO e Google Ads.

## Tecnologias
- **Frontend**: React + TypeScript, Wouter (routing), TanStack Query, Shadcn UI, Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Storage**: In-memory storage (MemStorage) com dados iniciais
- **Design**: Sistema de cores profissional azul/teal, tipografia Inter

## Estrutura do Projeto

### Backend (`server/`)
- `routes.ts`: APIs REST para marcas, tutoriais e dicas
- `storage.ts`: Armazenamento em memória com dados iniciais de 6 marcas, 10 tutoriais e 6 dicas

### Frontend (`client/src/`)

#### Páginas
- **Home** (`pages/home.tsx`): Cards de dicas em destaque, grid de marcas, tutoriais populares
- **Marca** (`pages/brand.tsx`): Lista todos os tutoriais de uma marca específica
- **Tutorial** (`pages/tutorial.tsx`): Tutorial passo a passo completo com breadcrumbs
- **Busca** (`pages/search.tsx`): Busca dinâmica de tutoriais com debounce

#### Componentes
- `Header`: Navegação principal com dropdown de marcas, theme toggle
- `Hero`: Banner com imagem e busca integrada
- `TipCard`, `BrandCard`, `TutorialCard`: Cards reutilizáveis
- `AdSpace`: Espaços reservados para Google AdSense (leaderboard, rectangle, in-article, mobile)
- `Footer`: Links organizados por categoria

### Dados (`shared/schema.ts`)
- **Brands**: id, name, slug, description, tutorialCount
- **Tutorials**: id, title, slug, brand, brandSlug, readTime, difficulty, content, isPopular
- **Tips**: id, title, slug, description, content, icon, category

## APIs Disponíveis

### Marcas
- `GET /api/brands` - Lista todas as marcas
- `GET /api/brands/:slug` - Busca marca por slug

### Tutoriais
- `GET /api/tutorials` - Lista todos os tutoriais
- `GET /api/tutorials?brand=:slug` - Filtra por marca
- `GET /api/tutorials?popular=true` - Tutoriais populares
- `GET /api/tutorials?search=:query` - Busca por texto
- `GET /api/tutorials/:slug` - Busca tutorial por slug

### Dicas
- `GET /api/tips` - Lista todas as dicas
- `GET /api/tips?category=:category` - Filtra por categoria (destaque, geral)
- `GET /api/tips/:slug` - Busca dica por slug

## Marcas Disponíveis
1. HP (15 tutoriais)
2. Canon (12 tutoriais)
3. Epson (10 tutoriais)
4. Brother (8 tutoriais)
5. Samsung (6 tutoriais)
6. Lexmark (5 tutoriais)

## Funcionalidades Implementadas
- ✅ Navegação por marcas via dropdown
- ✅ Busca em tempo real com debounce
- ✅ Páginas dinâmicas por marca
- ✅ Tutoriais passo a passo detalhados
- ✅ Sistema de dificuldade (Fácil/Médio/Avançado)
- ✅ Tutoriais relacionados
- ✅ Dark mode
- ✅ Breadcrumbs de navegação
- ✅ Espaços para Google AdSense estrategicamente posicionados
- ✅ Design responsivo
- ✅ SEO otimizado (meta tags, títulos descritivos)

## Monetização - Google AdSense
Espaços publicitários reservados em:
- **Homepage**: Banner leaderboard (728x90) desktop / Mobile (320x100)
- **Tutoriais**: Rectangle (300x250) no topo + In-article responsivo no meio
- Todos os espaços estão marcados visualmente e prontos para receber código AdSense

## Próximos Passos (Fase 2)
- Integração real com Google AdSense e Analytics
- Sistema de busca mais avançado (filtros, autocomplete)
- Painel administrativo para gerenciar conteúdo
- Migração para banco de dados PostgreSQL
- Sistema de comentários/avaliações
- Newsletter para captura de leads
- Mais tutoriais e marcas

## Como Executar
```bash
npm install
npm run dev
```

O site estará disponível em http://localhost:5000
