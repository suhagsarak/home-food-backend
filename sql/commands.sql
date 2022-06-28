mysql -u root -p
show databases;
create database homefood;
show databases;
use homefood;
show tables ;

CREATE TABLE user(uid int PRIMARY KEY AUTO_INCREMENT, name varchar(255), email varchar(255), gender varchar(255), address varchar(255), city varchar(255), type varchar(255), password varchar(255));
CREATE TABLE deliveryperson(dpid int PRIMARY KEY AUTO_INCREMENT, name varchar(255), email varchar(255), gender varchar(255), address varchar(255), city varchar(255), type varchar(255), password varchar(255));
CREATE TABLE product(pid int PRIMARY KEY AUTO_INCREMENT, name varchar(255), category varchar(255), price int);
CREATE TABLE orders(oid int PRIMARY KEY AUTO_INCREMENT, time varchar(255), totalPrice int, uid int, dpid int, status varchar(255), FOREIGN KEY(uid) REFERENCES user(uid),  FOREIGN KEY(dpid) REFERENCES deliveryperson(dpid));
CREATE TABLE productsinorders(poid int PRIMARY KEY AUTO_INCREMENT, oid int, pid int, count int, FOREIGN KEY(oid) REFERENCES orders(oid), FOREIGN KEY(pid) REFERENCES product(pid));
CREATE TABLE feedback(fid int PRIMARY KEY AUTO_INCREMENT, name varchar(255), address varchar(255), email varchar(255), city varchar(255), gender varchar(255), feedback varchar(255));
insert into user (name, email, gender, address, city, password) values ('name', 'email', 'gender', 'address', 'city', 'pwd');
insert into feedback(name, address, email, city, gender, feedback) values ('name', 'address', 'email', 'city', 'gender', 'feedback');

mysqldump -h localhost -u root -p --no-data homefood > schema.sql
mysqldump -h localhost -u root -p homefood > data.sql
