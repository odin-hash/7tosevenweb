# 7toSEVEN - Premium Streetwear E-commerce

## Problem Statement
Build a premium streetwear e-commerce store for "7toSEVEN" with dark, minimal, aggressive aesthetic inspired by Bluorng.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI + Glassmorphism design system
- **Backend**: FastAPI (Python) with in-memory product data + MongoDB for orders
- **Design**: Premium dark glassmorphism - floating glass navbar, rounded cards, pill buttons, smooth transitions

## What's Been Implemented (Feb 2026)

### Iteration 1 - MVP
- Full 7-page e-commerce frontend
- Cart Context with localStorage
- 8 seed products, collections, drop stories
- Backend API, order creation, free shipping logic

### Iteration 2 - Premium UI Overhaul
- Lightning bolt brand logo integrated (header + footer watermark)
- Floating glass navbar with backdrop blur (20px radius)
- Full-bleed hero: "BOLD. ELECTRIC. FEARLESS." with dark overlay
- Floating rotating bolt element on hero
- Product cards with 16px rounded corners + hover zoom (1.03 scale)
- Pill buttons (border-radius: 999px) throughout
- Glassmorphism on navbar, cart drawer, overlays, filters
- Generous spacing system (16/24/40/64px)
- Mobile-responsive with hamburger menu
- Removed all harsh boxes, tight spacing, default styling

### Iteration 3 - UI Cleanup & Stabilization
- Removed announcement/marquee bar
- Removed all rotating/floating logo animations
- Removed all "7toSEVEN" text — logo-only branding throughout
- Fixed header/cart z-index layering (navbar z-40, cart z-50)
- Added "Relentless Evolution" tagline under hero headline
- Increased headline line-height to 1.35 for readability
- Order status set to "pending" (ready for payment integration)
- Supabase tables confirmed existing (Products, orders, order_items, collections) but have only default columns (id, created_at) — need proper schema

## Prioritized Backlog
### P0
- Supabase schema: Add proper columns to tables (name, slug, price, etc.) via SQL Editor
- Razorpay payment integration

### P1
- Product search, wishlist persistence, real product images

### P2
- User auth, order tracking, admin panel, email notifications
