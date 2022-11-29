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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const response = await Restaurant.getById(req.params.restId);
      await response.addReviews();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
