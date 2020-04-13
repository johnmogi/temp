-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2020 at 01:35 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourist`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `userID` int(10) NOT NULL,
  `vacationID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationID`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` int(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`, `role`) VALUES
(1, 'John', 'Mogi', 'JohnMogi', '123456', 1, 'Admin'),
(2, 'pill', 'blue', 'bobby5', '123456', 0, 'User'),
(3, 'Miagi', 'Mickey', 'MICKYAGI', '123465', 1, 'User'),
(4, 'mogior', 'ds', 'mogior', '123456', 0, 'User'),
(15, '1', '1', '1', '1', 1, 'Admin'),
(16, 'rgte', 'erg', 'erg', 'erg', 0, 'User'),
(17, 'shaked', 'r', '1', '1234', 0, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
CREATE TABLE `vacations` (
  `vacationName` varchar(50) NOT NULL,
  `vacationID` int(10) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `destination` varchar(80) NOT NULL,
  `picFileName` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationName`, `vacationID`, `description`, `destination`, `picFileName`, `startDate`, `endDate`, `price`) VALUES
('Zanzibar Delights', 1, 'Located in Stone Town within a short walk of Shangani Beach, Garden Lodge is within a few miles (5 km) of other popular sights such as Nakupenda Beach. This 18-room hotel has free breakfast along with conveniences like free in-room WiFi and a rooftop terrace. ', 'zanzibar', '2.jpeg', '2020-04-15', '2020-04-29', '1600'),
('zanziland', 2, 'Located in Stone Town within a short walk of Shangani Beach, Garden Lodge is within a few miles (5 km) of other popular sights such as Nakupenda Beach. This 18-room hotel has free breakfast along with conveniences like free in-room WiFi and a rooftop terrace. ', 'zanzibar', '5.jpeg', '2020-04-15', '2020-04-29', '1579'),
('madagaskar height', 4, 'bug gig me up', 'Madagaskar', '6.jpeg', '2020-03-18', '2020-03-25', '1900'),
('light me up2', 6, 'DJ drezland', 'Europe', '4.jpeg', '2018-03-18', '2020-03-25', '6000'),
('sdgf', 7, 'test', 'testadd', '1.jpeg', '2020-03-25', '2020-03-30', '233'),
('sdfgsdg', 8, 'test', 'testadd', '3.jpeg', '2020-03-25', '2020-03-30', '233');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
