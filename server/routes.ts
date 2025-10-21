import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.get("/api/brands/:slug", async (req, res) => {
    try {
      const brand = await storage.getBrandBySlug(req.params.slug);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brand" });
    }
  });

  app.get("/api/tutorials", async (req, res) => {
    try {
      const { brand, popular, search } = req.query;
      
      let tutorials;
      if (search && typeof search === 'string') {
        tutorials = await storage.searchTutorials(search);
      } else if (brand && typeof brand === 'string') {
        tutorials = await storage.getTutorialsByBrand(brand);
      } else if (popular === 'true') {
        tutorials = await storage.getPopularTutorials();
      } else {
        tutorials = await storage.getAllTutorials();
      }
      
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tutorials" });
    }
  });

  app.get("/api/tutorials/:slug", async (req, res) => {
    try {
      const tutorial = await storage.getTutorialBySlug(req.params.slug);
      if (!tutorial) {
        return res.status(404).json({ error: "Tutorial not found" });
      }
      res.json(tutorial);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tutorial" });
    }
  });

  app.get("/api/tips", async (req, res) => {
    try {
      const { category } = req.query;
      
      let tips;
      if (category && typeof category === 'string') {
        tips = await storage.getTipsByCategory(category);
      } else {
        tips = await storage.getAllTips();
      }
      
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tips" });
    }
  });

  app.get("/api/tips/:slug", async (req, res) => {
    try {
      const tip = await storage.getTipBySlug(req.params.slug);
      if (!tip) {
        return res.status(404).json({ error: "Tip not found" });
      }
      res.json(tip);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tip" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
