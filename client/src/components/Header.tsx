import { Link } from "wouter";
import { Printer, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const brands = [
    { name: "HP", slug: "hp" },
    { name: "Canon", slug: "canon" },
    { name: "Epson", slug: "epson" },
    { name: "Brother", slug: "brother" },
    { name: "Samsung", slug: "samsung" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
            <Printer className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">Instalação de Impressoras</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" data-testid="button-brands-menu">
                  Marcas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {brands.map((brand) => (
                  <DropdownMenuItem key={brand.slug} asChild>
                    <Link href={`/marca/${brand.slug}`} data-testid={`link-brand-${brand.slug}`}>
                      {brand.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/dicas-gerais">
              <Button variant="ghost" data-testid="link-general-tips">
                Dicas Gerais
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dicas-gerais">Dicas Gerais</Link>
                </DropdownMenuItem>
                {brands.map((brand) => (
                  <DropdownMenuItem key={brand.slug} asChild>
                    <Link href={`/marca/${brand.slug}`}>{brand.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
