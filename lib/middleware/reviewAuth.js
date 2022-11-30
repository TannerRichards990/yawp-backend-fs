const Reviews = require('../models/Reviews');

module.exports = async (req, res, next) => {
  try {
    const reviews = await Reviews.getReviewById(req.params.id);
    if (
      req.user &&
      (req.user.id === reviews.user_id || req.user.email === 'admin')
    ) {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (e) {
    next(e);
  }
};

