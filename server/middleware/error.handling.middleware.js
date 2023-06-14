import ApiError from "../error/api.error.js";

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected error!" });
};

export default errorHandlingMiddleware;
