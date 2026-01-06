import express from 'express';
import { getFeaturedProducts, searchProducts, searchProductById } from '../controllers/product.controller.js';

const router = express.Router();

// URL: /api/products/search?make_id=1
// URL: /api/products/search?make_id=1&model_id=5
// URL: /api/products/search?make_id=1&model_id=5&year=2018
router.get('/search', searchProducts );
router.get('/featured', getFeaturedProducts);
router.get('/search/:id', searchProductById );

export default router;