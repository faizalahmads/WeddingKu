-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Jan 2026 pada 17.00
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
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `invitation_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `maps_link` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`id`, `invitation_id`, `type`, `title`, `date`, `start_time`, `end_time`, `location`, `maps_link`, `created_at`, `updated_at`) VALUES
(23, 1, 'Akad', NULL, '0000-00-00', '11:11:00', '11:11:00', '', NULL, '2025-12-11 22:27:32', '2025-12-11 22:27:32'),
(24, 1, 'Resepsi', NULL, '0000-00-00', '11:11:00', '11:11:00', '', NULL, '2025-12-11 22:27:32', '2025-12-11 22:27:32');

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
(1, 'Mauala', 'CPW', 'Reguler', 'WDK-1FBDBF62', 2, 1, '2025-11-04 16:04:14', 0, NULL),
(2, 'Endri Kodir', 'CPW', 'VIP', 'WDK-1FBC868E', 2, 1, '2025-11-04 16:04:14', 0, NULL),
(3, 'Cobra Mindah', 'CPP', 'VIP', 'WDK-1F718374', 2, 1, '2025-11-04 16:04:14', 0, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitations`
--

CREATE TABLE `invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `unique_code` varchar(20) DEFAULT NULL,
  `theme_id` bigint(20) UNSIGNED DEFAULT NULL,
  `admin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `couple_name` varchar(150) DEFAULT NULL,
  `groom_img` varchar(255) DEFAULT NULL,
  `groom_name` varchar(100) DEFAULT NULL,
  `groom_parent` varchar(255) DEFAULT NULL,
  `groom_sosmed` varchar(255) DEFAULT NULL,
  `groom_bank` varchar(100) DEFAULT NULL,
  `groom_norek` varchar(100) DEFAULT NULL,
  `bride_img` varchar(255) DEFAULT NULL,
  `bride_name` varchar(100) DEFAULT NULL,
  `bride_parent` varchar(255) DEFAULT NULL,
  `bride_sosmed` varchar(255) DEFAULT NULL,
  `bride_bank` varchar(100) DEFAULT NULL,
  `bride_norek` varchar(100) DEFAULT NULL,
  `akad_date` date DEFAULT NULL,
  `resepsi_date` date DEFAULT NULL,
  `wedding_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `addition_location` varchar(255) DEFAULT NULL,
  `maps_link` varchar(255) DEFAULT NULL,
  `addition_maps` varchar(255) DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `deskripsi_cover` text DEFAULT NULL,
  `deskripsi_kasih` text DEFAULT NULL,
  `closing_img` varchar(255) DEFAULT NULL,
  `closing_deskripsi` text DEFAULT NULL,
  `couple_img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `current_step` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitations`
--

INSERT INTO `invitations` (`id`, `code`, `unique_code`, `theme_id`, `admin_id`, `couple_name`, `groom_img`, `groom_name`, `groom_parent`, `groom_sosmed`, `groom_bank`, `groom_norek`, `bride_img`, `bride_name`, `bride_parent`, `bride_sosmed`, `bride_bank`, `bride_norek`, `akad_date`, `resepsi_date`, `wedding_date`, `location`, `addition_location`, `maps_link`, `addition_maps`, `gallery_images`, `deskripsi_cover`, `deskripsi_kasih`, `closing_img`, `closing_deskripsi`, `couple_img`, `created_at`, `updated_at`, `current_step`) VALUES
(1, 'ODA171', 'MI3FG6RL', 2, 2, 'Caca & Faizal', '/uploads/1763401131598-groom_img.jpg', 'Faizal', 'Anak ke-2 Putra dari Bapak Kardjamai dan Ibu Gustia', 'faizal_a.s', NULL, NULL, '/uploads/1763401131655-bride_img.jpg', 'Caca', 'Anak ke-1 Putri dari Bapak Suwada dan Ibu Suharti', 'nrlalvinn_', NULL, NULL, '1111-11-08', '2222-02-19', '2025-12-14', 'Semoga hadir yawww', NULL, 'teatae', NULL, NULL, NULL, 'WADWADWAD', NULL, NULL, NULL, '2025-11-17 17:37:20', '2026-01-18 15:18:59', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitation_images`
--

CREATE TABLE `invitation_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invitation_id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `type` enum('gallery','story','cover','logo') DEFAULT 'gallery',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitation_images`
--

INSERT INTO `invitation_images` (`id`, `invitation_id`, `image_path`, `type`, `sort_order`, `created_at`) VALUES
(1, 1, '/uploads/1768749228756-images.JPG', 'gallery', 0, '2026-01-18 15:13:48'),
(2, 1, '/uploads/1768749228805-images.jpg', 'gallery', 1, '2026-01-18 15:13:48'),
(3, 1, '/uploads/1768749228812-images.jpg', 'gallery', 2, '2026-01-18 15:13:48'),
(4, 1, '/uploads/1768750634742-images.png', 'gallery', 0, '2026-01-18 15:37:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20251126163205-create-users.js.js'),
('20251126163249-create-themes.js.js'),
('20251126163320-create-invitations.js.js'),
('20251126163356-create-guests.js.js'),
('20251204143926-create_events_table.js'),
('20251210145955-update-events-timestamps.js');

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
(1, 'Pisang', 'classic-theme-thumb.jpg', 'classic-theme-preview.jpg', 'Tampilan undangan elegan dengan warna lembut dan layout klasik.'),
(2, 'Flower Pastel', 'classic-theme-thumb.jpg', 'classic-theme-preview.jpg', 'Tampilan undangan elegan dengan warna lembut dan layout klasik.');

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
(2, 'Test', 'test@gmail.com', '$2b$10$CSJV9r4EePPksMKyrQIzx.lYTuBVFxLY6v8K7AMHBKOUit2YP9g6G', 3, 'admin', '2025-10-05 03:16:06'),
(3, 'admin', 'admin@gmail.com', '$2b$10$CRyf0qi6V/oIfAOV0ygh2.fl6fZ0YzjwYbhqACXtwfpVCGo4KJW6S', 1, 'admin', '2025-10-05 03:21:43');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invitation_id` (`invitation_id`);

--
-- Indeks untuk tabel `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `code_2` (`code`),
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
-- Indeks untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invitation_images_invitation` (`invitation_id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

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
-- AUTO_INCREMENT untuk tabel `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `themes`
--
ALTER TABLE `themes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `fk_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_guest_invitation_v2` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_guests_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  ADD CONSTRAINT `fk_invitation_images_invitation` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
