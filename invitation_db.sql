-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Agu 2026 pada 17.43
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
-- Struktur dari tabel `banks`
--

CREATE TABLE `banks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `banks`
--

INSERT INTO `banks` (`id`, `name`, `logo`, `createdAt`, `updatedAt`) VALUES
(1, 'Bank BCA', '/uploads/banks/bank-bca.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(2, 'Bank Mandiri', '/uploads/banks/bank-mandiri.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(3, 'Bank BNI', '/uploads/banks/bank-bni.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(4, 'Bank BRI', '/uploads/banks/bank-bri.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(5, 'Bank BTN', '/uploads/banks/bank-btn.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(6, 'Bank CIMB Niaga', '/uploads/banks/bank-cimb-niaga.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(7, 'Bank Danamon', '/uploads/banks/bank-danamon.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(8, 'Bank Permata', '/uploads/banks/bank-permata.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(9, 'Bank Panin', '/uploads/banks/bank-panin.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(10, 'Bank Mega', '/uploads/banks/bank-mega.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(11, 'Bank OCBC NISP', '/uploads/banks/bank-ocbc.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(12, 'Bank Sinarmas', '/uploads/banks/bank-sinarmas.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(13, 'Bank BJB', '/uploads/banks/bank-bjb.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(14, 'Bank Jatim', '/uploads/banks/bank-jatim.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(15, 'Bank Jateng', '/uploads/banks/bank-jateng.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(16, 'Bank Nagari', '/uploads/banks/bank-nagari.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(17, 'Bank Jakarta', '/uploads/banks/bank-jakarta.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(18, 'Bank Papua', '/uploads/banks/bank-papua.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(19, 'Bank Muamalat', '/uploads/banks/bank-muamalat.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(20, 'Bank Syariah Indonesia (BSI)', '/uploads/banks/bank-bsi.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(21, 'Jenius (BTPN)', '/uploads/banks/bank-jenius.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08'),
(22, 'Bank Jago', '/uploads/banks/bank-jago.png', '2026-02-22 16:23:08', '2026-02-22 16:23:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `checkin_tokens`
--

CREATE TABLE `checkin_tokens` (
  `id` int(11) NOT NULL,
  `invitation_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expired_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `checkin_tokens`
--

