DROP DATABASE IF EXISTS meyering_project_db;
CREATE DATABASE meyering_project_db;
USE meyering_project_db;


           
CREATE TABLE quips (
	quip_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quip VARCHAR(256) NOT NULL
);

INSERT INTO quips (quip) VALUES ('"I am a HUGE Noob"');

CREATE TABLE colors (
	color_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    color VARCHAR(8) NOT NULL
);

INSERT INTO colors (color) VALUES ('#FFFFFF');

CREATE TABLE users (
    user_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(21) NOT NULL,
    password VARCHAR(21) NOT NULL,
    display_name VARCHAR(21) NOT NULL,
    color_id INT(11) DEFAULT 1,
    quip_id INT(11) DEFAULT 1,
    FOREIGN KEY fk1(quip_id) REFERENCES quips(quip_id),
	FOREIGN KEY fk2(color_id) REFERENCES colors(color_id)
);

INSERT INTO users (username, password, display_name) VALUES ('admin', 'admin', 'admin');

-- Handy Dandy SELECTS for your convenience
SELECT * FROM users;
SELECT * FROM quips;
SELECT * FROM colors;