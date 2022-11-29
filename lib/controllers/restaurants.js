const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const router = Router();
const Restaurant = require('../models/Restaurants');
const Reviews = require('../models/Reviews');

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
  })

  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Reviews.insertReview({
        detail: req.body.detail,
        restaurantId: req.params.id,
        stars: 5,
        userId: req.user.id,
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
