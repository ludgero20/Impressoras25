import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Em desenvolvimento, ainda pegamos o template do diretório client
      const clientTemplate = path.resolve(
        process.cwd(), // Usar process.cwd() aqui também para consistência
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

// Modificada para produção na Vercel
export function serveStatic(app: Express) {
  // Caminho ajustado para funcionar na Vercel após o build
  const distPath = path.resolve(process.cwd(), 'dist', 'public');
  console.log('@@@ Servindo arquivos estáticos de:', distPath); // Log para depuração
  console.log('@@@ Existe distPath?', fs.existsSync(distPath)); // Log para depuração

  if (!fs.existsSync(distPath)) {
    console.error(`!!!! ERRO CRÍTICO: Diretório dist/public não encontrado em ${distPath}`);
    // Se o diretório não existe, não faz sentido continuar a configuração estática.
    // O fallback abaixo lidará com as requisições, mas provavelmente resultará em erros.
     app.use("*", (_req, res) => {
       res.status(500).send(`Erro de configuração do servidor: Caminho dos assets estáticos (dist/public) não encontrado.`);
     });
     return; // Para aqui se o diretório não existe
  }

  // Serve os arquivos estáticos (CSS, JS, imagens) da pasta dist/public
  app.use(express.static(distPath, {
    index: false // Não serve index.html automaticamente, deixamos o fallback fazer isso
  }));

  // Fallback para SPA: para qualquer outra requisição, serve o index.html
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    console.log('@@@ Fallback SPA: Servindo index.html de:', indexPath); // Log
     if (fs.existsSync(indexPath)) {
       res.sendFile(indexPath);
     } else {
       console.error(`!!!! ERRO CRÍTICO: index.html não encontrado em ${indexPath}`); // Log de erro
       res.status(404).send('Página não encontrada (Recurso principal ausente).');
     }
  });
}