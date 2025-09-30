
const express = require("express");
const cors = require("cors");
const data = require("./seed/seed.json");

const app = express();
app.use(cors());
app.use(express.json());

// Navigation
app.get("/api/navigation", (req, res) => res.json(data.navigation));

// Categories by slug
app.get("/api/categories/:slug", (req, res) => {
  const slug = req.params.slug;
  const categories = data.categories.filter(c => c.slug === slug);
  res.json(categories);
});

// Products by category
app.get("/api/products", (req, res) => {
  const { category } = req.query;
  const products = data.products.filter(p => p.category_id === category);
  res.json({ total: products.length, products });
});

// Product details
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = data.products.find(p => p.id === id);
  const detail = data.product_details.find(d => d.product_id === id);
  const reviews = data.reviews.filter(r => r.product_id === id);
  res.json({ product, detail, reviews });
});

// Dummy scrape
app.post("/api/scrape", (req, res) => {
  res.json({ status: "queued", job: req.body });
});

// Dummy view history
app.get("/api/view_history", (req, res) => {
  res.json([{ session_id: "abc123", viewed_product: "p1", viewed_at: new Date() }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
