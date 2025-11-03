module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server",
  });
};
