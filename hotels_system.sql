-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 15 Oca 2024, 17:53:09
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `hotels_system`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `travellers_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `booking`
--

INSERT INTO `booking` (`booking_id`, `hotel_id`, `user_id`, `start_date`, `end_date`, `travellers_count`) VALUES
(1, 2, 1, '2024-01-01', '2024-01-15', 10),
(2, 3, 2, '2024-01-10', '2024-01-20', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL,
  `coupon_code` varchar(255) NOT NULL,
  `coupon_discount` int(11) NOT NULL,
  `coupon_limit` int(11) NOT NULL,
  `coupon_start_date` varchar(255) NOT NULL,
  `coupon_end_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `coupon_code`, `coupon_discount`, `coupon_limit`, `coupon_start_date`, `coupon_end_date`) VALUES
(1, 'DEFAULT', 5, 9999, '08/01/2024', '08/05/2099'),
(2, 'HELLO25', 25, 100, '08/01/2024', '08/05/2024');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` int(11) NOT NULL,
  `hotel_name` varchar(255) NOT NULL,
  `hotel_description` varchar(255) NOT NULL,
  `hotel_price` int(11) NOT NULL,
  `hotel_country` varchar(255) NOT NULL,
  `hotel_features` varchar(255) NOT NULL,
  `hotel_rating` int(11) NOT NULL,
  `hotel_comments` int(11) NOT NULL,
  `hotel_limit` int(11) NOT NULL,
  `hotel_address` varchar(255) NOT NULL,
  `hotel_latitude` double NOT NULL,
  `hotel_longitude` double NOT NULL,
  `hotel_images` longtext NOT NULL,
  `hotel_discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `hotel_name`, `hotel_description`, `hotel_price`, `hotel_country`, `hotel_features`, `hotel_rating`, `hotel_comments`, `hotel_limit`, `hotel_address`, `hotel_latitude`, `hotel_longitude`, `hotel_images`, `hotel_discount`) VALUES
