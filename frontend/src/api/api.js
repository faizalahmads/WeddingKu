import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "${import.meta.env.VITE_API_URL}/api",
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // 🔌 NETWORK ERROR
      toast.error("Koneksi jaringan hilang 😢");
      window.location.href = "/network-error";
    } else {
      const { status, data } = error.response;

      if (status === 403) {
        toast.warning("Akses ditolak");
        window.location.href = "/403";
      } else if (status === 404) {
        toast.error("Halaman atau data tidak ditemukan");
        window.location.href = "/404";
      } else if (status >= 500) {
        toast.error("Server sedang bermasalah 😭");
        window.location.href = "/500";
      } else {
        toast.error(data?.message || "Terjadi kesalahan saat memproses data");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
