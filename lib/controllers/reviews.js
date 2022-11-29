const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Reviews');

module.exports = Router()
  .delete('/:id', authenticate, 
    async (req, res, next) => {
      try {
        const review = await Review.deleteReview(req.params.id);
        if (!review) 
          next();
        res.status(204);
        res.send();
      } catch (e) {
        next(e);

      }
    });
    
