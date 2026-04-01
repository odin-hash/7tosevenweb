-- 7toSEVEN Supabase Migration Script
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/sqckpolgomcfnbjvuzzz/sql

-- Drop existing tables
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS "Products" CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS collections CASCADE;

-- Products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  details TEXT,
  care TEXT,
  price NUMERIC(10,2) NOT NULL,
  compare_price NUMERIC(10,2),
  category TEXT,
  sizes TEXT[] DEFAULT '{}',
  stock JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  collection TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_sold_out BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections
CREATE TABLE collections (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2),
  shipping_fee NUMERIC(10,2),
  total NUMERIC(10,2),
  payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items (normalized)
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT,
  product_name TEXT,
  size TEXT,
  quantity INTEGER DEFAULT 1,
  price NUMERIC(10,2),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Disable RLS for anon key access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow anon to read products and collections
CREATE POLICY "anon_read_products" ON products FOR SELECT TO anon USING (true);
CREATE POLICY "anon_read_collections" ON collections FOR SELECT TO anon USING (true);

-- Allow anon to insert and read orders
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_read_orders" ON orders FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_read_order_items" ON order_items FOR SELECT TO anon USING (true);

-- Allow service_role full access (for seeding)
CREATE POLICY "service_all_products" ON products FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_all_collections" ON collections FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_all_orders" ON orders FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_all_order_items" ON order_items FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Also allow anon to insert products/collections (for seeding via API)
CREATE POLICY "anon_insert_products" ON products FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_collections" ON collections FOR INSERT TO anon WITH CHECK (true);
