use @DB_NAME@;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

create table `notice` (
  `id` int(11) not null auto_increment,
  `locale_id` int(11) not null,
  `description` varchar(400) default null,
  `start` datetime not null,
  `end` datetime not null,
  primary key (`id`),
  foreign key (`locale_id`) references locale(`id`),
  key `locale_id` (`locale_id`)
) engine=MyISAM default charset=utf8