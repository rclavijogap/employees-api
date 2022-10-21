CREATE DATABASE employees_db;
CREATE USER 'employees_user'@'%' IDENTIFIED BY 'employees_password';
CREATE USER 'employees_user'@'localhost' IDENTIFIED BY 'employees_password';
GRANT ALL PRIVILEGES ON employees_db.* TO 'employees_user'@'%';