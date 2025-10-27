const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://10.90.132.153:5173"],
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
app.use("/api", invitationRoutes);
app.use("/api/undangan", undanganRoutes);
app.use("/api/guests", guestRoutes);
app.use("/themes", themesRoute);

app.get("/admin/secret", verifyToken, authorizeRoles("super_admin"), (req, res) => {
  res.json({ message: "Hanya Super Admin yang bisa lihat ini!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});