INSERT INTO `checkin_tokens` (`id`, `invitation_id`, `token`, `expired_at`, `is_active`, `created_at`) VALUES
(1, 1, 'b99038dcb5b96ed271ff253b703917e21f1870e2d7418a915c77ad0edd7dcab8', '2026-03-07 21:15:32', 0, '2026-03-06 21:15:32'),
(2, 1, '953648e21059b06a0448dbbb8da3e6a4a499eedaf1a4a1aa7674cf83884bc20e', '2026-03-07 21:15:34', 0, '2026-03-06 21:15:34'),
(3, 1, '04162abfa84fce89c75b42881eb48c5e9d4266567c9a151861adf05877412ef9', '2026-03-08 14:15:02', 0, '2026-03-07 14:15:02'),
(4, 1, 'a310f30bd71dcf0578a2e64300d331a18e463dcc8527333f70f57753a5ab4d12', '2026-03-08 14:21:25', 0, '2026-03-07 14:21:25'),
(5, 1, 'e480b523609165e8a4a1a7229c7b697e87cb9703e0bc0518780b936f733e6225', '2026-03-08 14:23:03', 0, '2026-03-07 14:23:03'),
(6, 1, '6138f662917d67c08d0443cfe8667d1048dfde32a02a88f7a8e23a7eab77f175', '2026-03-09 23:44:19', 0, '2026-03-08 23:44:19'),
(7, 1, '5d45bfaa1c94da9fa58d2fb1a5286384e6e7a9047e006b26a6a2739e96947c3f', '2026-03-09 23:44:28', 0, '2026-03-08 23:44:28'),
(8, 1, '1cbad65ee71593a7fad04b3e5e38c98f88a92294864e893a088b3ba94b08bfbc', '2026-03-18 23:27:02', 0, '2026-03-17 23:27:02'),
(9, 1, '836faed8770b5b01c4d9a2a3a27df91c5a9d480daa91afc69ccb95b32d88f486', '2026-03-25 22:38:11', 0, '2026-03-24 22:38:11'),
(10, 1, 'ba4539b623d534df47f3e689d7533cecbe63eede4d86e16fa1ab6050ca865d54', '2026-03-27 23:19:15', 0, '2026-03-26 23:19:15'),
(11, 1, '9d338d950c2a3b7948a4836ebe6422a978655e026e564f6f6b7d10c4f97cce72', '2026-03-29 16:29:49', 0, '2026-03-26 23:29:49'),
(12, 1, '51970c233f5941ce55be05256a9e5cbde39a671434e6f1a15013de08bb67fbce', '2026-03-29 16:59:59', 0, '2026-03-26 23:32:36'),
(13, 1, '9872c20ba0ca5e073483f86ef38324614bd04098bbf8d59c133fbca683735285', '2026-03-29 16:59:59', 0, '2026-03-26 23:35:37'),
(14, 1, '83271858ba564be91bd5e1474674be77d7c8e65b50def6b83d288e4c3b7f0aa8', '2026-03-29 23:59:59', 0, '2026-03-26 23:37:29'),
(15, 1, 'b5d2517cc2c83f19940a9e4d2ba72d6459f5345335fa962ffe57d49afb08ee42', '2026-04-02 23:59:59', 0, '2026-04-01 23:35:00'),
(16, 1, 'a7329e0fae090aaa38655c3429eb44e9868db52e6699d0599de3bd875485a107', '2026-04-01 23:59:59', 0, '2026-04-01 23:41:34'),
(17, 1, '3ba9f2e8263fe3d62ab1e4eb702eb70642d6017518b2c97406eaccd156c15b48', '2026-04-04 23:59:59', 0, '2026-04-01 23:41:47'),
(18, 1, '7453399b427fe909a87767b12e78614200fbfe7385f7db0ffefb64365187513a', '2026-08-04 23:59:59', 1, '2026-08-03 00:32:10');

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
(16, 'Mauala', 'CPW', 'Reguler', 'WDK-JDE789D9', 2, 1, '2026-02-28 09:40:41', 1, '2026-04-01 16:39:52'),
(17, 'Endri Kodir', 'CPW', 'VIP', 'WDK-JD34F383', 2, 1, '2026-02-28 09:40:41', 1, '2026-04-01 16:40:17'),
(18, 'Cobra Mindah', 'CPP', 'VIP', 'WDK-JDF1839C', 2, 1, '2026-02-28 09:40:41', 0, NULL),
(19, 'Koralmir indar', 'CPP', 'Reguler', 'WDK-NDEE3069', 2, 1, '2026-03-06 16:09:29', 0, NULL),
(20, 'Rogayeh', 'Tamu Tambahan', NULL, 'WDK-VLD98A23', 2, 1, '2026-03-08 16:51:35', 0, NULL),
(21, 'Musdilan', 'Tamu Tambahan', NULL, 'WDK-VLD98123', 2, 1, '2026-03-08 17:00:27', 1, '2026-03-24 17:05:57'),
(22, 'Rumsiahh', 'Tamu Tambahan', NULL, 'WDK-VLD98AS3', 2, 1, '2026-03-08 17:04:34', 1, '2026-03-24 17:05:58'),
(23, 'komsantun', 'Tamu Tambahan', NULL, 'WDK-VLD98A2D', 2, 1, '2026-03-08 17:08:43', 1, '2026-03-24 17:05:59'),
(24, 'Adriann Jhonny', 'CPP', 'VIP', 'WDK-4T0D1708', 2, 1, '2026-03-08 17:09:56', 1, '2026-03-26 16:53:40');

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
  `groom_norek` varchar(100) DEFAULT NULL,
  `groom_name_bank` varchar(255) DEFAULT NULL,
  `groom_bank_id` int(11) DEFAULT NULL,
  `bride_img` varchar(255) DEFAULT NULL,
  `logo_img` varchar(255) DEFAULT NULL,
  `cover_mobile_img` varchar(255) DEFAULT NULL,
  `cover_desktop_img` varchar(255) DEFAULT NULL,
  `bride_name` varchar(100) DEFAULT NULL,
  `bride_parent` varchar(255) DEFAULT NULL,
  `bride_sosmed` varchar(255) DEFAULT NULL,
  `bride_norek` varchar(100) DEFAULT NULL,
  `bride_name_bank` varchar(255) DEFAULT NULL,
  `bride_bank_id` int(11) DEFAULT NULL,
  `akad_date` date DEFAULT NULL,
  `resepsi_date` date DEFAULT NULL,
  `wedding_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `detail_location` text DEFAULT NULL,
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
  `current_step` int(11) DEFAULT 1,
  `show_groom_parent` tinyint(1) NOT NULL DEFAULT 1,
  `show_bride_parent` tinyint(1) NOT NULL DEFAULT 1,
  `same_date` tinyint(1) NOT NULL DEFAULT 1,
  `same_date_add` tinyint(1) NOT NULL DEFAULT 1,
  `show_extra_event` tinyint(1) NOT NULL DEFAULT 0,
  `custom_music` tinyint(1) NOT NULL DEFAULT 1,
  `show_bank` tinyint(1) NOT NULL DEFAULT 1,
  `use_story` tinyint(1) NOT NULL DEFAULT 1,
  `show_logo` tinyint(1) NOT NULL DEFAULT 1,
  `cover_mobile` tinyint(1) NOT NULL DEFAULT 1,
  `cover_desktop` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitations`
