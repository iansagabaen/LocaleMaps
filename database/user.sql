use @DB_NAME@;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

create table user (
  `id` int unsigned auto_increment primary key,
  `username` varchar(50),
  `password` varchar(50),
  `active` tinyint(1),
  `first_name` varchar(75),
  `last_name` varchar(100),
  `role_id` int,
  `activate_hash` varchar(75),
  `created` timestamp not null default current_timestamp,
  foreign key (role_id) references role(id)
) engine=MyISAM default charset=utf8;
