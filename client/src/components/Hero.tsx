import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Clean_desk_with_printer_setup_bc35366c.png";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-64 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Guias Simples para Instalar sua Impressora
        </h1>
        <p className="text-lg text-white/90 mb-6 max-w-2xl">
          Tutoriais passo a passo para todas as marcas. Encontre o guia perfeito para seu modelo.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Procure por modelo ou marca..."
              className="pl-10 pr-24 bg-white/95 backdrop-blur-sm"
              data-testid="input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="absolute right-1"
              size="sm"
              data-testid="button-search"
              type="submit"
            >
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
