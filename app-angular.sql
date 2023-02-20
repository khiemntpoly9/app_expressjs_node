-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 20, 2023 lúc 12:18 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm-angular`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `idCate` int(5) NOT NULL,
  `nameCate` varchar(255) NOT NULL,
  `urlCate` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`idCate`, `nameCate`, `urlCate`, `createdAt`, `updatedAt`) VALUES
(1, 'Vans', 'vans', '2023-02-20 01:30:57', '2023-02-20 01:30:57'),
(2, 'Nike', 'nike', '2023-02-20 01:31:15', '2023-02-20 01:31:15'),
(3, 'Adidas', 'adidas', '2023-02-20 01:31:29', '2023-02-20 01:31:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(5) NOT NULL,
  `idCateProduct` int(5) NOT NULL,
  `nameProduct` varchar(255) NOT NULL,
  `priceProduct` decimal(10,0) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `idCateProduct`, `nameProduct`, `priceProduct`, `description`, `image_url`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'Sản phẩm 2 test', '120000', '', '', '2023-02-20 01:42:56', '2023-02-20 01:58:05'),
(2, 2, 'Sản phẩm 2', '120000', '', '', '2023-02-20 01:53:25', '2023-02-20 01:53:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(5) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `password`, `role`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'Nguyễn Trung Khiêm 2', 'khiemntpoly', 'khiemntpoly', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3NjgyMzQyOX0.8rI4sxWfrE8do5YRidxzWsg95iVfIuyb6Zv5KFPvvh0', '2023-02-18 22:46:46', '2023-02-19 16:17:09'),
(2, 'Trần Thanh Trường', 'truongttpoly', 'truongttpoly', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY3NjgyMTIxOX0.fUkXL5Uvo_5tpRMAYT5hw8Vk3Ei4P_oNQD1tYpcgghM', '2023-02-18 22:46:46', '2023-02-19 15:40:19'),
(3, 'Phan Tiến Bách', 'bachptpoly', 'bachptpoly', 'user', NULL, '2023-02-18 23:10:19', '2023-02-18 23:10:19'),
(4, 'Nguyễn Bảo Quốc', 'quocnbpoly', 'quocnbpoly', 'ctv', NULL, '2023-02-18 23:12:12', '2023-02-18 23:12:12'),
(8, 'Nguyễn Bảo Quốc', 'quocnbpoly2', 'quocnbpoly', 'user', NULL, '2023-02-19 00:04:43', '2023-02-19 00:04:43'),
(9, NULL, 'khiemtest1', 'khiemtest1', 'user', NULL, '2023-02-19 13:40:13', '2023-02-19 13:40:13'),
(10, NULL, 'quocnbpoly10', 'quocnbpoly', 'user', NULL, '2023-02-19 15:07:01', '2023-02-19 15:07:01'),
(11, NULL, 'test111', 'gggg', 'user', NULL, '2023-02-19 16:18:20', '2023-02-19 16:18:20');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idCate`),
  ADD UNIQUE KEY `urlCate` (`urlCate`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCate` (`idCateProduct`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `idCate` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idCateProduct`) REFERENCES `category` (`idCate`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
