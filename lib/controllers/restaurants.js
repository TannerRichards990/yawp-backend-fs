const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const router = Router();
const Restaurant = require('../models/Restaurants');

module.exports = router
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  });
