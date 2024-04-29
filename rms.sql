-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2024 at 01:17 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rms`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `contact_info` varchar(20) NOT NULL,
  `tower_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `monthly_rent`
--

CREATE TABLE `monthly_rent` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `flat_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `rent_collected` int(50) NOT NULL DEFAULT '0',
  `booked` enum('yes','no') NOT NULL DEFAULT 'yes',
  `paid` enum('yes','no') NOT NULL DEFAULT 'no',
  `expense` int(11) NOT NULL,
  `services` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthly_rent`
--

INSERT INTO `monthly_rent` (`id`, `tenant_id`, `flat_id`, `amount`, `rent_collected`, `booked`, `paid`, `expense`, `services`, `created_at`, `updated_at`) VALUES
(28, 5, 4, 20000, 667, 'no', 'yes', 0, '{\"sweeper_id\":19,\"watchman_id\":18}', '2024-04-28 18:04:16', '2024-04-30 07:04:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_flats`
--

CREATE TABLE `tbl_flats` (
  `flat_id` int(11) NOT NULL,
  `flat_name` varchar(200) NOT NULL,
  `tower_id` int(50) NOT NULL,
  `type` enum('A','B','','') NOT NULL COMMENT 'A-5Starr , B-Simple',
  `rent` varchar(100) NOT NULL,
  `expense` varchar(500) NOT NULL,
  `owner_id` varchar(500) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_flats`
--

INSERT INTO `tbl_flats` (`flat_id`, `flat_name`, `tower_id`, `type`, `rent`, `expense`, `owner_id`, `worker_id`, `status`, `created_at`, `updated_at`) VALUES
(4, 'flat12', 14, 'B', '20000', '', '4', 0, '1', '2024-04-28 18:02:49', '2024-04-28 18:04:22'),
(5, 'flat2', 14, 'B', '20000', '', '14', 0, '1', '2024-04-28 18:03:10', '2024-04-28 18:03:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tower`
--

CREATE TABLE `tbl_tower` (
  `id` int(11) NOT NULL,
  `tower_name` varchar(100) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_tower`
--

INSERT INTO `tbl_tower` (`id`, `tower_name`, `owner_id`, `employee_id`, `created_at`, `updated_at`) VALUES
(14, 'tower111', 4, 0, '2024-04-28 18:02:32', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `type` enum('1','2','3','4','5') NOT NULL COMMENT '1-Adim,2-Manager,3-Cusomer,4-Manager,5-Employee',
  `worker_type_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `plainPassword` varchar(50) NOT NULL,
  `profile_img` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`, `contact_no`, `type`, `worker_type_id`, `created_at`, `plainPassword`, `profile_img`) VALUES
(4, 'admin', 'Last ', '', 'admin@gmail.com', '$2y$10$Bt4aLSkoe53dI4ClV20MoenwrW8HfUMZakM6nodYGSk3U2uWr/YcS', '1231231', '1', 0, '2024-04-17 10:27:04', '12345678', 'assets/uploads/'),
(5, 'customer', 'user', '', 'customer@gmail.com', '$2y$10$/F2detC3fU2qxuueD0d3Ze5I0g4GAjhaWFGwyQi/yppBSYteJo4Ji', '1231231', '3', 0, '2024-04-17 10:34:43', '123456', ''),
(6, 'employee', 'employee', '', 'adilali@gmail.com', '$2y$10$K5r2ke0Aqws.yx22kMo92uBmUGGXuQXWAYh200AK4mh9uMO4gNV0C', '123456789', '2', 0, '2024-04-17 10:35:47', '12345678', 'assets/uploads/IMG_20230829_11201811.jpg'),
(17, 'sweeper', 'worker', 'sweeperworker', 'adilali@gmail.com', '$2y$10$ab0mAd9GNU4cZujcZH1oe.8Yy6DpW8rwTUfDcsgzy/28w.1PZMggm', '12345678', '5', 6, '2024-04-28 22:14:00', '123456', ''),
(18, 'watchan', 'employee', 'watchanemployee', 'watchman@gmail.com', '$2y$10$/UVU3tEjcsWmjuR.3QZjMOnGnC1UM3JV8c3q3NJbUN7CT60LMDD.q', '12345678', '5', 7, '2024-04-29 19:08:00', '123456', ''),
(19, 'watchman', '2', 'watchman2', 'adilali@gmail.com', '$2y$10$FKwUwRZnWBlANc7CcgihNeFYBaZ1EqJ0U0K3IDDZZw4bZVqSHmjti', '1231231', '5', 6, '2024-04-29 19:40:30', '123456', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_worker_type`
--

CREATE TABLE `tbl_worker_type` (
  `worker_type_id` int(11) NOT NULL,
  `worker_type` varchar(100) NOT NULL,
  `worker_salary` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_worker_type`
--

INSERT INTO `tbl_worker_type` (`worker_type_id`, `worker_type`, `worker_salary`) VALUES
(6, 'sweeper', 20000),
(7, 'watchman', 30000);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `id` int(11) NOT NULL,
  `tenant_name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flat_id` varchar(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tw_map`
--

CREATE TABLE `tw_map` (
  `tw_id` int(20) NOT NULL,
  `worker_id` int(20) NOT NULL,
  `tenant_id` int(20) NOT NULL,
  `flat_id` int(20) NOT NULL,
  `rent_id` int(11) NOT NULL,
  `assigned_at` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tw_map`
--

INSERT INTO `tw_map` (`tw_id`, `worker_id`, `tenant_id`, `flat_id`, `rent_id`, `assigned_at`, `created_at`, `updated_at`) VALUES
(18, 0, 5, 2, 25, '2024-04-27', '2024-04-27 12:43:52', '2024-04-27 13:19:01'),
(19, 0, 5, 2, 25, '2024-04-27', '2024-04-27 12:44:35', '2024-04-27 13:19:01'),
(20, 17, 5, 4, 28, '2024-04-29', '2024-04-28 18:04:16', '2024-04-28 22:45:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_rent`
--
ALTER TABLE `monthly_rent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_flats`
--
ALTER TABLE `tbl_flats`
  ADD PRIMARY KEY (`flat_id`);

--
-- Indexes for table `tbl_tower`
--
ALTER TABLE `tbl_tower`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_worker_type`
--
ALTER TABLE `tbl_worker_type`
  ADD PRIMARY KEY (`worker_type_id`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tw_map`
--
ALTER TABLE `tw_map`
  ADD PRIMARY KEY (`tw_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `monthly_rent`
--
ALTER TABLE `monthly_rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tbl_flats`
--
ALTER TABLE `tbl_flats`
  MODIFY `flat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_tower`
--
ALTER TABLE `tbl_tower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_worker_type`
--
ALTER TABLE `tbl_worker_type`
  MODIFY `worker_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tenant`
--
ALTER TABLE `tenant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tw_map`
--
ALTER TABLE `tw_map`
  MODIFY `tw_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
