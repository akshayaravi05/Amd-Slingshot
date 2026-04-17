import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRecommendations } from './recommendation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load product data
const productsPath = path.join(__dirname, 'data', 'products.json');
let products = [];
try {
  const data = fs.readFileSync(productsPath, 'utf8');
  products = JSON.parse(data);
} catch (err) {
  console.error('Error reading products data:', err);
}

// Get all products with optional filtering
app.get('/api/products', (req, res) => {
  let result = [...products];

  const { category, minPrice, maxPrice, q, sort } = req.query;

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (q) {
    const search = q.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(search) || 
      p.description.toLowerCase().includes(search) ||
      p.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }

  if (sort) {
    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Mock newest by sorting ID descending
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }
  }

  res.json(result);
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Get product recommendations
app.post('/api/recommendations', (req, res) => {
  const { history, mood, budget, cartIds } = req.body;
  const recommended = getRecommendations(products, { history, mood, budget, cartIds });
  res.json(recommended);
});

// Get trending products (mock logic)
app.get('/api/trending', (req, res) => {
  // Return top rated products as trending
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  res.json(trending);
});

import http from 'http';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
