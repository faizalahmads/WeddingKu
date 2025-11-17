const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());

// Import routes
const { verifyToken, authorizeRoles } = require("./middleware/auth");
const guestRoutes = require("./routes/guests");
const authRoutes = require("./routes/auth");
const invitationRoutes = require("./routes/invitationRoutes");
const undanganRoutes = require("./routes/undanganRoutes");
const themesRoute = require("./routes/themes");

// Pakai routes
app.use("/auth", authRoutes);
app.use("/api", guestRoutes);
app.use("/api", undanganRoutes);
app.use("/themes", themesRoute);
app.use("/uploads", express.static("uploads"));

app.get("/api/data", (req, res, next) => {
  try {
    // Simulasi error
    throw new Error("Data tidak ditemukan");
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.get("/admin/secret", verifyToken, authorizeRoles("super_admin"), (req, res) => {
  res.json({ message: "Hanya Super Admin yang bisa lihat ini!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});