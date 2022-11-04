-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 01, 2022 lúc 09:06 PM
-- Phiên bản máy phục vụ: 8.0.27
-- Phiên bản PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `labnodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai`
--

DROP TABLE IF EXISTS `loai`;
CREATE TABLE IF NOT EXISTS `loai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenLoai` varchar(255) NOT NULL,
  `thuTu` int NOT NULL,
  `anHien` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `loai`
--

INSERT INTO `loai` (`id`, `tenLoai`, `thuTu`, `anHien`) VALUES
(1, 'Lịch sử', 1, 1),
(2, 'Văn học', 2, 0),
(3, 'Nghệ thuật sống', 3, 1),
(4, 'Đời sống', 4, 1),
(5, 'Thiếu nhi', 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sach`
--

DROP TABLE IF EXISTS `sach`;
CREATE TABLE IF NOT EXISTS `sach` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenSach` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `moTa` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `urlHinh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `capNhat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gia` double NOT NULL,
  `idLoai` int NOT NULL,
  `anHien` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `sach`
--

INSERT INTO `sach` (`id`, `tenSach`, `moTa`, `urlHinh`, `capNhat`, `gia`, `idLoai`, `anHien`) VALUES
(1, 'Sống Chậm Đợi Nắng Lên', 'Lúc con trai còn nhỏ, tôi thường có những trò chơi đố vui dành cho con. Các câu đố thường lấy chủ đề về thiên nhiên, cây cối và loài vật gần gũi trong đời sống hàng ngày. Tôi luôn mong muốn con được trải lòng với vạn vật xung quanh một cách dịu lành và ng', 'song-cham-doi-nang-len.png', '2022-11-01 20:57:09', 89000, 3, 1),
(2, 'Sống Xanh Như Những Lá Trà', 'Trong cuốn sách thú vị này, bạn sẽ được khám phá kho tàng ý tưởng về sự đơn giản, tiết kiệm, các phương pháp tự chế và cả trí tuệ của người Nhật. Chính Kayaki đã áp dụng điều mà cô gọi là ‘Green tea living’ - gồm ăn thực phẩm ít calo, tập thể dục và thiền', 'song-xanh-nhu-nhung-la-tra.png', '2022-11-01 20:58:17', 109000, 3, 1),
(3, 'Sống Như Lần Đầu, Yêu Như Lần Cuối', 'Cuốn sách là những câu chuyện đời sống hằng ngày, như chuyện của những tấm bưu thiếp, những lá thư tay, những hạnh phúc giản dị mà chúng ta dễ dàng bỏ lỡ, đặc điểm con người, đời sống ở những vùng miền mà tác giả đã đi qua, hay những cảm xúc đang chi phối', 'song-nhu-lan-dau-tien-yeu-thuong-nhu-lan-cuoi.jpg', '2022-11-01 20:59:12', 99000, 3, 1),
(4, 'Những Ngày Đầy Nắng', '“Bạn thân mến! Tôi chưa bao giờ nghĩ mình sẽ viết sách. Tôi cũng chưa bao giờ tin, mình có thể làm bánh. Tôi chưa bao giờ biết được rằng, ước mơ lại có giá trị lớn lao đến như vậy, cho đến khi tôi thật sự chạm tay vào… Nếu như hôm đó, trong rất nhiều nhữn', 'nhung-ngay-day-nang.png', '2022-11-01 21:00:02', 129000, 3, 1),
(5, 'Sức Mạnh Của Sự Tử Tế', 'Bạn có nhớ nụ cười của một người lạ khi bạn giữ cửa cho họ bước qua hay lời cảm ơn chân thành từ một người bạn khi được bạn giúp đỡ không? Có phải bạn cảm thấy hạnh phúc đến lạ khi làm được điều gì đó cho người khác, dù việc bạn làm vô cùng nhỏ bé? Nụ cườ', 'suc-manh-cua-su-tu-te.png', '2022-11-01 21:00:37', 68000, 3, 1),
(6, 'Để Có Một Tương Lai', 'Trong xã hội có rất nhiều mối nguy. Nếu chúng ta đặt một người trẻ vào xã hội mà không tìm cách bảo vệ họ, họ sẽ tiếp nhận những bạo động, căm thù, sợ hãi và bất an mỗi ngày, rốt cuộc họ sẽ bị bệnh. Những câu chuyện của chúng ta, những chương trình tivi, ', 'de-co-mot-tuong-lai.png', '2022-11-01 21:01:14', 155000, 3, 1),
(7, 'Cân Bằng Cảm Xúc, Cả Lúc Bão Giông', 'Một ngày, chúng ta có khoảng 16 tiếng tiếp xúc với con người, công việc, các nguồn thông tin từ mạng xã hội, loa đài báo giấy… Việc này mang đến cho bạn vô vàn cảm xúc, cả tiêu cực lẫn tích cực. \r\n', 'can-bang-cam-xuc-ca-luc-bao-giong.jpg', '2022-11-01 21:01:51', 96000, 3, 1),
(8, 'Hiểu Về Trái Tim', 'Xuất bản lần đầu tiên vào năm 2011, Hiểu Về Trái Tim trình làng cùng lúc với kỷ lục: cuốn sách có số lượng in lần đầu lớn nhất: 100.000 bản. Trung tâm sách kỷ lục Việt Nam công nhận kỳ tích ấy nhưng đến nay, con số phát hành của Hiểu Về Trái Tim vẫn chưa ', 'hieu-ve-trai-tim.jpg', '2022-11-01 21:02:29', 138000, 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullName`, `userName`, `password`, `role`) VALUES
(1, 'Nguyễn Trung Khiêm', 'admin', '123', 1),
(2, 'Nguyễn Thị Thanh Trúc', 'thanhtruc', '123', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
