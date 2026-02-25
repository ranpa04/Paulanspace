# Inventory Manager

A full-stack inventory management web app built with Node.js + Express + SQLite (backend) and React + Vite + Tailwind CSS (frontend).

## Features

- 📦 Browse all products in a responsive grid
- ➕ Add new products via a modal form
- 🗑️ Delete products with a confirmation dialog
- ±  Adjust product quantities with +/− buttons
- 🔍 Search products by name, SKU, or description
- 🏷️ Filter products by category
- 📊 Live stats: total products, total items, total value, low stock, out of stock
- 🌱 Database auto-seeded with 20 products on first run

## Tech Stack

- **Backend**: Node.js, Express, better-sqlite3 (SQLite)
- **Frontend**: React 18, Vite, Tailwind CSS v3

## Project Structure

```
├── backend/
│   ├── package.json
│   ├── server.js       # Express REST API (port 3001)
│   └── database.js     # SQLite setup + seed data
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        └── components/
            ├── StatsBar.jsx
            ├── ProductGrid.jsx
            ├── ProductCard.jsx
            ├── AddProductModal.jsx
            └── DeleteConfirmModal.jsx
```

## Getting Started

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start the backend

```bash
cd backend && npm start
# Runs on http://localhost:3001
```

### 3. Start the frontend

```bash
cd frontend && npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (supports `?search=` and `?category=`) |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| PATCH | `/api/products/:id/quantity` | Update product quantity only |
| DELETE | `/api/products/:id` | Delete a product |

Paulanvibecoding
