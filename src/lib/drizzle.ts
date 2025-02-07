import { sql } from '@vercel/postgres';
import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';


export const cartTable = pgTable('cartdata', {
  id: serial('id').primaryKey(), 
  user_id: varchar('user_id', { length: 255 }).notNull(), 
  product_id: varchar('product_id', { length: 255 }).notNull(), 
  product_title: varchar('product_title', { length: 255 }), 
  product_price: integer('product_price'), 
  product_quantity: integer('product_quantity'), 
  status: varchar('status').default('pending').notNull(),
  image_url: varchar('image_url', { length: 500 }), 
});


export const userTable = pgTable("users", {
  id: varchar("id", { length: 255 }).notNull(), 
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(), 
  password: varchar("password", { length: 255 }).notNull(), 
  role: varchar("role", { length: 50 }).default("user").notNull(), 
  created: timestamp('user_since')
});

export const db = drizzle(sql)