module.exports = errorHandler = ({req, res, status=500, err}) => {
  res.status(status).json({
    message: err
  });
  console.log(err);
}