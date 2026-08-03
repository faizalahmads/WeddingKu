import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/App.css";
import "../../assets/css/DashboardOverview.css";
import AdminLayout from "../../components/AdminLayout";
import Footer from "../../components/Footer";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoScanOutline,
  IoStatsChartOutline,
  IoPersonAddOutline,
  IoTimeOutline,
  IoCreateOutline,
  IoEyeOutline,
} from "react-icons/io5";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const [totalTamu, setTotalTamu] = useState({
    CPP: 0,
    CPW: 0,
    TamuTambahan: 0,
    VIP: 0,
    Reguler: 0,
    total: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");

    if (!adminId) {
      console.error("Admin ID tidak ditemukan di localStorage");
      setIsLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/guests/summary/${adminId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalTamu(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setIsLoading(false);
      });
  }, []);

  // 🔹 Dataset untuk chart
  const data = {
    labels: ["CPP", "CPW", "Tamu Tambahan"],
    datasets: [
      {
        data: [totalTamu.CPP, totalTamu.CPW, totalTamu.TamuTambahan],
        backgroundColor: ["#0088FF", "#EF5DA8", "#975102"],
        borderWidth: 1,
      },
    ],
  };

  // 🔹 Plugin untuk teks tengah chart
  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.font = "28px Roboto";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(totalTamu.total, width / 2, height / 2);
    },
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    cutout: "50%",
  };

  const kategoriTamu = [
    { name: "VIP", count: totalTamu.VIP, max: 100 },
    { name: "Reguler", count: totalTamu.Reguler, max: 100 },
  ];

  const reviews = [
    { name: "Suyarti", comment: "Semoga Samawa" },
    { name: "Hendri", comment: "Semoga Samawa" },
    { name: "Yorki", comment: "Semoga Samawa" },
  ];

  if (isLoading) {
    return <div className="text-center py-5">Loading data...</div>;
  }

  return (
    <div>
      <AdminLayout role="admin">
        <div className="dashboard-wrapper py-4 px-3 px-md-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="dashboard-title mb-1">Welcome back, Faizal!</h2>
            <p className="dashboard-subtitle mb-0">
              Everything for your special day is looking perfect. Here is your
              event summary.
            </p>
          </div>

          {/* Row 1: Stat cards */}
          <div className="row g-3 mb-1">
            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoPeopleOutline size={18} />
                  </div>
                  <p className="stat-label mb-1">TOTAL GUESTS</p>
                  <h3 className="stat-value mb-1">150</h3>
                  <p className="stat-sub mb-0">People Invited</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoCheckmarkCircleOutline size={18} />
                  </div>
                  <p className="stat-label mb-1">CONFIRMED RSVP</p>
                  <h3 className="stat-value mb-1">120</h3>
                  <div className="progress stat-progress mb-1">
                    <div
                      className="progress-bar bg-dark"
                      style={{ width: "80%" }}
                    />
                  </div>
                  <p className="stat-sub mb-0">80% Response Rate</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoScanOutline size={18} />
                  </div>
                  <p className="stat-label mb-1">CHECKED IN</p>
                  <h3 className="stat-value mb-1">0</h3>
                  <p className="stat-sub mb-0">Awaiting Event Start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Diagram / Category / Additional */}
          <div className="row g-3 mb-1">
            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoStatsChartOutline size={18} />
                  </div>
                  <p className="stat-label mb-3">DIAGRAM GUEST</p>

                  <div className="dashboard-card-body">
                    <div className="pie-chart-container">
                      <Doughnut
                        data={data}
                        options={options}
                        plugins={[centerTextPlugin]}
                      />
                    </div>

                    <div className="dashboard-card-legend">
                      <div className="legend-item">
                        <div className="legend-color cpp" /> CPP
                      </div>
                      <div className="legend-item">
                        <div className="legend-color cpw" /> CPW
                      </div>
                      <div className="legend-item">
                        <div className="legend-color tambahan" /> Tamu Tambahan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <p className="stat-label mb-3">CATEGORY GUEST</p>

                  <div className="category-row mb-2">
                    <span>VIP</span>
                    <span className="category-value">0/10</span>
                  </div>
                  <div className="progress category-progress mb-3">
                    <div
                      className="progress-bar bg-dark"
                      style={{ width: "0%" }}
                    />
                  </div>

                  <div className="category-row mb-2">
                    <span>Reguler</span>
                    <span className="category-value">0/10</span>
                  </div>
                  <div className="progress category-progress">
                    <div
                      className="progress-bar bg-dark"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoPersonAddOutline size={18} />
                  </div>
                  <p className="stat-label mb-1">ADDITIONAL GUEST</p>
                  <h3 className="stat-value mb-1">10</h3>
                  <p className="stat-sub mb-0">People Additional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Invitation status + Countdown/Breakdown */}
          <div className="row g-3 mb-1">
            <div className="col-12 col-lg-8">
              <div className="card invitation-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="status-dot" />
                    <span className="status-text">Invitation Status</span>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-12 col-md-7">
                      <h4 className="invitation-title mb-3">
                        Your invitation is Live
                      </h4>

                      <div className="invitation-link mb-3">
                        <span className="link-icon">🔗</span>{" "}
                        weku.id/caca-faizal
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-dark btn-sm invitation-btn">
                          <IoEyeOutline className="me-1" />
                          View Invitation
                        </button>
                        <button className="btn btn-outline-dark btn-sm invitation-btn">
                          <IoCreateOutline className="me-1" />
                          Edit Details
                        </button>
                      </div>
                    </div>

                    <div className="col-12 col-md-5 text-center mt-4 mt-md-0">
                      <img
                        src="/images/invitation-preview.jpg"
                        alt="Preview undangan di ponsel dan laptop"
                        className="invitation-preview-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 d-flex flex-column gap-3">
              <div className="card countdown-card">
                <div className="card-body">
                  <p className="countdown-label mb-2">Event Countdown</p>
                  <h2 className="countdown-value mb-3">
                    14 <span className="countdown-unit">Days Remaining</span>
                  </h2>

                  <div className="d-flex justify-content-between countdown-detail">
                    <span>Date</span>
                    <span className="fw-semibold">Dec 24, 2024</span>
                  </div>
                  <div className="d-flex justify-content-between countdown-detail">
                    <span>Venue</span>
                    <span className="fw-semibold">Grand Ballroom</span>
                  </div>
                </div>
              </div>

              <div className="card h-100">
                <div className="card-body">
                  <p className="stat-label mb-3">Guest Breakdown</p>

                  <div className="bar-chart mb-3">
                    {[40, 65, 30, 90, 55, 70].map((h, i) => (
                      <div
                        key={i}
                        className={`bar ${i === 3 ? "bar-active" : ""}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  <div className="d-flex gap-3 breakdown-legend">
                    <div className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#1F2937" }}
                      />
                      Confirmed (120)
                    </div>
                    <div className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#9CA3AF" }}
                      />
                      Pending (30)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Recent activity */}
          <div className="row g-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <IoTimeOutline size={16} />
                    <span className="stat-label mb-0">Recent Activity</span>
                  </div>

                  <ActivityItem
                    name="Amel confirmed RSVP"
                    time="2 minutes ago"
                  />
                  <ActivityItem
                    name="New guest added: John Doe"
                    time="1 hour ago"
                    isLast
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      <Footer />
    </div>
  );
};

const ActivityItem = ({ name, time, isLast }) => (
  <div
    className={`d-flex align-items-center justify-content-between activity-item ${isLast ? "" : "mb-2"}`}
  >
    <div className="d-flex align-items-center gap-2">
      <div className="activity-avatar" />
      <div>
        <p className="activity-name mb-0">{name}</p>
        <p className="activity-time mb-0">{time}</p>
      </div>
    </div>
    <button className="btn btn-link btn-sm activity-view">View</button>
  </div>
);

export default Dashboard;
