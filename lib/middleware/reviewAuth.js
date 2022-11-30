const { Reviews } = require('../models/Reviews');

module.exports = async (req, res, next) => {
  console.log(req.params);
  try {
    const reviews = await Reviews.getReviewById(req.params.id);
    console.log('in middleware', reviews);
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
  
