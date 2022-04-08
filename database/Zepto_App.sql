-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2022 at 09:28 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Zepto_App`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Bellal', 'Hossain', 'bellalhoss66@gmail.com', '$2b$10$bunusZ7bg6SzLMawDUP1lulZHi.8qoJzPr7HwRWtqIQa41MIWfw5e'),
(5, 'kkkk', 'title', 'kkkk@gmail.com', '$2b$10$Pg3jERCpODcQJ7/0N5AJbeRJVoih5E2tQL5gdNpszFdccju4g9CCK');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `image`) VALUES
(1, 'pant-', 100.5, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(3, 'shirt', 200, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(4, 't-shirt', 50, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(7, 'Product', 13456, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(19, 'pant', 750, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(21, 'pant-', 100.5, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(22, 'shirt', 200, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(23, 't-shirt', 50, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(24, 'Product', 13456, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(25, 'pant', 750, 'https://bellalhossain66.github.io/assets/img/belal.jpeg'),
(27, 'pant---', 506, 'https://bellalhossain66.github.io/assets/img/belal.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Bellal', 'Hossain', 'bellal@gmail.com', '$2b$10$RUMNic/4/OyR/H8OZ7DK6.a8ZpRKmF6UIuzRag2BGzYehtMa0UIrO'),
(3, 'Bellal', 'Hossain', 'bellalhoss66@gmail.com', '$2b$10$fnxS0SmOC3Db3xEtX0mmL.sbTLKC34GXJnj7pqOEGW9O6aT2HOJxe'),
(4, 'test', 'test', 'test@gmail.com', '$2b$10$dauZseuhKX2iOzXyheRND.xqNNTsG7KoLAWvo.ikFx101ojt.fM52'),
(5, 'fj', 'dfgh', 'dfgh@gmail.com', '$2b$10$OUPwREq0RtziJwsEE85Gs.CmHn0s1r6qDlLrfGPGh98ks4I7I13KS'),
(6, 'Bellal', 'Hossain', 'bb@gmail.com', '$2b$10$wevOqUgW6QAsR0qnWpPdj.LC5hwfrgMYd03JRpVgA8PuDerolLVdm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
