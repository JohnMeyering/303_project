DROP DATABASE IF EXISTS meyering_project_db;
CREATE DATABASE meyering_project_db;
USE meyering_project_db;


           
CREATE TABLE quips (
	quip_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quip VARCHAR(256) NOT NULL
);

INSERT INTO quips (quip)
VALUES ('"I am a HUGE Noob"'),
	   ('A terrible thing to carve into a tree'),
       ('What God said when he created the penis'),
       ('Something to stuff a bra with if you\'re in a hurry'),
       ('What would happen if you removed all of Johnny Depp\'s many scarves?'),
       ('A great way to get expelled form Hogwart\'s'),
       ('The number one reported crime in Mister Rogers\'s neighborhood'),
       ('An awkward thing to shout while bouncing on a trampoline with your friend'),
       ('What sperm are thinking as they race toward the egg'),
       ('A weird thing to hear from your grandpa: "I wish I had spent more time ______"'),
       ('The hardest part about being Justin Beiber\'s bodyguard'),
       ('The worst excuse Clark Kent has given Lois Lane so he could go change into Superman'),
       ('It would be weird if aliens arrived and the first thing they said was "Take us to your _____"'),
       ('Something in 98% of all cargo pants pockets'),
       ('The worst time to tell someone you want a divorce is in the middle of ______'),
       ('You\'ll realize you shouldn\'t have picked up the hitchhiker when he says, "_____"'),
       ('An unusual store: ______ R\' US'),
       ('The worst thing to hear from your spouse: "I\'m leaving your for _____"'),
       ('A good sign everyone in your dance class hates you'),
       ('The quickest way to ride yourself of tapeworm'),
       ('Remember, when dining at a sushi restaurant, you should never, ever ______'),
       ('A suprise benefit of all of the homeless in Los Angeles'),
       ('The name a Starbucks barista would write on the cup for Mohandas Ghandi'),
       ('What a turtle looks for in a mate'),
       ('Explain how babies are made in three words'),
       ('A weird thing for a baseball umpire to lean down and say to a catcher'),
       ('A bad excuse when trying to return a sports bra'),
       ('The name of an exhibit you\'d be suprised to see at an art museum'),
       ('A fun activity that only requires three fingers'),
       ('A weird thing for Peyton Manning to endorse'),
       ('The title of the worst book to read on a toilet'),
       ('Something you don\'t want to find in your grandpa\'s tool shed'),
       ('The name of a singles bar for pirates'),
       ('Something a friendly heckler would yell at a comedy show'),
       ('The worst excuse for ditching your date'),
       ('The name of a fast food restaurant where the workers don\'t wear pants'),
       ('The strangest party favors at a bachelorette party would be a penis-shaped ______'),
       ('What\'s that smell?'),
       ('Breaking news! Scientists have just discovered nature\'s fiercest creature: the ______ shark'),
       ('Something an overexcited fan would yell at a tense dog show'),
       ('A rejected name for nipples'),
       ('The next big reality show: America\'s Got _______'),
       ('A rejected section of the King James Bible: the part where Jesus _______'),
       ('A good name for a mint for your butt'),
       ('How you know your RV is haunted'),
       ('A rejected, less scary, title for the movie JAWS'),
       ('In the year 2085, ______ will be the American currency'),
       ('Harry Potter can do a really weird and obscure spell that allows him to ______'),
       ('A bad thing to hear after yelling "Hello" in a cave'),
       ('A weird thihng for a President to announce: I did not have _______ with that woman'),
       ('The worst thing to blurt out when watching a movie sex scene with your parents'),
       ('A sex position for ghosts'),
       ('A good name for a Christian water park'),
       ('What makes hobos so sexy?');

CREATE TABLE colors (
	color_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    color VARCHAR(8) NOT NULL
);

INSERT INTO colors (color) VALUES ('#000000');

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
	FOREIGN KEY fk1(color_id) REFERENCES colors(color_id),
    FOREIGN KEY fk2(font_id) REFERENCES fonts(font_id)
);

INSERT INTO users (username, password, display_name) VALUES ('admin', 'admin', 'admin');

-- Handy Dandy SELECTS for your convenience
SELECT * FROM users;
SELECT * FROM quips;
SELECT * FROM fonts;
SELECT * FROM colors;