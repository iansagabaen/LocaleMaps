use @DB_NAME@;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

create table role (
  `id` int unsigned auto_increment primary key,
  `description` varchar(50)
) engine=MyISAM default charset=utf8;

insert into role values (1000, 'Administrator');
insert into role values (1001, 'Power User');