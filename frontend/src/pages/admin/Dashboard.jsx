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
  IoGiftOutline,
} from "react-icons/io5";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState(null);
  const [invitationLoading, setInvitationLoading] = useState(true);

  // ===== BE: state & fetch data (diambil dari kode lama) =====
  const [totalTamu, setTotalTamu] = useState({
    CPP: 0,
    CPW: 0,
    TamuTambahan: 0,
    VIP: 0,
    Reguler: 0,
    total: 0,

    souvenirs: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [recentComments, setRecentComments] = useState([]);

  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");

    if (!adminId) {
      setCommentsLoading(false);
      return;
    }

    const fetchRecentComments = async () => {
      try {
        setCommentsLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard/recent-comments/${adminId}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const result = await res.json();

        setRecentComments(result.data || []);
      } catch (err) {
        console.error("Gagal fetch komentar:", err);

        setRecentComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchRecentComments();
  }, []);

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

  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");

    if (!adminId) {
      setInvitationLoading(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        setInvitationLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/invitations/admin/${adminId}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();

        setInvitation(data);
      } catch (err) {
        console.error("Gagal mengambil data invitation:", err);

        setInvitation(null);
      } finally {
        setInvitationLoading(false);
      }
    };

    fetchInvitation();
  }, []);

  const parseLocalDate = (dateValue) => {
    if (!dateValue) return null;

    const dateString = String(dateValue).trim();

    // Ambil hanya bagian YYYY-MM-DD
    // Aman untuk:
    // 2026-09-26
    // 2026-09-26T00:00:00.000Z
    // 2026-09-26 00:00:00

    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(year, month - 1, day, 0, 0, 0);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const formatEventDate = (dateString) => {
    const date = parseLocalDate(dateString);

    if (!date) {
      return "-";
    }

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateCountdown = (dateString) => {
    const targetDate = parseLocalDate(dateString);

    if (!targetDate) {
      return {
        days: null,
        text: "Event date not set",
        status: "empty",
      };
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return {
        days: diffDays,
        text: "Days Remaining",
        status: "upcoming",
      };
    }

    if (diffDays === 0) {
      return {
        days: 0,
        text: "Today",
        status: "today",
      };
    }

    return {
      days: Math.abs(diffDays),
      text: "Days Ago",
      status: "finished",
    };
  };

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

  // 🔹 Kategori tamu (VIP & Reguler) dari data BE
  const kategoriTamu = [
    { name: "VIP", count: totalTamu.VIP, max: 10 },
    { name: "Reguler", count: totalTamu.Reguler, max: 10 },
  ];

  const kategoriSouvenir = totalTamu.souvenirs || [];

  const totalSouvenir = kategoriSouvenir.reduce(
    (total, item) => total + Number(item.count || 0),
    0,
  );

  // 🔹 Hitung persentase RSVP (contoh: confirmed dari total, fallback 0 jika total 0)
  const confirmedCount = totalTamu.CPP + totalTamu.CPW; // sesuaikan dengan field asli jika BE punya field "confirmed"
  const responseRate =
    totalTamu.total > 0
      ? Math.round((confirmedCount / totalTamu.total) * 100)
      : 0;

  const reviews = [
    { name: "Suyarti", comment: "Semoga Samawa" },
    { name: "Hendri", comment: "Semoga Samawa" },
    { name: "Yorki", comment: "Semoga Samawa" },
  ];

  if (isLoading) {
    return <div className="text-center py-5">Loading data...</div>;
  }

  const eventDate =
    invitation?.wedding_date ||
    null;

  const eventCountdown = calculateCountdown(eventDate);

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
                  <h3 className="stat-value mb-1">{totalTamu.total}</h3>
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
                  <h3 className="stat-value mb-1">{confirmedCount}</h3>
                  <div className="progress stat-progress mb-1">
                    <div
                      className="progress-bar bg-dark"
                      style={{ width: `${responseRate}%` }}
                    />
                  </div>
                  <p className="stat-sub mb-0">{responseRate}% Response Rate</p>
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

                  {kategoriTamu.map((item, index) => {
                    const percentage =
                      item.max > 0
                        ? Math.min((item.count / item.max) * 100, 100)
                        : 0;
                    return (
                      <div key={index}>
                        <div className="category-row mb-2">
                          <span>{item.name}</span>
                          <span className="category-value">
                            {item.count}/{item.max}
                          </span>
                        </div>
                        <div
                          className={`progress category-progress ${
                            index !== kategoriTamu.length - 1 ? "mb-3" : ""
                          }`}
                        >
                          <div
                            className="progress-bar bg-dark"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
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
                  <h3 className="stat-value mb-1">{totalTamu.TamuTambahan}</h3>
                  <p className="stat-sub mb-0">People Additional</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <p className="stat-label mb-3">CATEGORY SOUVENIR</p>

                  {kategoriSouvenir.length === 0 ? (
                    <p className="stat-sub mb-0">Belum ada data souvenir</p>
                  ) : (
                    kategoriSouvenir.map((item, index) => {
                      const percentage =
                        totalTamu.total > 0
                          ? Math.min(
                              (Number(item.count) / totalSouvenir) * 100,
                              100,
                            )
                          : 0;

                      return (
                        <div key={item.name}>
                          <div className="category-row mb-2">
                            <span>{item.name}</span>

                            <span className="category-value">{item.count}</span>
                          </div>

                          <div
                            className={`progress category-progress ${
                              index !== kategoriSouvenir.length - 1
                                ? "mb-3"
                                : ""
                            }`}
                          >
                            <div
                              className="progress-bar bg-dark"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card stat-card h-100">
                <div className="card-body">
                  <div className="stat-icon mb-2">
                    <IoGiftOutline size={18} />
                  </div>

                  <p className="stat-label mb-1">TOTAL SOUVENIR</p>

                  <h3 className="stat-value mb-1">{totalSouvenir}</h3>

                  <p className="stat-sub mb-0">Souvenir Assigned</p>
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

                  {invitationLoading ? (
                    <p className="countdown-loading mb-3">Loading...</p>
                  ) : eventCountdown.days === null ? (
                    <h2 className="countdown-value mb-3">
                      -
                      <span className="countdown-unit">Event date not set</span>
                    </h2>
                  ) : eventCountdown.status === "today" ? (
                    <h2 className="countdown-value mb-3">Today</h2>
                  ) : (
                    <h2 className="countdown-value mb-3">
                      {eventCountdown.days}

                      <span className="countdown-unit">
                        {eventCountdown.text}
                      </span>
                    </h2>
                  )}

                  <div className="d-flex justify-content-between countdown-detail">
                    <span>Date</span>

                    <span className="fw-semibold countdown-detail-value">
                      {formatEventDate(invitation?.wedding_date)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between countdown-detail">
                    <span>Venue</span>

                    <span className="fw-semibold countdown-detail-value">
                      {invitation?.location || "-"}
                    </span>
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
                      Confirmed ({confirmedCount})
                    </div>
                    <div className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: "#9CA3AF" }}
                      />
                      Pending ({Math.max(totalTamu.total - confirmedCount, 0)})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Recent Comments */}
          <div className="row g-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <IoTimeOutline size={16} />

                    <span className="stat-label mb-0">Recent Comments</span>
                  </div>

                  {commentsLoading ? (
                    <div className="activity-empty">Loading comments...</div>
                  ) : recentComments.length === 0 ? (
                    <div className="activity-empty">Belum ada doa & ucapan</div>
                  ) : (
                    <div className="recent-activity-list">
                      {recentComments.map((comment, index) => (
                        <CommentItem
                          key={comment.id}
                          name={comment.guest_name}
                          message={comment.rsvp_message}
                          status={comment.rsvp_status}
                          time={formatRelativeTime(comment.rsvp_at)}
                          isLast={index === recentComments.length - 1}
                        />
                      ))}
                    </div>
                  )}
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

const getActivityText = (activity) => {
  switch (activity.activity_type) {
    case "guest_added":
      return `Tamu baru ditambahkan: ${activity.guest_name}`;

    case "rsvp":
      if (activity.activity_status === "hadir") {
        return `${activity.guest_name} mengonfirmasi hadir`;
      }

      if (activity.activity_status === "tidak_hadir") {
        return `${activity.guest_name} mengonfirmasi tidak hadir`;
      }

      return `${activity.guest_name} memperbarui RSVP`;

    case "checkin":
      return `${activity.guest_name} telah check-in`;

    default:
      return activity.guest_name;
  }
};

const formatRelativeTime = (date) => {
  if (!date) return "-";

  const activityDate = new Date(date);
  const now = new Date();

  const diff = now.getTime() - activityDate.getTime();

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return activityDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CommentItem = ({ name, message, status, time, isLast }) => (
  <div className={`activity-item ${isLast ? "" : "mb-3"}`}>
    <div className="d-flex align-items-start gap-2">
      <div className="activity-avatar" />

      <div className="activity-content">
        <div className="d-flex align-items-center gap-2">
          <p className="activity-name mb-0">{name}</p>

          {status && (
            <span
              className={`activity-status ${
                status === "hadir" ? "hadir" : "tidak-hadir"
              }`}
            >
              {status === "hadir" ? "Hadir" : "Tidak Hadir"}
            </span>
          )}
        </div>

        <p className="activity-text mb-1">“{message}”</p>

        <p className="activity-time mb-0">{time}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