(2, 'The Resort at Longboat Key Club', 'The Resort at Longboat Key Club\" is a luxurious and prestigious hotel nestled along the pristine shores of Longboat Key, Florida. Renowned for its breathtaking oceanfront setting, this resort exemplifies sophistication, offering a perfect blend of upscale', 22653, 'Afghanistan', '0,1,3,4,7,11', 1, 0, 15, ' Longboat Key', 27.413490295410156, -82.50491136379927, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/62/5f/77/the-resort-at-longboat.jpg?w=700&h=-1&s=1,https://www.longboatkeychamber.com/wp-content/uploads/2017/08/longboat-key-hotels-image.jpg,https://media.yourobserver.com/img/photos/2022/05/03/photo-1-22131-20121002174929_t1100.jpg?31a214c4405663fd4bc7e33e8c8cedcc07d61559,https://www.luxurylink.com/images/sho_52d6d2c0/3374_06-945/Junior%2BSuite.jpg?filtered=1,https://images.squarespace-cdn.com/content/v1/5f617e2832603e40e4e3fb41/1600287078025-8SNCYOK27BMOBW3BH7V9/DSC_3705.jpg', 9),
(3, 'Pousada e Restaurante Dona Siroba', 'Boasting a garden, a year-round outdoor pool and mountain views, Pousada e Restaurante Dona Siroba is set in Morretes. Private parking is available on site at this recently renovated property. Featuring family rooms, this property also provides guests wit', 9350, 'Afghanistan', '1,4,5,6,9,10', 4, 3, 25, 'Rua Comendador Macedo', -25.437371745910546, -48.876288419353315, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/241571295.jpg?k=934d1e8c1f04d6bb6d005b68e551cc9c7acc53a3a8c8067e96097c98a9c0d373&o=&hp=1,https://cf.bstatic.com/xdata/images/hotel/max1024x768/252465440.jpg?k=2d310b821c6c459b881266361a24dddcea30b168a88314ab1deac020cb326a4d&o=&hp=1,https://dona-siroba-guest-house.hoteis-em-suldobrasil.com/data/Images/OriginalPhoto/12584/1258463/1258463092/image-morretes-dona-siroba-guest-house-19.JPEG,https://pousadadonasiroba.com.br/wp-content/uploads/2023/08/whatsapp-image-2023-08-07-at-20.32.38-e1692365522598-1030x1030.jpeg,https://cf.bstatic.com/xdata/images/hotel/max1024x768/467629434.jpg?k=f87ff3076c97a262da25565513ac690bdad801e94035d007a6ce5d4f6926093c&o=&hp=1', 12),
(4, 'Comfort Inn & Suites Mountain Iron and Virginia', 'Located in Mountain Iron, 4 miles from Olcott Park, this hotel offers a free airport shuttle. The hotel has a large indoor swimming pool with sun loungers and rooms with flat-screen TVs.\r\nSpacious guest rooms at Comfort Inn & Suites Mountain Iron and Virg', 2450, 'America', '0,1,4,7,9,10', 3, 12, 20, 'Rock Ridge Dr, Mountain Iron', 47.507966667297595, -92.63053937869962, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/241571295.jpg?k=934d1e8c1f04d6bb6d005b68e551cc9c7acc53a3a8c8067e96097c98a9c0d373&o=&hp=1,https://cf.bstatic.com/xdata/images/hotel/max1024x768/252465440.jpg?k=2d310b821c6c459b881266361a24dddcea30b168a88314ab1deac020cb326a4d&o=&hp=1,https://dona-siroba-guest-house.hoteis-em-suldobrasil.com/data/Images/OriginalPhoto/12584/1258463/1258463092/image-morretes-dona-siroba-guest-house-19.JPEG,https://pousadadonasiroba.com.br/wp-content/uploads/2023/08/whatsapp-image-2023-08-07-at-20.32.38-e1692365522598-1030x1030.jpeg,https://cf.bstatic.com/xdata/images/hotel/max1024x768/467629434.jpg?k=f87ff3076c97a262da25565513ac690bdad801e94035d007a6ce5d4f6926093c&o=&hp=1', 5),
(5, 'Lara Barut Collection - Ultra All Inclusive', 'Lara Barut Collection - Ultra All Inclusive offers an unparalleled luxury experience on the stunning Turkish Riviera. Immerse yourself in lavish accommodations, exquisite dining, and a wealth of leisure activities. Indulge in the epitome of hospitality at', 12350, 'Turkey', '1,2,5,6,8,9,', 4, 17, 50, 'Lara, Antalya', 36.85859635394288, 30.856571838983403, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/421082585.jpg?k=688948c1513c9dc128686633c46f14c6b7ef7fc91da8d601cdbce671a5eeeaa0&o=&hp=1,https://www.barutlara.com/images/08-2022/cgiupdate/Pools-Beaches-Aquapark/Aquapark-1.JPG,https://x.cdrst.com/foto/hotel-sf/372a/granderesp/lara-barut-collection-ultra-all-inclusive-general-c567398.jpg,https://barut-lara-hotel-antalya.bookeder.com/data/Photos/OriginalPhoto/12750/1275007/1275007501/Lara-Barut-Collection-Hotel-Antalya-Exterior.JPEG,https://images.trvl-media.com/lodging/2000000/1210000/1207100/1207007/6bc3733e.jpg?', 7),
(6, 'Swandor Hotels & Resort Topkapi Palace - All Inclusive', 'Swandor Hotels & Resort Topkapi Palace - All Inclusive invites you to a regal retreat in the heart of Istanbul. Immerse yourself in opulence with majestic accommodations, delectable dining, and a wealth of all-inclusive amenities. Experience the epitome o', 7999, 'Turkey', '1,2,3,7,8,9', 2, 100, 4, 'Kundu / Aksu, Lara, Antalya', 36.85467768262122, 30.916112870814022, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/95/8b/d3/swandor-topkapi-palace.jpg?w=700&h=-1&s=1,https://www.swandorhotels.com/images/room/7812723b891f550edc75.webp,https://cf.bstatic.com/xdata/images/hotel/max1024x768/459980206.jpg?k=02562cbc82b016efcd31b070ba191ac51795c62aa1bdef5367fe2bd6615b7b2d&o=&hp=1,https://cf.bstatic.com/xdata/images/hotel/max1024x768/459980156.jpg?k=5b33a35245a5bf1d5bdc86097f243a0dafcd6a29920f428b82bd613e57dc9c8f&o=&hp=1,https://images.luxuryescapes.com/q_auto:good/mo7zk35g79uuyhxjcs6', 25),
(7, 'Bayou Villas Ultra', 'Bayou Villas Ultra is a serene haven nestled in nature\'s embrace. Discover unparalleled tranquility in these upscale villas, where modern luxury meets rustic charm. Enjoy an array of amenities, personalized service, and a retreat-like atmosphere. Immerse ', 179659, 'Turkey', '1,2,3,4,5,7,9', 3, 0, 8, 'Lara-Kundu, Antalya', 36.85841819241425, 30.85628619630274, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/0e/d1/dc/bayou-villas-3-bedroom.jpg?w=700&h=-1&s=1,https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/0e/d1/9a/bayou-villas-3-bedroom.jpg?w=700&h=-1&s=1,https://www.barutlara.com/images/2022-03/bayou-villas-v1.1/1-yatay-odali-villa/_card-cover.jpg,https://images.etstur.com/files/images/hotelImages/TR/216413/m/Bayou-Villas-Oda-357784.jpg,https://bayouvillas.com/uploads/11-2023/bayou_villas_1701285913hl-01jpg.jpg', 15),
(8, 'Calista Luxury Resort', 'Bayou Villas Ultra is a serene haven nestled in nature\'s embrace. Discover unparalleled tranquility in these upscale villas, where modern luxury meets rustic charm. Enjoy an array of amenities, personalized service, and a retreat-like atmosphere. Immerse ', 39435, 'Turkey', '1,2,3,7,8,9', 5, 450, 100, 'Taşlıburun Mevkii', 36.8577229543509, 31.031174007953826, 'https://images.trvl-media.com/lodging/2000000/1870000/1861700/1861637/3ea16fd5.jpg?impolicy=resizecrop&rw=1200&ra=fit,https://images.trvl-media.com/lodging/2000000/1870000/1861700/1861637/94c07092.jpg?impolicy=resizecrop&rw=1200&ra=fit,https://images.trvl-media.com/lodging/2000000/1870000/1861700/1861637/2879fc2f.jpg?impolicy=resizecrop&rw=1200&ra=fit,https://images.trvl-media.com/lodging/2000000/1870000/1861700/1861637/895d9068.jpg?impolicy=resizecrop&rw=1200&ra=fit,https://images.trvl-media.com/lodging/2000000/1870000/1861700/1861637/a5d0d3c7.jpg?impolicy=resizecrop&rw=1200&ra=fit', 45);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL,
  `coupon_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `username`, `password`, `phone`, `gender`, `country`, `city`, `district`, `discount`, `coupon_id`) VALUES
(1, 'Atakan', 'Doğan', 'atakandogan@gmail.com', 'atakandogan', '$2b$10$z5NrD0QQCOwOcCb7qxVxxOhBaK4nPg2dTZpX6X.hqs8GUlZgQzoxi', '05533687706', 1, 'Turkey', 'İzmir', 'Karşıyaka', 0, 2),
(2, 'Paul', 'Walker', 'paulwalker@gmail.com', 'paulwalker', '$2b$10$mk3u5A57tJhfAQ9V8VWwEOFeW/LLhi.aF5wl4sfe9zWlUlQrOkEK2', '05533687707', 2, 'Turkey', 'Ankara', 'Mamak', 0, 1),
(4, 'John', 'Doe', 'john@example.com', 'johndoe', '$2b$10$qlHldkqJ4hCH7Rk4.y.kBOoH46WYuSE9gMRGA5sIbZvg9cZhRHCyK', '1234567890', 1, 'CountryName', 'StateName', 'CityName', 0, 2),
(11, 'Deneme', 'Deneme', 'deneme@gmail.com', 'deneme', '$2b$10$2Hj6rxSDuIkB1oheWPg7tuyCQCy/hmscVvzEolrUupfoPI9n6QcbW', '05533687785', 2, 'Turkey', 'İzmir', 'Konak', 0, 1),
(12, 'testing', 'testing', 'testing@mail.com', 'testing', '$2b$10$PUH5vT4jKO5nmgiVtknpZefFYHT1xEK0bSOXAdH0T0z4uEjhj0wLK', '05533698858', 2, 'Afghanistan', 'Badakhshan', 'Ashkāsham', 0, 1),
(13, 'Emily', 'Anderson', 'anderson@gmail.com', 'EAnderson', '$2b$10$IOccxDuUpIeLPMw11tXvIe0OE3FWJaKT.jrFbz9ocFPAffEMVP3vW', '05545879653', 2, 'Estonia', 'Tartu County', 'Nõo vald', 0, 2),
(14, 'Deneme', 'Deneme', 'deneme@gmail.com', 'deneme', '$2b$10$k90FESGG4L4cv/RAWaY84OLdivqjmbDpLR.JyOLH1Q/r7JIiyrZJq', '05533687785', 2, 'Turkey', 'İzmir', 'Konak', 0, 1),
(15, 'Deneme', 'Deneme', 'deneme@gmail.com', 'denemee', '$2b$10$Ck7DhwlxTh0L7kQfjvwppeWa6VDcfLgRwsh1ME5.o3BSblWvxzixO', '05533687780', 2, 'Turkey', 'İzmir', 'Konak', 0, 2),
(16, 'denemedir', 'denemedir', 'denemedir@gmail.com', 'denemedir', '$2b$10$Ds9r.6ARz9oMdBIJ4GSIsO6lroaj9xLMmJIUA.kTfU7DiAdfwlxx2', '05369852125', 1, 'Afghanistan', 'Badakhshan', 'Ashkāsham', 0, 2);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Tablo için indeksler `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `discount` (`discount`),
  ADD KEY `fk_users_coupons` (`coupon_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `hotels`
--
ALTER TABLE `hotels`
  MODIFY `hotel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_coupons` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
