const { Reviews } = require('../models/Reviews');

module.exports = async (req, res, next) => {
  try {
    const reviews = await Reviews.getReviewById(req.params.id);
    if (
      reviews &&
      (req.user.email === 'admin' || req.user.id === reviews.user_id)
    )
      next();
    else {
      throw new Error('Unauthorized');
    }
  } catch (e) {
    next(e);
  }
};
  
