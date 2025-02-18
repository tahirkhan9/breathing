import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  exerciseName: text("exercise_name").notNull(),
  inhaleTime: integer("inhale_time").notNull(),
  holdTime: integer("hold_time").notNull(),
  exhaleTime: integer("exhale_time").notNull(),
  rounds: integer("rounds").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({ 
  id: true,
  completed: true 
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
