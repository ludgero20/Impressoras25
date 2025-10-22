# 📄 Guia de Gerenciamento de Conteúdo

## 📁 Estrutura de Arquivos

Todo o conteúdo do site é gerenciado através de arquivos Markdown (.md) organizados em pastas:

```
content/
├── marcas/           # Tutoriais de instalação por marca
│   ├── hp/
│   ├── canon/
│   ├── epson/
│   ├── brother/
│   ├── samsung/
│   └── lexmark/
├── dicas/            # Dicas gerais e manutenção
└── solucoes/         # Soluções de problemas (futuro)
```

## ✍️ Como Adicionar um Novo Tutorial

### 1. Escolha a Pasta da Marca

Navegue até `content/marcas/` e escolha a pasta da marca da impressora (hp, canon, epson, brother, samsung, lexmark).

### 2. Crie um Novo Arquivo .md

Crie um arquivo com nome descritivo usando kebab-case (letras minúsculas separadas por hífen):
- ✅ Bom: `hp-envy-6055.md`, `canon-mg3010.md`
- ❌ Ruim: `HP Envy 6055.md`, `tutorial_novo.md`

### 3. Use Este Template

```markdown
---
title: "Como Instalar Impressora [Modelo Completo]"
slug: "nome-do-arquivo-sem-extensao"
brand: "Nome da Marca"
brandSlug: "nome-da-pasta"
readTime: "5 min"
difficulty: "Fácil"
isPopular: false
---

## Passo 1: Título do Primeiro Passo

Descrição detalhada do que fazer neste passo. Seja claro e direto.

## Passo 2: Título do Segundo Passo

Continue com instruções passo a passo.

## Passo 3: Título do Terceiro Passo

Adicione quantos passos forem necessários.
```

### 4. Preencha os Metadados (Frontmatter)

Os metadados ficam entre `---` no topo do arquivo:

- **title**: Título completo que aparece no site (ex: "Como Instalar HP DeskJet 2700")
- **slug**: Nome único para URL (igual ao nome do arquivo, sem .md)
- **brand**: Nome da marca como aparece no site ("HP", "Canon", "Epson", etc.)
- **brandSlug**: Slug da pasta da marca ("hp", "canon", "epson", etc.)
- **readTime**: Tempo estimado de leitura ("5 min", "8 min", etc.)
- **difficulty**: "Fácil", "Médio" ou "Avançado"
- **isPopular**: `true` para destacar na homepage, `false` caso contrário

### 5. Escreva o Conteúdo

- Use `## ` (dois ##) para títulos de passos
- Escreva parágrafos normalmente (sem marcação especial)
- Cada passo deve ter um título descritivo
- Seja claro e objetivo nas instruções
- Use linguagem simples e acessível

### 6. Salve e Reinicie o Servidor

Após salvar o arquivo, reinicie o servidor para carregar o novo conteúdo:
- No Replit: O servidor reinicia automaticamente
- Localmente: Pare (`Ctrl+C`) e rode `npm run dev` novamente

## 🔧 Como Adicionar uma Nova Dica

### 1. Crie o Arquivo em `content/dicas/`

```markdown
---
title: "Título da Dica"
slug: "titulo-da-dica"
description: "Breve descrição que aparece no card da homepage (1-2 linhas)."
icon: "Wrench"
category: "destaque"
---

## Subtítulo da Seção

Conteúdo da dica. Pode ter múltiplas seções e parágrafos.

## Outra Seção

Mais conteúdo útil.
```

### 2. Metadados das Dicas

- **title**: Título da dica
- **slug**: Nome único para URL
- **description**: Resumo curto (aparece no card)
- **icon**: Nome do ícone do Lucide React (Wrench, Shield, Zap, etc.)
- **category**: `"destaque"` (aparece na homepage) ou `"geral"` (apenas em /dicas)

### 3. Ícones Disponíveis

Alguns ícones úteis do Lucide React:
- `Wrench` - Ferramentas/Manutenção
- `Shield` - Segurança/Proteção
- `Zap` - Rápido/Solução
- `HardDrive` - Hardware/Drivers
- `Wifi` - Conexão/Rede
- `AlertCircle` - Aviso/Erro
- `Settings` - Configurações
- `Download` - Downloads
- `Printer` - Impressora

## 📋 Dicas de Formatação

### Headers (Títulos)
- Use `## ` para criar títulos de seções (renderiza como `<h3>`)
- Não use `#` (um #) sozinho - reserve para o título no frontmatter

### Parágrafos
- Escreva parágrafos normalmente
- Deixe uma linha em branco entre parágrafos diferentes

### Listas (futuro)
Se precisar de listas, adicione suporte no `markdown-loader.ts` ou use parágrafos numerados:
```markdown
1. Primeiro item
2. Segundo item
3. Terceiro item
```

### Negrito e Itálico
- **Negrito**: `**texto**` (futuro - precisa adicionar suporte)
- *Itálico*: `*texto*` (futuro - precisa adicionar suporte)

## 🚀 Workflow Completo

1. **Edite localmente** em VS Code com preview de markdown
2. **Commit no Git**: `git add .` → `git commit -m "Adicionar tutorial X"`
3. **Push para GitHub**: `git push origin main`
4. **Deploy automático** na Vercel (ou plataforma configurada)

## 🔍 Verificar Conteúdo

### Ver Todos os Tutoriais
```bash
ls -la content/marcas/*/
```

### Ver Todas as Dicas
```bash
ls -la content/dicas/
```

### Contar Tutoriais por Marca
```bash
find content/marcas/ -name "*.md" | wc -l
```

## ⚠️ Regras Importantes

1. **Slugs únicos**: Cada arquivo deve ter um slug único (não pode repetir)
2. **Nomes de arquivo = slug**: O nome do arquivo deve ser igual ao slug no frontmatter
3. **Sem acentos em slugs**: Use apenas letras, números e hífens
4. **Frontmatter obrigatório**: Todo arquivo .md deve ter metadados no topo
5. **Encoding UTF-8**: Salve arquivos em UTF-8 para acentos funcionarem

## 🎯 Exemplos Prontos

### Tutorial Simples
```markdown
---
title: "Instalar HP DeskJet 1115"
slug: "hp-deskjet-1115"
brand: "HP"
brandSlug: "hp"
readTime: "4 min"
difficulty: "Fácil"
isPopular: false
---

## Passo 1: Conectar a Impressora

Conecte o cabo USB da impressora ao computador.

## Passo 2: Baixar Driver

Acesse hp.com/drivers e baixe o driver da DeskJet 1115.

## Passo 3: Instalar

Execute o arquivo baixado e siga as instruções na tela.

## Passo 4: Testar

Imprima uma página de teste para confirmar.
```

### Dica Simples
```markdown
---
title: "Economizar Tinta"
slug: "economizar-tinta"
description: "Aprenda truques para reduzir o gasto de tinta e economizar."
icon: "DollarSign"
category: "geral"
---

## Usar Modo Rascunho

Configure a impressora para modo rascunho ou economia de tinta nas opções de impressão.

## Revisar Antes de Imprimir

Sempre use a visualização de impressão para evitar reimpressões.
```

## 📞 Precisa de Ajuda?

- Veja os arquivos existentes em `content/marcas/` e `content/dicas/` como referência
- Todos seguem o mesmo padrão
- Copie e adapte um arquivo existente se tiver dúvida

---

**Lembre-se**: Após adicionar ou editar arquivos, reinicie o servidor para ver as mudanças!
