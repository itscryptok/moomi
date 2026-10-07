import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const referralSubmissions = pgTable("referral_submissions", {
  id: serial("id").primaryKey(),
  xPostUrl: text("x_post_url").notNull(),
  solanaWallet: text("solana_wallet").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  verified: boolean("verified").default(false),
  rewarded: boolean("rewarded").default(false),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url"),
  status: text("status").notNull().default("in_progress"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skillLogs = pgTable("skill_logs", {
  id: serial("id").primaryKey(),
  skillName: text("skill_name").notNull(),
  action: text("action").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReferralSchema = createInsertSchema(referralSubmissions).pick({
  xPostUrl: true,
  solanaWallet: true,
}).extend({
  xPostUrl: z.string().regex(
    /^https:\/\/(x\.com|twitter\.com)\/[a-zA-Z0-9_]+\/status\/\d+/,
    "Must be a valid X/Twitter post URL (e.g., https://x.com/username/status/123456)"
  ),
  solanaWallet: z.string().regex(
    /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    "Must be a valid Solana wallet address"
  ),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  url: true,
  status: true,
});

export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referralSubmissions.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type SkillLog = typeof skillLogs.$inferSelect;
