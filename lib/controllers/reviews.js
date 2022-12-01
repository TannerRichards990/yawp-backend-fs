const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const reviewAuth = require('../middleware/reviewAuth');
const { Reviews } = require('../models/Reviews');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {

      const review = await Reviews.getReviewById(req.params.id);
      if (!review) next();
      res.json(review);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', [authenticate, reviewAuth], async (req, res, next) => {
    
    try {
      
      const review = await Reviews.deleteReview(req.params.id);
      
      if (!review)
        next();
      res.status(204);
      res.send();
    }
    catch (e) {
      next(e);
    }
  });
