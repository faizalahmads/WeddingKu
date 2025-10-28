import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/App.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {Doughnut} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

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

        fetch(`http://localhost:5000/api/guests/summary/${adminId}`)
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
        { name: "Reguler", count: totalTamu.Reguler, max: 100 }
    ];


    const reviews = [
        { name: "Suyarti", comment: "Semoga Samawa" },
        { name: "Hendri", comment: "Semoga Samawa" },
        { name: "Yorki", comment: "Semoga Samawa" }
    ];

    if (isLoading) {
        return <div className="text-center py-5">Loading data...</div>;
    }
    
    return (
        <div className="d-flex flex-column min-vh-100 bg-latar">
            <Navbar />
            <div className="container py-4 d-flex flex-column align-items-center">
                {/* Baris pertama */}
                <div className="row g-3 justify-content-center w-100">
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-card">
                            <h6 className="dashboard-card-title">Total Undangan</h6>
                            <div className="dashboard-card-number-container">
                                <h3 className="dashboard-card-number">{totalTamu.total}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Total Tamu Undangan</h6>
                        <div className="dashboard-card-body">
                            <div className="pie-chart-container">
                            <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
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

                {/* Baris kedua */}
                <div className="row g-3 justify-content-center w-100 mt-3">
                    <div className="col-md-6 col-lg-4">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Kategori Tamu</h6>
                        {kategoriTamu.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between dashboard-card-number-container">
                            <span>{item.name}</span>
                            <span>{item.count}/{item.max}</span>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Tamu Tambahan</h6>
                        <div className="dashboard-card-number-container">
                            <h3 className="dashboard-card-number">{totalTamu.TamuTambahan}</h3>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Review */}
                <div className="row g-3 justify-content-center w-100 mt-3">
                    <div className="col-12 col-lg-8">
                        <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Review</h6>
                        {reviews.map((r, i) => (
                            <div key={i} className="review-item">
                            <div className="review-name">{r.name}</div>
                            <div className="review-comment">{r.comment}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );

}

export default Dashboard;