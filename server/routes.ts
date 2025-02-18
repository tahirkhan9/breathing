import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/sessions", async (req, res) => {
    const parsed = insertSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const session = await storage.createSession(parsed.data);
    res.json(session);
  });

  app.get("/api/sessions", async (req, res) => {
    const sessions = await storage.getSessions();
    res.json(sessions);
  });

  app.post("/api/sessions/:id/complete", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid session ID" });
    }
    try {
      const session = await storage.completeSession(id);
      res.json(session);
    } catch (error) {
      res.status(404).json({ error: "Session not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
