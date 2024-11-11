// db/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => ({
    uniqueIdx: uniqueIndex("unique_idx").on(users.email),
  }),
);

export const themen = pgTable("themen", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const vorschlaege = pgTable("vorschlaege", {
  id: serial("id").primaryKey(),
  themaId: integer("thema_id")
    .references(() => themen.id)
    .notNull(),
  ueberschrift: text("ueberschrift").notNull(),
  text: text("text").notNull(),
  likes: integer("likes").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
});

export const kommentare = pgTable("kommentare", {
  id: serial("id").primaryKey(),
  vorschlagId: integer("vorschlag_id")
    .references(() => vorschlaege.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  text: text("text").notNull(),
  likes: integer("likes").default(0).notNull(),
});

export const userLikes = pgTable("user_likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  vorschlagId: integer("vorschlag_id")
    .references(() => vorschlaege.id)
    .notNull(),
});
