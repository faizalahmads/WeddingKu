import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UndanganManagement = () => {
  const [undangans, setUndangans] = useState([]);

  const fetchUndangans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/undangan"); // endpoint GET semua undangan
      setUndangans(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data undangan");
    }
  };

  useEffect(() => {
    fetchUndangans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus undangan ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/undangan/${id}`);
      setUndangans(undangans.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus undangan");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Manajemen Undangan</h3>
        <Link to="/undangan/tambah" className="btn btn-primary">+ Tambah Undangan</Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Groom</th>
            <th>Bride</th>
            <th>Tanggal</th>
            <th>Kode</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {undangans.map(u => (
            <tr key={u.id}>
              <td>{u.groom_name}</td>
              <td>{u.bride_name}</td>
              <td>{u.wedding_date}</td>
              <td>{u.code}</td>
              <td>
                <Link to={`/undangan/edit/${u.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                <Link to={`/undangan/${u.code}`} className="btn btn-sm btn-info me-1" target="_blank">Lihat</Link>
                <button onClick={() => handleDelete(u.id)} className="btn btn-sm btn-danger">Hapus</button>
              </td>
            </tr>
          ))}
          {undangans.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">Belum ada undangan</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UndanganManagement;
