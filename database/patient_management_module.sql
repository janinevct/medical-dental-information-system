-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2026 at 05:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patient_management_module`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `AppointmentID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `AppointmentDate` date DEFAULT NULL,
  `AppointmentTime` time DEFAULT NULL,
  `Purpose` varchar(100) DEFAULT NULL,
  `Status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`AppointmentID`, `PatientID`, `AppointmentDate`, `AppointmentTime`, `Purpose`, `Status`) VALUES
(1, 1, '2026-05-20', '08:00:00', 'Medical Consultation', 'Scheduled'),
(2, 2, '2026-05-21', '10:00:00', 'Tooth Extraction', 'Pending'),
(3, 3, '2026-05-22', '02:00:00', 'Dental Checkup', 'Completed'),
(4, 4, '2026-05-23', '08:00:00', 'Medical Consultation', 'Scheduled');

-- --------------------------------------------------------

--
-- Table structure for table `dental`
--

CREATE TABLE `dental` (
  `ServiceID` int(11) NOT NULL,
  `ToothArea` varchar(100) DEFAULT NULL,
  `DentalProcedure` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dental`
--

INSERT INTO `dental` (`ServiceID`, `ToothArea`, `DentalProcedure`) VALUES
(2, 'Full Mouth', 'Teeth Cleaning'),
(3, 'Upper Molar', 'Extraction');

-- --------------------------------------------------------

--
-- Table structure for table `medical`
--

CREATE TABLE `medical` (
  `ServiceID` int(11) NOT NULL,
  `MedicalSpecialty` varchar(100) DEFAULT NULL,
  `ReferringDoctor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical`
--

INSERT INTO `medical` (`ServiceID`, `MedicalSpecialty`, `ReferringDoctor`) VALUES
(1, 'General Medicine', 'Dr. Santos');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `PatientID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`PatientID`, `FirstName`, `LastName`, `Gender`, `Address`, `ContactNumber`) VALUES
(1, 'Janine', 'Decena', 'Female', 'Legazpi City', '09091122123'),
(2, 'Xavier', 'Garra', 'Male', 'Legazpi City', '09001122435'),
(3, 'Sophia', 'Moreno', 'Female', 'Camarines Norte', '09023122505'),
(4, 'Alrich', 'Perea', 'Male', 'Legazpi City', '09391132435'),
(5, 'Jose', 'Garcia', 'Male', 'Sorsogon City', '09216752435');

-- --------------------------------------------------------

--
-- Table structure for table `patient_history`
--

CREATE TABLE `patient_history` (
  `HistoryID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `HistoryDetails` text DEFAULT NULL,
  `DateRecorded` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_history`
--

INSERT INTO `patient_history` (`HistoryID`, `PatientID`, `HistoryDetails`, `DateRecorded`) VALUES
(1, 1, 'Asthma history since childhood', '2026-01-15'),
(2, 2, 'High blood pressure', '2026-02-10'),
(3, 3, 'No major medical history', '2026-03-05'),
(4, 4, 'No major medical history', '2026-03-07');

-- --------------------------------------------------------

--
-- Table structure for table `patient_record`
--

CREATE TABLE `patient_record` (
  `RecordID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `RecordDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_services`
--

CREATE TABLE `patient_services` (
  `PatientID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL,
  `DateAvailed` date DEFAULT NULL,
  `Status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `ServiceID` int(11) NOT NULL,
  `ServiceName` varchar(100) DEFAULT NULL,
  `ServiceType` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`ServiceID`, `ServiceName`, `ServiceType`, `Description`) VALUES
(1, 'General Consultation', 'Medical', 'Basic health consultation'),
(2, 'Dental Cleaning', 'Dental', 'Professional teeth cleaning'),
(3, 'Tooth Extraction', 'Dental', 'Removal of damaged tooth');

-- --------------------------------------------------------

--
-- Table structure for table `visit`
--

CREATE TABLE `visit` (
  `VisitID` int(11) NOT NULL,
  `PatientID` int(11) DEFAULT NULL,
  `VisitDate` date DEFAULT NULL,
  `VisitTime` time DEFAULT NULL,
  `VisitRemarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visit`
--

INSERT INTO `visit` (`VisitID`, `PatientID`, `VisitDate`, `VisitTime`, `VisitRemarks`) VALUES
(1, 1, '2026-05-01', '09:00:00', 'Routine medical checkup'),
(2, 2, '2026-05-03', '10:50:00', 'Dental cleaning'),
(3, 3, '2026-05-04', '01:30:00', 'Dental cleaning'),
(4, 4, '2026-05-05', '11:30:00', 'Dental cleaning'),
(5, 5, '2026-05-05', '01:00:00', 'Follow-up consultation');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`AppointmentID`),
  ADD KEY `PatientID` (`PatientID`);

--
-- Indexes for table `dental`
--
ALTER TABLE `dental`
  ADD PRIMARY KEY (`ServiceID`);

--
-- Indexes for table `medical`
--
ALTER TABLE `medical`
  ADD PRIMARY KEY (`ServiceID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`PatientID`);

--
-- Indexes for table `patient_history`
--
ALTER TABLE `patient_history`
  ADD PRIMARY KEY (`HistoryID`),
  ADD KEY `PatientID` (`PatientID`);

--
-- Indexes for table `patient_record`
--
ALTER TABLE `patient_record`
  ADD PRIMARY KEY (`RecordID`),
  ADD KEY `PatientID` (`PatientID`);

--
-- Indexes for table `patient_services`
--
ALTER TABLE `patient_services`
  ADD PRIMARY KEY (`PatientID`,`ServiceID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ServiceID`);

--
-- Indexes for table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`VisitID`),
  ADD KEY `PatientID` (`PatientID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `AppointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `PatientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient_history`
--
ALTER TABLE `patient_history`
  MODIFY `HistoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `ServiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `visit`
--
ALTER TABLE `visit`
  MODIFY `VisitID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient` (`PatientID`);

--
-- Constraints for table `dental`
--
ALTER TABLE `dental`
  ADD CONSTRAINT `dental_ibfk_1` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`);

--
-- Constraints for table `medical`
--
ALTER TABLE `medical`
  ADD CONSTRAINT `medical_ibfk_1` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`);

--
-- Constraints for table `patient_history`
--
ALTER TABLE `patient_history`
  ADD CONSTRAINT `patient_history_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient` (`PatientID`);

--
-- Constraints for table `patient_record`
--
ALTER TABLE `patient_record`
  ADD CONSTRAINT `patient_record_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient` (`PatientID`);

--
-- Constraints for table `patient_services`
--
ALTER TABLE `patient_services`
  ADD CONSTRAINT `patient_services_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient` (`PatientID`),
  ADD CONSTRAINT `patient_services_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`);

--
-- Constraints for table `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`PatientID`) REFERENCES `patient` (`PatientID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
