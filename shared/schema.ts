import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const brands = pgTable("brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  tutorialCount: integer("tutorial_count").notNull().default(0),
});

export const tutorials = pgTable("tutorials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  brand: text("brand").notNull(),
  brandSlug: text("brand_slug").notNull(),
  readTime: text("read_time").notNull(),
  difficulty: text("difficulty").notNull(),
  content: text("content").notNull(),
  isPopular: integer("is_popular").notNull().default(0),
});

export const tips = pgTable("tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content"),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
});

export const insertTutorialSchema = createInsertSchema(tutorials).omit({
  id: true,
});

export const insertTipSchema = createInsertSchema(tips).omit({
  id: true,
});

export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;

export type InsertTutorial = z.infer<typeof insertTutorialSchema>;
export type Tutorial = typeof tutorials.$inferSelect;

export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tips.$inferSelect;
