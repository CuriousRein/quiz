-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2018 at 10:25 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `activity`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_record`
--

CREATE TABLE `activity_record` (
  `act_record_id` int(15) NOT NULL,
  `act_score_id` int(15) NOT NULL,
  `questionaire_id` int(15) NOT NULL,
  `answer_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `activity_scores`
--

CREATE TABLE `activity_scores` (
  `act_score_id` int(15) NOT NULL,
  `stud_id` int(15) NOT NULL,
  `score` int(15) NOT NULL,
  `topic_id` int(15) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answer_id` int(15) NOT NULL,
  `question_id` int(15) NOT NULL,
  `choices` varchar(55) NOT NULL,
  `types` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answer_id`, `question_id`, `choices`, `types`) VALUES
(1, 1, '12', 'number'),
(2, 2, '7', 'number'),
(3, 3, '365', 'number'),
(4, 4, '4', 'number'),
(5, 5, '7', 'number'),
(6, 0, '232', 'number'),
(7, 0, '432', 'number'),
(8, 0, '978987', 'number'),
(9, 0, '1089', 'number'),
(10, 6, 'Hydrogen sulphide', 'word'),
(11, 7, 'Bromine', 'word'),
(12, 8, 'magnesium', 'word'),
(13, 9, 'Graphite', 'word'),
(14, 10, 'Mercury', 'word'),
(15, 0, 'Oxygen', 'word'),
(16, 0, 'Carbon dioxide', 'word'),
(17, 0, 'Nitrogen', 'word'),
(18, 0, 'Phosphorous', 'word'),
(19, 0, 'Chlorine', 'word'),
(20, 0, 'Helium', 'word'),
(21, 11, 'false', 'tor'),
(22, 12, 'false', 'tor'),
(23, 13, 'true', 'tor'),
(24, 14, 'false', 'tor'),
(25, 15, 'false', 'tor');

-- --------------------------------------------------------

--
-- Table structure for table `questionaire`
--

CREATE TABLE `questionaire` (
  `question_id` int(15) NOT NULL,
  `question` varchar(100) NOT NULL,
  `answer` varchar(50) NOT NULL,
  `topic_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionaire`
--

INSERT INTO `questionaire` (`question_id`, `question`, `answer`, `topic_id`) VALUES
(1, 'How many months do we have in a year?', '12', 0),
(2, ' How many days do we have in a week?', '7', 0),
(3, 'How many days are there in a year?', '365', 0),
(4, 'What is 2+2?', '4', 0),
(5, 'Which number comes after 6?', '7', 0),
(6, 'Brass gets discoloured in air because of the presence of which of the following gases in air?', 'Hydrogen sulphide', 0),
(7, '	\r\nWhich of the following is a non metal that remains liquid at room temperature?', 'Bromine', 0),
(8, 'Chlorophyll is a naturally occurring chelate compound in which central metal is', 'magnesium', 0),
(9, '	\r\nWhich of the following is used in pencils?', 'Graphite', 0),
(10, 'Which of the following metals forms an amalgam with other metals?', 'Mercury', 0),
(11, ' Electrons are larger than molecules.', 'false', 0),
(12, 'The Atlantic Ocean is the biggest ocean on Earth.', 'false', 0),
(13, 'The chemical make up food often changes when you cook it.', 'true', 0),
(14, 'Sharks are mammals.', 'false', 0),
(15, 'The human body has four lungs.', 'false', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_record`
--
ALTER TABLE `activity_record`
  ADD PRIMARY KEY (`act_record_id`);

--
-- Indexes for table `activity_scores`
--
ALTER TABLE `activity_scores`
  ADD PRIMARY KEY (`act_score_id`);

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `questionaire`
--
ALTER TABLE `questionaire`
  ADD PRIMARY KEY (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_record`
--
ALTER TABLE `activity_record`
  MODIFY `act_record_id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_scores`
--
ALTER TABLE `activity_scores`
  MODIFY `act_score_id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answer_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `questionaire`
--
ALTER TABLE `questionaire`
  MODIFY `question_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
