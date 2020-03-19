const passport = require("passport");
exports.authorize = () => (req, res, next) =>
  passport.authenticate("jwt", { session: false }, handleJWT(req, res, next))(
    req,
    res,
    next
  );
const handleJWT = (req, res, next) => async (err, user, info) => {
  const apiError = new {
    message: error ? error.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined
  }();
  if (err || info) {
    next(apiError);
  }
  console.log(info);
  return next();
};
