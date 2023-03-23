CREATE DATABASE prestadores;
USE prestadores;

CREATE TABLE prestador(
idPrestador INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(30),
email VARCHAR(50),
cpf CHAR(11),
senha VARCHAR(30)
);

SELECT * FROM prestador;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;