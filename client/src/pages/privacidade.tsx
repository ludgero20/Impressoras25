import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-muted/30 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
              { label: "Início", href: "/" },
              { label: "Política de Privacidade" }
            ]} />

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Política de Privacidade
            </h1>

            <p className="text-lg text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Informações que Coletamos</h2>
            <p>
              Nosso site é informativo e não requer cadastro ou login. As únicas informações 
              coletadas são aquelas fornecidas automaticamente pelo seu navegador quando você 
              visita nosso site.
            </p>

            <h3>1.1 Informações de Navegação</h3>
            <p>
              Coletamos automaticamente informações básicas sobre sua visita, incluindo:
            </p>
            <ul>
              <li>Endereço IP (anonimizado)</li>
              <li>Tipo de navegador e sistema operacional</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Origem de acesso (link de referência)</li>
            </ul>

            <h3>1.2 Cookies</h3>
            <p>
              Utilizamos cookies apenas para:
            </p>
            <ul>
              <li>Lembrar suas preferências de tema (modo claro/escuro)</li>
              <li>Analisar o tráfego do site através de ferramentas de análise</li>
              <li>Exibir anúncios relevantes através do Google AdSense</li>
            </ul>

            <h2>2. Google AdSense</h2>
            <p>
              Este site exibe anúncios fornecidos pelo Google AdSense. O Google pode usar 
              cookies para exibir anúncios com base em suas visitas anteriores a este site 
              ou outros sites. Você pode desativar a personalização de anúncios visitando as 
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Configurações de Anúncios do Google
              </a>.
            </p>

            <h3>2.1 Cookies de Terceiros</h3>
            <p>
              O Google AdSense e seus parceiros podem usar cookies e tecnologias semelhantes para:
            </p>
            <ul>
              <li>Exibir anúncios personalizados com base em suas visitas anteriores</li>
              <li>Medir a efetividade dos anúncios</li>
              <li>Prevenir fraudes e melhorar a segurança</li>
            </ul>

            <h2>3. Google Analytics</h2>
            <p>
              Utilizamos o Google Analytics para entender como os visitantes usam nosso site. 
              O Google Analytics coleta informações de forma anônima, incluindo:
            </p>
            <ul>
              <li>Número de visitantes e páginas visualizadas</li>
              <li>Duração das visitas</li>
              <li>Localização geográfica aproximada (cidade/país)</li>
              <li>Dispositivo usado para acessar o site</li>
            </ul>
            <p>
              Essas informações nos ajudam a melhorar o conteúdo e a experiência do site.
            </p>

            <h2>4. Como Usamos as Informações</h2>
            <p>
              As informações coletadas são utilizadas exclusivamente para:
            </p>
            <ul>
              <li>Melhorar a qualidade e relevância do nosso conteúdo</li>
              <li>Entender quais tutoriais são mais úteis</li>
              <li>Identificar problemas técnicos e melhorar a performance do site</li>
              <li>Exibir anúncios relevantes (através do Google AdSense)</li>
            </ul>

            <h2>5. Compartilhamento de Dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
              exceto:
            </p>
            <ul>
              <li>Google Analytics e Google AdSense (conforme descrito acima)</li>
              <li>Quando exigido por lei ou ordem judicial</li>
            </ul>

            <h2>6. Segurança</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para 
              proteger as informações coletadas contra acesso não autorizado, alteração, 
              divulgação ou destruição.
            </p>

            <h2>7. Links Externos</h2>
            <p>
              Nosso site pode conter links para sites de terceiros (como sites de fabricantes 
              de impressoras para download de drivers). Não somos responsáveis pelas práticas 
              de privacidade desses sites. Recomendamos ler as políticas de privacidade de 
              qualquer site que você visitar.
            </p>

            <h2>8. Seus Direitos</h2>
            <p>
              Você tem o direito de:
            </p>
            <ul>
              <li>Desativar cookies no seu navegador (isso pode afetar a funcionalidade do site)</li>
              <li>Optar por não receber anúncios personalizados do Google</li>
              <li>Solicitar informações sobre dados coletados</li>
            </ul>

            <h2>9. Menores de Idade</h2>
            <p>
              Nosso site não é direcionado a menores de 13 anos e não coletamos intencionalmente 
              informações de crianças. Se você é pai ou responsável e acredita que seu filho 
              forneceu informações ao nosso site, entre em contato conosco.
            </p>

            <h2>10. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos 
              alterações significativas, atualizaremos a data no topo desta página. Recomendamos 
              revisar esta política periodicamente para se manter informado sobre como protegemos 
              suas informações.
            </p>

            <h2>11. Conformidade com a LGPD</h2>
            <p>
              Este site está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 
              nº 13.709/2018). Tratamos dados pessoais de forma transparente, segura e em 
              conformidade com a legislação brasileira.
            </p>

            <h2>12. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento 
              de seus dados, você pode entrar em contato através das informações disponíveis 
              na página <a href="/sobre" className="text-primary hover:underline">Sobre</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
