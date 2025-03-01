import CustomError from "../helpers/error/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  let customError = err;
  
  console.log(customError.message, customError.status);
    
    if (err.name === "SyntaxError") {
      customError = new CustomError("Unexpected Syntax", 400);
    }
    if (err.name === "ValidationError") {
      customError = new CustomError(err.message, 400);
    }

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error",
  });
  
};
export default customErrorHandler