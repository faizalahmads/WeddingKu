import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from "react-router-dom";

export default function NetworkError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
       <DotLottieReact
        src="https://lottie.host/7ad1e699-c7f1-4fc1-8e15-2f0ea4ad2b50/FagrxT18FP.lottie"
        loop
        autoplay
        />
      <Link
        to="/admin/dashboard"
        className=" py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
