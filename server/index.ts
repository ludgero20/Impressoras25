import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite"; // Mantenha a importação
import http from "http"; // Import http para criar o servidor
import path from 'path'; // Necessário para servir estáticos

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Middlewares básicos (mantidos)
declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Middleware de log (mantido)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: Record<string, any> | undefined, ...args: any[]) { // Tipagem ajustada
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args] as any); // Cast para 'any' pode ser necessário
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Ajuste no slice para evitar cortar no meio de caracteres multi-byte
      const maxLength = 80;
      if (Buffer.byteLength(logLine, 'utf8') > maxLength) {
        logLine = Buffer.from(logLine, 'utf8').slice(0, maxLength - 1).toString('utf8') + "…";
      }

      log(logLine);
    }
  });

  next();
});

// --- Início da Lógica Principal ---

(async () => {
  // 1. Registrar rotas da API PRIMEIRO
  await registerRoutes(app); // registerRoutes agora só adiciona rotas, não cria mais o servidor http

  // 2. Configurar Servidor Estático e Fallback SPA (APENAS em produção)
  if (process.env.NODE_ENV === "production") {
    console.log("@@@ Modo Produção: Configurando serveStatic");
    serveStatic(app); // Chama a função modificada de server/vite.ts
  } else {
    // 3. Configurar Vite Dev Server (APENAS em desenvolvimento)
    console.log("@@@ Modo Desenvolvimento: Configurando setupVite");
    const httpServerForVite = http.createServer(app); // Cria servidor http aqui para o Vite HMR
    await setupVite(app, httpServerForVite);
    // Em desenvolvimento, o Vite lida com o index.html e assets
     httpServerForVite.listen(PORT, '0.0.0.0', () => {
       console.log(`Servidor de Desenvolvimento (Vite) rodando em http://localhost:${PORT}`);
     });
     return; // Não executa o resto se estiver em dev
  }

  // Middleware de tratamento de erro (após rotas e estáticos)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("!!!! ERRO NÃO TRATADO:", err); // Log do erro
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Apenas inicia o servidor http padrão em produção
  if (process.env.NODE_ENV === "production") {
    const httpServer = http.createServer(app);
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor de Produção rodando em http://localhost:${PORT}`);
      console.log(`Ambiente NODE_ENV: ${process.env.NODE_ENV}`); // Confirma o ambiente
    });
  }
})();

// Exportar 'app' pode ser necessário para Vercel detectar o servidor
// module.exports = app; // Use isso se estiver usando CommonJS (verifique seu tsconfig)
export default app; // Use isso se estiver usando ES Modules (provável, dado o seu setup)