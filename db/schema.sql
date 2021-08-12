-- DROP TABLE IF EXISTS departments;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS employees;
USE employee_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_Name VARCHAR(30) NOT NULL,
    job_title_id INTEGER,
    FOREIGN KEY (job_title_id) REFERENCES roles(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);