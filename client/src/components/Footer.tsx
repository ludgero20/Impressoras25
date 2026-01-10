import { Link } from "wouter";
import { Printer } from "lucide-react";

export default function Footer() {
  const brands = ["HP", "Canon", "Epson", "Brother", "Samsung", "Lexmark"];
  const dicas = [
    { name: "Todas as Dicas", href: "/dicas-gerais" },
    { name: "Manutenção Preventiva", href: "/dica/manutencao-preventiva" },
    { name: "Atualizar Drivers", href: "/dica/atualizar-drivers" },
    { name: "Melhorar WiFi", href: "/dica/melhorar-wifi" },
    { name: "Erros Comuns", href: "/dica/erros-comuns" },
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
            <h3 className="font-semibold mb-4">Dicas</h3>
            <ul className="space-y-2">
              {dicas.map((dica) => (
                <li key={dica.name}>
                  <Link href={dica.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {dica.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sobre
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacidade">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Política de Privacidade
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 Instalação de Impressoras. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/sobre">
              <span className="hover:text-foreground transition-colors">Sobre</span>
            </Link>
            <Link href="/privacidade">
              <span className="hover:text-foreground transition-colors">Privacidade</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
