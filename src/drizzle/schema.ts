// db/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
    token: text('token'),
    image: text('image'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => ({
    uniqueIdx: uniqueIndex('unique_idx').on(users.email),
  }),
);

export const themen = pgTable('themen', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const vorschlaege = pgTable('vorschlaege', {
  id: serial('id').primaryKey(),
  themaId: integer('thema_id')
    .references(() => themen.id)
    .notNull(),
  ueberschrift: text('ueberschrift').notNull(),
  text: text('text').notNull(),
  likes: integer('likes').default(0).notNull(),
  comments: integer('comments').default(0).notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export const kommentare = pgTable('kommentare', {
  id: serial('id').primaryKey(),
  vorschlagId: integer('vorschlag_id')
    .references(() => vorschlaege.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  text: text('text').notNull(),
  likes: integer('likes').default(0).notNull(),
});

export const userLikes = pgTable('user_likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  vorschlagId: integer('vorschlag_id')
    .references(() => vorschlaege.id)
    .notNull(),
});

// New table for comment likes
export const commentLikes = pgTable('comment_likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  commentId: integer('comment_id')
    .references(() => kommentare.id)
    .notNull(),
});

// Type exports
export type User = InferModel<typeof users>;
export type Thema = InferModel<typeof themen>;
export type Vorschlag = InferModel<typeof vorschlaege>;
export type Kommentar = InferModel<typeof kommentare>;
export type UserLike = InferModel<typeof userLikes>;
export type CommentLike = InferModel<typeof commentLikes>;

// Extended types for joined data
export type ThemaWithVorschlaege = Thema & {
  vorschlaege: Vorschlag[];
};
