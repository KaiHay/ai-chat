// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { foreignKey, index, jsonb, pgTableCreator, uuid } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `my-chatbot_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const chats = createTable(
  "chats",
  (d) => ({
    id: d.varchar({length: 256}).primaryKey(),
    createdAt: d.timestamp({withTimezone: true}).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({withTimezone: true}).$onUpdate(() => new Date()),
  })
)
export const messages = createTable(
  "messages",
  (d) => ({
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: d.timestamp({withTimezone: true}).default(sql`CURRENT_TIMESTAMP`).notNull(),
    role: d.varchar({ length: 256 }).notNull(),
    content: d.text({}),
    parts: jsonb("parts").notNull(),
    chatId: d.varchar({length:256}),

  }),
  (t) => [foreignKey({ columns: [t.chatId], foreignColumns: [chats.id]})]

)