import { pgTable, integer, text,  timestamp, serial,  } from "drizzle-orm/pg-core";


// State table 1
export const bookTable = pgTable('bookTable', {
    book_id: serial('book_id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    year: integer('year').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

export type TIBook = typeof bookTable.$inferInsert;
export type TSBookSelect = typeof bookTable.$inferSelect;
