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

CREATE TABLE fonts (
	font_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    font VARCHAR(21) NOT NULL
);

INSERT INTO fonts (font) 
VALUES ('Arial'),
       ('Roboto'), 
       ('Times New Roman'), 
       ('Courier New'),
       ('Verdana'), 
       ('Georgia'),
       ('Palatino'), 
       ('Bookman'), 
       ('Candara'), 
       ('Comic Sans MS');

CREATE TABLE users (
    user_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(21) NOT NULL,
    password VARCHAR(21) NOT NULL,
    display_name VARCHAR(21) NOT NULL,
    color_id INT(11) DEFAULT 1,
    font_id INT(11) DEFAULT 1,
	FOREIGN KEY fk1(color_id) REFERENCES colors(color_id)
);

INSERT INTO users (username, password, display_name) VALUES ('admin', 'admin', 'admin');

-- Handy Dandy SELECTS for your convenience
SELECT * FROM users;
SELECT * FROM quips;
SELECT * FROM fonts;
SELECT * FROM colors;