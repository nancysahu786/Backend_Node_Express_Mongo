const errorMinddleware = (err, req, res, next) => {
  return res.status(500).send({ success: false, message: err.message });
};
export default errorMinddleware;
