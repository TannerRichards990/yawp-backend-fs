const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const reviewAuth = require('../middleware/reviewAuth');
const { Review } = require('../models/Reviews');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getReviewById(req.params.id);
      if (!review) (next);
      res.json(review);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, reviewAuth], async (req, res, next) => {
    
    try {
      const review = await Review.deleteReview(req.params.id);
      
      if (!review)
        next();
      res.status(204);
      res.send();
    }
    catch (e) {
      next(e);
    }
  });
