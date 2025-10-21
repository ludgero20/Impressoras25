import { Link } from "wouter";
import { Printer } from "lucide-react";

export default function Footer() {
  const brands = ["HP", "Canon", "Epson", "Brother", "Samsung"];
  const categories = [
    { name: "Instalação Básica", href: "/categoria/instalacao-basica" },
    { name: "Drivers e Software", href: "/categoria/drivers" },
    { name: "Conexão WiFi", href: "/categoria/wifi" },
    { name: "Solução de Problemas", href: "/categoria/problemas" },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Printer className="w-6 h-6 text-primary" />
              <span className="font-semibold">Instalação de Impressoras</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Guias completos e simplificados para instalar impressoras de todas as marcas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Marcas</h3>
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand}>
                  <Link href={`/marca/${brand.toLowerCase()}`}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {brand}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Dicas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dicas-gerais">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dicas Gerais
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/manutencao">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Manutenção
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cuidados-pc">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cuidados com PC
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Instalação de Impressoras. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
