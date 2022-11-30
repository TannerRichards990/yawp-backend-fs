const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const reviewAuth = require('../middleware/reviewAuth');
const { Review } = require('../models/Reviews');

module.exports = Router()
  .delete('/:id', [authenticate, reviewAuth], async (req, res, next) => {
    console.log(req.params);
    try {
      const review = await Review.deleteReview(req.params.id);
      console.log(review);
      if (!review)
        next();
      res.status(204);
      res.send();
    }
    catch (e) {
      next(e);
    }
  });