--

INSERT INTO `invitations` (`id`, `code`, `unique_code`, `theme_id`, `admin_id`, `couple_name`, `groom_img`, `groom_name`, `groom_parent`, `groom_sosmed`, `groom_norek`, `groom_name_bank`, `groom_bank_id`, `bride_img`, `logo_img`, `cover_mobile_img`, `cover_desktop_img`, `bride_name`, `bride_parent`, `bride_sosmed`, `bride_norek`, `bride_name_bank`, `bride_bank_id`, `akad_date`, `resepsi_date`, `wedding_date`, `location`, `detail_location`, `addition_location`, `maps_link`, `addition_maps`, `gallery_images`, `deskripsi_cover`, `deskripsi_kasih`, `closing_img`, `closing_deskripsi`, `couple_img`, `created_at`, `updated_at`, `current_step`, `show_groom_parent`, `show_bride_parent`, `same_date`, `same_date_add`, `show_extra_event`, `custom_music`, `show_bank`, `use_story`, `show_logo`, `cover_mobile`, `cover_desktop`) VALUES
(1, 'ODA171', 'MI3FG6RL', 2, 2, 'Caca & Faizal', '/uploads/invitations/1771742899564-cbb2c9bb661a-groom_img.JPG', 'Faizal', 'Anak ke-2 Putra dari Bapak ... dan Ibu ...', 'faizal_a.s', '4140673272', 'Faizal Ahmad Siddiq', 1, '/uploads/invitations/1771742899575-5cc33f02afd9-bride_img.png', '/uploads/invitations/1771743224685-0fa0a6965bc7-logo_img.png', '/uploads/invitations/1771743224687-28d602c76711-cover_mobile_img.png', '/uploads/invitations/1771743224698-d5b861a8d925-cover_desktop_img.jpg', 'Caca', 'Anak ke-1 Putri dari Bapak ... dan Ibu ...', 'nrlalvinn_', '41405544212', 'Nurul Alvi Novalinda', 2, '2026-02-22', '2026-02-22', '2026-02-26', 'GOR Sunter Jakarta Utara', 'Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14, Sunter Jaya, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14360', NULL, 'https://maps.app.goo.gl/NEa8q5a4JMTngwUs8', NULL, NULL, NULL, 'semoga hadirrr', NULL, 'Semoga hadirr yawww', NULL, '2025-11-17 17:37:20', '2026-02-28 16:20:26', 4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitation_events`
--

CREATE TABLE `invitation_events` (
  `id` int(11) NOT NULL,
  `invitation_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitation_events`
--

INSERT INTO `invitation_events` (`id`, `invitation_id`, `type`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(113, 1, 'Akad', '07:00:00', '09:00:00', '2026-02-28 23:20:26', '2026-02-28 23:20:26'),
(114, 1, 'Resepsi', '11:00:00', '13:00:00', '2026-02-28 23:20:26', '2026-02-28 23:20:26');

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
(20, 1, '/uploads/gallery/1771743113827-d18c72155080-images.jpg', 'gallery', 0, '2026-02-22 06:51:53'),
(21, 1, '/uploads/gallery/1771743113832-2d183865a38d-images.jpg', 'gallery', 1, '2026-02-22 06:51:53'),
(22, 1, '/uploads/gallery/1771743113837-0ba62c8e8fe6-images.jpg', 'gallery', 2, '2026-02-22 06:51:53'),
(23, 1, '/uploads/gallery/1771743113842-f513cd9d423b-images.jpg', 'gallery', 3, '2026-02-22 06:51:53'),
(24, 1, '/uploads/gallery/1771743113867-bd69aab2ab5e-images.jpg', 'gallery', 4, '2026-02-22 06:51:53'),
(25, 1, '/uploads/gallery/1771743113869-5d764e11acab-images.jpg', 'gallery', 5, '2026-02-22 06:51:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitation_stories`
--

CREATE TABLE `invitation_stories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invitation_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `invitation_stories`
--

INSERT INTO `invitation_stories` (`id`, `invitation_id`, `title`, `description`, `image_path`, `sort_order`, `created_at`, `updated_at`) VALUES
(33, 1, '2', '2', '/uploads/stories/1771743140695-d609f2b2b040-story_images[0].jpg', 0, '2026-02-22 13:52:20', '2026-02-28 23:20:40'),
(34, 1, '3', '3', '/uploads/stories/1771743169174-8c81aeecfc51-story_images[1].jpeg', 1, '2026-02-22 13:52:49', '2026-02-28 23:20:40'),
(35, 1, '1', '1', '/uploads/stories/1771743169174-09cf97d50953-story_images[2].png', 2, '2026-02-22 13:52:49', '2026-02-28 23:20:40'),
(36, 1, '4', '4', '/uploads/stories/1771743169176-dcf8c3876f7b-story_images[3].jpg', 3, '2026-02-22 13:52:49', '2026-02-22 13:52:49'),
(37, 1, '5', '5', '/uploads/stories/1771743169178-257e6cdbf7a6-story_images[4].jpg', 4, '2026-02-22 13:52:49', '2026-02-22 13:52:49');

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
('20251210145955-update-events-timestamps.js'),
('20260207155959-add-invitation-toggles.js'),
('20260207162246-add-invitation-logo-cover.js'),
('20260208153551-create-invitation-stories.js'),
('20260217163347-rename-event-and-remove-unused-columns.js'),
('20260217165705-add-unique-constraint-to-invitation-images.js'),
('20260222044736-add-detail-location-to-invitations.js'),
('20260222052452-add-bank-name-to-invitations.js'),
('20260222061402-create-banks-table.js'),
('20260222061552-add-bank-id-to-invitations.js'),
('20260304162246-create-checkin-tokens.js');

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
(2, 'Flower Pastel', 'tema-2.png', 'tema-2.png', 'Tampilan undangan elegan dengan warna lembut dan layout klasik.');

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
(3, 'admin', 'admin@gmail.com', '$2b$10$CRyf0qi6V/oIfAOV0ygh2.fl6fZ0YzjwYbhqACXtwfpVCGo4KJW6S', 2, 'admin', '2025-10-05 03:21:43'),
(4, 'coba', 'coba@gmail.com', '$2b$10$z3tU7sjklrH5GTfVw4mBF.jvplGxpBwX3wXS1TAdFgjKHkMuS0cly', NULL, 'admin', '2026-02-28 06:53:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `checkin_tokens`
--
ALTER TABLE `checkin_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

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
  ADD UNIQUE KEY `unique_code` (`unique_code`),
  ADD KEY `invitations_groom_bank_id` (`groom_bank_id`),
  ADD KEY `invitations_bride_bank_id` (`bride_bank_id`);

--
-- Indeks untuk tabel `invitation_events`
--
ALTER TABLE `invitation_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invitation_id` (`invitation_id`);

--
-- Indeks untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_invitation_image` (`invitation_id`,`image_path`);

--
-- Indeks untuk tabel `invitation_stories`
--
ALTER TABLE `invitation_stories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invitation_id` (`invitation_id`);

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
-- AUTO_INCREMENT untuk tabel `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `checkin_tokens`
--
ALTER TABLE `checkin_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `invitation_events`
--
ALTER TABLE `invitation_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `invitation_stories`
--
ALTER TABLE `invitation_stories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `themes`
--
ALTER TABLE `themes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

--
-- Ketidakleluasaan untuk tabel `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_bride_bank_id_foreign_idx` FOREIGN KEY (`bride_bank_id`) REFERENCES `banks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invitations_groom_bank_id_foreign_idx` FOREIGN KEY (`groom_bank_id`) REFERENCES `banks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invitation_events`
--
ALTER TABLE `invitation_events`
  ADD CONSTRAINT `invitation_events_ibfk_1` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invitation_images`
--
ALTER TABLE `invitation_images`
  ADD CONSTRAINT `fk_invitation_images_invitation` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `invitation_stories`
--
ALTER TABLE `invitation_stories`
  ADD CONSTRAINT `invitation_stories_ibfk_1` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
