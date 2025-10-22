# Site de Instalação de Impressoras

## Visão Geral
Site em português brasileiro focado em tutoriais de instalação de impressoras, otimizado para monetização com Google AdSense. O conteúdo é organizado por marcas de impressoras e inclui dicas gerais de manutenção.

## Objetivo
Fornecer guias passo a passo simplificados para instalação de impressoras, organizados por marca, com estrutura otimizada para SEO e Google Ads.

## Tecnologias
- **Frontend**: React + TypeScript, Wouter (routing), TanStack Query, Shadcn UI, Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Conteúdo**: Arquivos Markdown (.md) organizados em pastas
- **Parsing**: gray-matter para frontmatter YAML
- **Design**: Sistema de cores profissional azul/teal, tipografia Inter

## Estrutura do Projeto

### Backend (`server/`)
- `routes.ts`: APIs REST para marcas, tutoriais e dicas
- `storage.ts`: Armazenamento em memória que carrega dados dos arquivos markdown
- `markdown-loader.ts`: Sistema de leitura e parsing de arquivos .md

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

### Conteúdo (`content/`)

**IMPORTANTE**: Todo o conteúdo é gerenciado via arquivos Markdown!

```
content/
├── marcas/           # Tutoriais por marca
│   ├── hp/          # 3 tutoriais HP
│   ├── canon/       # 2 tutoriais Canon
│   ├── epson/       # 2 tutoriais Epson
│   ├── brother/     # 2 tutoriais Brother
│   ├── samsung/     # 1 tutorial Samsung
│   └── lexmark/     # 0 tutoriais (pasta pronta para usar)
├── dicas/           # 6 dicas (manutenção, segurança, etc)
└── solucoes/        # Pasta reservada para soluções futuras
```

#### Formato dos Arquivos Markdown

Cada arquivo .md tem metadados (frontmatter) e conteúdo:

```markdown
---
title: "Como Instalar Impressora HP DeskJet 2700"
slug: "hp-deskjet-2700"
brand: "HP"
brandSlug: "hp"
readTime: "5 min"
difficulty: "Fácil"
isPopular: true
---

## Passo 1: Título do Passo

Conteúdo do passo...

## Passo 2: Próximo Passo

Mais conteúdo...
```

### Dados (`shared/schema.ts`)
- **Brands**: id, name, slug, description, tutorialCount (calculado automaticamente)
- **Tutorials**: id, title, slug, brand, brandSlug, readTime, difficulty, content, isPopular
- **Tips**: id, title, slug, description, content, icon, category

## APIs Disponíveis

### Marcas
- `GET /api/brands` - Lista todas as marcas (contagem calculada dos arquivos .md)
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

## Conteúdo Atual

### Marcas (6 total)
1. **HP** - 3 tutoriais (DeskJet 2700, LaserJet Pro M404, OfficeJet 3833)
2. **Canon** - 2 tutoriais (PIXMA G3010, PIXMA TS3150)
3. **Epson** - 2 tutoriais (L3150, EcoTank L4260)
4. **Brother** - 2 tutoriais (DCP-T510W, HL-L2350DW)
5. **Samsung** - 1 tutorial (Xpress M2020W)
6. **Lexmark** - 0 tutoriais (pasta preparada)

### Dicas (6 total)
- **Destaque** (3): Manutenção Preventiva, Proteger Computador, Solução Rápida
- **Geral** (3): Atualizar Drivers, Melhorar WiFi, Erros Comuns

## Como Adicionar Conteúdo

### Para Adicionar um Tutorial:
1. Crie arquivo `.md` em `content/marcas/{marca}/`
2. Use o template do README.md
3. Preencha frontmatter e conteúdo
4. Reinicie o servidor

### Para Adicionar uma Dica:
1. Crie arquivo `.md` em `content/dicas/`
2. Use o template do README.md
3. Configure categoria ("destaque" ou "geral")
4. Reinicie o servidor

**Veja README.md para guia completo!**

## Funcionalidades Implementadas
- ✅ Sistema de conteúdo baseado em arquivos Markdown
- ✅ Carregamento automático de tutoriais, marcas e dicas
- ✅ Navegação por marcas via dropdown
- ✅ Busca em tempo real com debounce
- ✅ Páginas dinâmicas por marca
- ✅ Tutoriais passo a passo detalhados com conteúdo real
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

## Vantagens da Estrutura Atual

### Para Desenvolvimento Local
- ✅ Edita conteúdo em VS Code com preview markdown
- ✅ Controle de versão Git para todo o conteúdo
- ✅ Fácil fazer backup (tudo em arquivos)
- ✅ Busca e substituição em múltiplos arquivos

### Para Deploy
- ✅ Vercel, Netlify: Deploy automático via Git
- ✅ Sem necessidade de banco de dados
- ✅ Site estático e super rápido
- ✅ Custo zero de infraestrutura

### Para Gerenciamento
- ✅ Adicionar conteúdo sem mexer em código
- ✅ Estrutura organizada por pastas
- ✅ Formato markdown simples de entender
- ✅ Reutilizar conteúdo facilmente

## Próximos Passos

### Fase 2 - Mais Conteúdo
- [ ] Adicionar mais tutoriais para cada marca (meta: 5-10 por marca)
- [ ] Criar pasta `content/solucoes/` com soluções de problemas comuns
- [ ] Adicionar mais dicas gerais

### Fase 3 - Funcionalidades
- [ ] Integração real com Google AdSense e Analytics
- [ ] Sistema de busca mais avançado (filtros, autocomplete)
- [ ] Comentários/avaliações em tutoriais
- [ ] Newsletter para captura de leads
- [ ] Melhorias SEO (sitemap.xml, robots.txt)

### Fase 4 - Admin (Opcional)
- [ ] Painel admin para gerenciar conteúdo sem VS Code
- [ ] Upload de imagens para tutoriais
- [ ] Editor WYSIWYG para markdown
- [ ] Migração para banco de dados se necessário

## Como Executar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Workflow Git → Vercel
```bash
git add .
git commit -m "Adicionar novo tutorial"
git push origin main
# Vercel faz deploy automático!
```

O site estará disponível em http://localhost:5000

## Arquivos Importantes
- `README.md` - Guia completo de como adicionar conteúdo
- `content/` - Todo o conteúdo em markdown
- `server/markdown-loader.ts` - Sistema que lê os arquivos .md
- `server/storage.ts` - Carrega dados dos arquivos markdown
