const handleCastErrorDB = (err) =>
  `Valor inválido para ${err.path}: ${err.value}`;

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue || {})[0];
  const value = field ? err.keyValue[field] : "";
  return `El valor '${value}' ya está en uso para el campo '${field}'`;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return `Datos inválidos: ${errors.join(". ")}`;
};

const errorMessageByType = (err) => {
  if (err.name === "CastError") return handleCastErrorDB(err);
  if (err.code === 11000) return handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") return handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") return "Token inválido";
  if (err.name === "TokenExpiredError") return "Tu sesión expiró, iniciá sesión de nuevo";
  return null;
};

const statusCodeByType = (err) => {
  if (err.name === "CastError") return 400;
  if (err.code === 11000) return 409;
  if (err.name === "ValidationError") return 400;
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") return 401;
  return err.statusCode || 500;
};

const globalErrorHandler = (err, req, res, next) => {
  const knownMessage = err.isOperational ? err.message : errorMessageByType(err);
  const statusCode = err.isOperational ? err.statusCode : statusCodeByType(err);

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? "error" : "fail",
    message: knownMessage || "Ocurrió un error interno, intentá de nuevo más tarde",
  });
};

export default globalErrorHandler;
