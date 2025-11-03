import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <DotLottieReact
        src="https://lottie.host/a9b78561-ddd5-423a-a8dd-fc0d9decc7a1/kOH4ZYqXXr.lottie"
        loop
        autoplay
        />
      <Link
        to="/admin/dashboard"
        className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
