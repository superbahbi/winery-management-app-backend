exports.load = async (req, res, next, id) => {
  try {
    // Get id from database and req.locals result
    return next();
  } catch (error) {
    return next(error);
  }
};
