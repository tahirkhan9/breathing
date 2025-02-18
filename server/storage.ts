import { sessions, type Session, type InsertSession } from "@shared/schema";

export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  getSessions(): Promise<Session[]>;
  completeSession(id: number): Promise<Session>;
}

export class MemStorage implements IStorage {
  private sessions: Map<number, Session>;
  private currentId: number;

  constructor() {
    this.sessions = new Map();
    this.currentId = 1;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentId++;
    const session: Session = { ...insertSession, id, completed: false };
    this.sessions.set(id, session);
    return session;
  }

  async getSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  async completeSession(id: number): Promise<Session> {
    const session = this.sessions.get(id);
    if (!session) {
      throw new Error("Session not found");
    }
    const updatedSession = { ...session, completed: true };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();
