const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.message) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: err,
      });
    }
  } else {
    next();
  }
};

module.exports = errorHandler