# Design Guidelines: Printer Installation Tutorial Site

## Design Approach

**Selected Approach:** Material Design-inspired system with content-first philosophy
**Justification:** Information-dense tutorial content requires clarity, readability, and systematic organization. The site must balance user experience with ad placement optimization while maintaining professional credibility.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 100% 45% (Professional blue - tech/trust)
- Secondary: 210 20% 25% (Charcoal for text)
- Accent: 160 60% 45% (Teal for CTAs and highlights)
- Background: 210 15% 98% (Soft white)
- Surface: 0 0% 100% (Pure white for cards)
- Border: 210 15% 90% (Subtle dividers)

**Dark Mode:**
- Primary: 210 100% 60%
- Secondary: 210 15% 85%
- Accent: 160 50% 55%
- Background: 210 20% 10%
- Surface: 210 15% 15%
- Border: 210 15% 25%

### B. Typography

**Font Families:**
- Headings: 'Inter' (600-700 weight) - clean, modern, professional
- Body: 'Inter' (400-500 weight) - optimal readability for long-form content
- Code/Technical: 'JetBrains Mono' (for model numbers, technical specs)

**Scale:**
- H1: text-4xl (home hero) / text-3xl (internal)
- H2: text-2xl (section headers)
- H3: text-xl (tutorial steps, card titles)
- Body: text-base (articles) / text-sm (metadata)
- Small: text-xs (tags, auxiliary info)

### C. Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16 (e.g., p-4, gap-8, mb-12, py-16)

**Grid System:**
- Homepage cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Brand categories: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Tutorial content: Single column max-w-3xl for optimal reading

**Container Widths:**
- Main content: max-w-7xl
- Article content: max-w-3xl
- Wide sections: max-w-screen-xl

### D. Component Library

**Navigation:**
- Sticky header with logo, brand dropdown, search, and CTA
- Breadcrumbs for tutorial pages
- Footer with brand links, categories, and site info

**Homepage Components:**
- Hero banner (200-250px height) with site tagline and search
- Featured tips cards (3 columns, icon + title + excerpt + "Read More")
- Brand category grid (logo + name + tutorial count)
- Recent tutorials carousel
- General tips section (2 column cards)

**Tutorial Pages:**
- Article header (brand badge, title, meta info)
- Table of contents sidebar (desktop) / collapsible (mobile)
- Step-by-step numbered sections with clear headers
- Image placeholders for step illustrations (16:9 aspect ratio)
- Related tutorials sidebar/footer section
- Ad placement zones (after intro, mid-content, end)

**Cards:**
- Elevated design with subtle shadows (shadow-sm hover:shadow-md)
- Rounded corners (rounded-lg)
- Padding: p-6
- Hover state: scale-102 transition

**Buttons:**
- Primary: Solid accent color, px-6 py-3, rounded-lg
- Secondary: Outline style with border-2
- On images: Background blur (bg-white/10 backdrop-blur-md)

### E. Content Structure

**Homepage Sections (5-6 sections):**
1. Hero with search bar
2. Featured quick tips (3-4 cards)
3. Browse by brand (logo grid)
4. Latest installation guides (horizontal scroll/grid)
5. General care tips (2 column)
6. Footer with comprehensive links

**Tutorial Pages:**
- Clear step numbering with visual hierarchy
- Inline code styling for technical terms (bg-slate-100 px-2 py-1 rounded)
- Attention boxes for warnings/tips (border-l-4 with icon)
- Progress indicator for multi-step guides

### Images

**Hero Section:** 
Small hero banner (200-250px) featuring a clean desk setup with a modern printer, computer, and organized workspace - professional and approachable aesthetic. Use actual photo, not illustration.

**Tutorial Images:**
- Each tutorial step should have placeholder for screenshot/photo (<!-- IMAGE: Description -->)
- Recommended size: 800x450px (16:9)
- Style: Clean screenshots with subtle borders, or professional product photography

**Brand Logos:**
Use official brand logos for HP, Canon, Epson, Brother, Samsung, etc. in brand category section (transparent PNG, approximately 120x60px)

**Icon Usage:**
Material Icons for UI elements (search, menu, chevrons, info, warning, check-circle for completed steps)

### Ad Placement Strategy

Design includes reserved spaces for Google AdSense:
- Leaderboard (728x90) below header on desktop
- Rectangle (300x250) in sidebar
- In-article units between tutorial steps
- Responsive ad units for mobile
Maintain 60/40 content-to-ads ratio for optimal UX

### Accessibility & Performance

- Maintain WCAG AA contrast ratios
- Focus states with 2px outline offset
- Semantic HTML structure for SEO
- Lazy loading for tutorial images
- Clean, scannable content layout with ample whitespace