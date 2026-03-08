require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use(express.json());

// Import routes
const { verifyToken, authorizeRoles } = require("./middleware/auth");
const guestRoutes = require("./routes/guests");
const authRoutes = require("./routes/auth");
const invitationRoutes = require("./routes/invitationRoutes");
const undanganRoutes = require("./routes/undanganRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const themesRoute = require("./routes/themes");

// Pakai routes
app.use("/auth", authRoutes);
app.use("/api", guestRoutes);
app.use("/api", undanganRoutes);
app.use("/api/checkin", checkinRoutes);
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

app.get(
  "/admin/secret",
  verifyToken,
  authorizeRoles("super_admin"),
  (req, res) => {
    res.json({ message: "Hanya Super Admin yang bisa lihat ini!" });
  },
);

console.log("Server path:", __dirname);