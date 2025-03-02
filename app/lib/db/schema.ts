import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  profilePicture: text('profile_picture'),
  bio: text('bio'),
  theme: text('theme', { enum: ['light', 'dark'] }).default('light'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const mods = sqliteTable('mods', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  authorId: text('author_id').notNull().references(() => users.id),
  version: text('version').notNull(),
  downloads: integer('downloads').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const ratings = sqliteTable('ratings', {
  id: text('id').primaryKey(),
  modId: text('mod_id').notNull().references(() => mods.id),
  userId: text('user_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(),
  review: text('review'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});
