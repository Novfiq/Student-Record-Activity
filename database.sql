CREATE DATABASE students_db;
USE students_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    role VARCHAR(20),
    department VARCHAR(100),
    cgpa FLOAT,
    skills TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    resume VARCHAR(255)
);

CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    type VARCHAR(100),
    description TEXT,
    date DATE,
    status VARCHAR(20) DEFAULT 'Pending',
    remarks TEXT,
    file VARCHAR(255),
    student_id INT,
    FOREIGN KEY(student_id) REFERENCES students(id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    student_id INT,
    status VARCHAR(20) DEFAULT 'Unread'
);