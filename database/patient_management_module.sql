CREATE DATABASE IF NOT EXISTS patient_management_module;
USE patient_management_module;

CREATE TABLE patient (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Gender VARCHAR(10),
    Address VARCHAR(100),
    ContactNumber VARCHAR(20)
);

INSERT INTO patient 
(FirstName, LastName, Gender, Address, ContactNumber)
VALUES
('Janine', 'Decena', 'Female', 'Legazpi City', '09091122123'),
('Xavier', 'Garra', 'Male', 'Legazpi City', '09001122435'),
('Sophia', 'Moreno', 'Female', 'Camarines Norte', '09023122505'),
('Alrich', 'Perea', 'Male', 'Legazpi City', '09391132435'),
('Jose', 'Garcia', 'Male', 'Sorsogon City', '09216752435');

CREATE TABLE services (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    ServiceName VARCHAR(100),
    ServiceType VARCHAR(50),
    Description TEXT
);

INSERT INTO services
(ServiceName, ServiceType, Description)
VALUES
('General Consultation', 'Medical', 'Basic health consultation'),
('Dental Cleaning', 'Dental', 'Professional teeth cleaning'),
('Tooth Extraction', 'Dental', 'Removal of damaged tooth');


CREATE TABLE medical (
    ServiceID INT PRIMARY KEY,
    MedicalSpecialty VARCHAR(100),
    ReferringDoctor VARCHAR(100),

    CONSTRAINT medical_ibfk_1
    FOREIGN KEY (ServiceID)
    REFERENCES services(ServiceID)
);

INSERT INTO medical
(ServiceID, MedicalSpecialty, ReferringDoctor)
VALUES
(1, 'General Medicine', 'Dr. Santos');

CREATE TABLE dental (
    ServiceID INT PRIMARY KEY,
    ToothArea VARCHAR(100),
    DentalProcedure VARCHAR(100),

    CONSTRAINT dental_ibfk_1
    FOREIGN KEY (ServiceID)
    REFERENCES services(ServiceID)
);

INSERT INTO dental
(ServiceID, ToothArea, DentalProcedure)
VALUES
(2, 'Full Mouth', 'Teeth Cleaning'),
(3, 'Upper Molar', 'Extraction');

CREATE TABLE appointment (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    Purpose VARCHAR(100),
    Status VARCHAR(30),

    CONSTRAINT appointment_ibfk_1
    FOREIGN KEY (PatientID)
    REFERENCES patient(PatientID)
);

INSERT INTO appointment
(PatientID, AppointmentDate, AppointmentTime, Purpose, Status)
VALUES
(1, '2026-05-20', '08:00:00', 'Medical Consultation', 'Scheduled'),
(2, '2026-05-21', '10:00:00', 'Tooth Extraction', 'Pending'),
(3, '2026-05-22', '02:00:00', 'Dental Checkup', 'Completed'),
(4, '2026-05-23', '08:00:00', 'Medical Consultation', 'Scheduled');

CREATE TABLE patient_history (
    HistoryID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    HistoryDetails TEXT,
    DateRecorded DATE,

    CONSTRAINT patient_history_ibfk_1
    FOREIGN KEY (PatientID)
    REFERENCES patient(PatientID)
);

INSERT INTO patient_history
(PatientID, HistoryDetails, DateRecorded)
VALUES
(1, 'Asthma history since childhood', '2026-01-15'),
(2, 'High blood pressure', '2026-02-10'),
(3, 'No major medical history', '2026-03-05'),
(4, 'No major medical history', '2026-03-07');

CREATE TABLE patient_record (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    RecordDate DATE,

    CONSTRAINT patient_record_ibfk_1
    FOREIGN KEY (PatientID)
    REFERENCES patient(PatientID)
);

CREATE TABLE patient_services (
    PatientID INT,
    ServiceID INT,
    DateAvailed DATE,
    Status VARCHAR(30),

    PRIMARY KEY (PatientID, ServiceID),

    CONSTRAINT patient_services_ibfk_1
    FOREIGN KEY (PatientID)
    REFERENCES patient(PatientID),

    CONSTRAINT patient_services_ibfk_2
    FOREIGN KEY (ServiceID)
    REFERENCES services(ServiceID)
);

CREATE TABLE visit (
    VisitID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    VisitDate DATE,
    VisitTime TIME,
    VisitRemarks TEXT,

    CONSTRAINT visit_ibfk_1
    FOREIGN KEY (PatientID)
    REFERENCES patient(PatientID)
);

INSERT INTO visit
(PatientID, VisitDate, VisitTime, VisitRemarks)
VALUES
(1, '2026-05-01', '09:00:00', 'Routine medical checkup'),
(2, '2026-05-03', '10:50:00', 'Dental cleaning'),
(3, '2026-05-04', '01:30:00', 'Dental cleaning'),
(4, '2026-05-05', '11:30:00', 'Dental cleaning'),
(5, '2026-05-05', '01:00:00', 'Follow-up consultation');