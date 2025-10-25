-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Okt 2025 pada 19.30
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invitation_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `invitation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_checked_in` tinyint(1) DEFAULT 0,
  `checked_in_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `guests`
--

INSERT INTO `guests` (`id`, `name`, `type`, `category`, `code`, `admin_id`, `invitation_id`, `created_at`, `is_checked_in`, `checked_in_at`) VALUES
(11, 'Jepri', 'CPP', 'VIP', 'PJLPVK', 1, NULL, '2025-10-12 15:57:47', 0, NULL),
(12, 'Rosidikin', 'CPW', 'VIP', 'JMA6FQ', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(14, 'Alesandro Grahambel', 'CPP', 'Reguler', 'YB5VPD', 3, NULL, '2025-10-12 15:57:47', 0, NULL),
(15, 'Jordi Namex', 'CPW', 'VIP', 'LIPSVD', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(16, 'Alersandro Joriwon', 'CPW', 'VIP', 'NZSEV0', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(17, 'Musdilini', 'Tamu Tambahan', 'Reguler', 'Z0RVUT', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(18, 'Rosdikin', 'CPP', 'Reguler', 'CD6K5A', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(19, 'Rosdiah', 'CPP', 'VIP', '9SV5TM', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(20, 'Mardikin', 'CPW', 'Reguler', 'ZEQ2MT', 2, NULL, '2025-10-12 15:57:47', 0, NULL),
(21, 'Esmeralda', 'CPP', 'VIP', 'WZE673', 2, NULL, '2025-10-12 18:04:50', 0, NULL),
(22, 'Vetanimro', 'CPP', 'VIP', '5648A2', 2, 1, '2025-10-13 14:27:11', 0, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitations`
--

CREATE TABLE `invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `couple_name` varchar(150) DEFAULT NULL,
  `groom_name` varchar(100) DEFAULT NULL,
  `bride_name` varchar(100) DEFAULT NULL,
  `wedding_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `maps_link` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `code` varchar(10) DEFAULT NULL,
  `unique_code` varchar(20) DEFAULT NULL,
  `theme_id` bigint(20) UNSIGNED DEFAULT NULL,
  `admin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitations`
--

INSERT INTO `invitations` (`id`, `title`, `couple_name`, `groom_name`, `bride_name`, `wedding_date`, `location`, `maps_link`, `description`, `gallery_images`, `code`, `unique_code`, `theme_id`, `admin_id`, `created_at`) VALUES
(1, 'Undangan Pernikahan', NULL, 'Faizal', 'Caca', '2025-10-16', 'GOR Sunter Jakarta Utara', 'https://share.google/HD7VnDxZhAupI63B5', 'asdasd', '[\"Alur Pengguna Undangan Pernikahan Online.png\"]', 'SSYN96', 'MGP87VBC', 1, 2, '2025-10-13 14:26:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `themes`
--

CREATE TABLE `themes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `thumbnail_url` text DEFAULT NULL,
  `preview_url` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `themes`
--

INSERT INTO `themes` (`id`, `name`, `thumbnail_url`, `preview_url`, `description`) VALUES
(1, 'Pisang', 'classic-theme-thumb.jpg', 'classic-theme-preview.jpg', 'Tampilan undangan elegan dengan warna lembut dan layout klasik.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `invitation_id` int(11) DEFAULT NULL,
  `role` enum('super_admin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `invitation_id`, `role`, `created_at`) VALUES
(1, 'Faizal Ahmad', 'faizal@example.com', '$2b$10$ctkEF660QuWXDTFw8TVOmOIy5Ah9jU0.yhSzI8XblGYiojEPizZni', NULL, 'super_admin', '2025-10-05 03:13:54'),
(2, 'Test', 'test@gmail.com', '$2b$10$CSJV9r4EePPksMKyrQIzx.lYTuBVFxLY6v8K7AMHBKOUit2YP9g6G', 1, 'admin', '2025-10-05 03:16:06'),
(3, 'admin', 'admin@gmail.com', '$2b$10$CRyf0qi6V/oIfAOV0ygh2.fl6fZ0YzjwYbhqACXtwfpVCGo4KJW6S', NULL, 'admin', '2025-10-05 03:21:43');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `fk_guest_invitation_v2` (`invitation_id`),
  ADD KEY `fk_admin` (`admin_id`);

--
-- Indeks untuk tabel `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `unique_code` (`unique_code`);

--
-- Indeks untuk tabel `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `themes`
--
ALTER TABLE `themes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `fk_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_guest_invitation_v2` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_guests_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
