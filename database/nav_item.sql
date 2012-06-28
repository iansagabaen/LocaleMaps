use @DB_NAME@;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

create table nav_item (
  `id` int unsigned auto_increment primary key,
  `name` varchar(50),
  `level` tinyint,
  `ordinal` tinyint,
  `parent_id` int,
  `locale_id` int,
  foreign key (parent_id) references nav_item(id),
  foreign key (locale_id) references locale(localeid)
) engine=MyISAM default charset=utf8;

insert into nav_item values (1000, 'Americas', 0, 1, null, null);
insert into nav_item values (1001, 'Europe', 0, 2, null, null);
insert into nav_item values (1002, 'Australia', 0, 3, null, null);
insert into nav_item values (1003, 'Africa', 0, 4, null, null);
insert into nav_item values (1004, 'Asia', 0, 5, null, null);
insert into nav_item values (1005, 'Philippines', 0, 6, null, null);

insert into nav_item values (1006, 'Canada East', 1, 1, 1000, null);
insert into nav_item values (1007, 'Canada West', 1, 2, 1000, null);
insert into nav_item values (1008, 'Hawaii Pacific', 1, 3, 1000, null);
insert into nav_item values (1009, 'Northern California', 1, 4, 1000, null);
insert into nav_item values (1010, 'Southern California', 1, 5, 1000, null);
insert into nav_item values (1011, 'Northeastern Seaboard', 1, 6, 1000, null);
insert into nav_item values (1012, 'Southeastern Seaboard', 1, 7, 1000, null);
insert into nav_item values (1013, 'Northern Midwest', 1, 8, 1000, null);
insert into nav_item values (1014, 'Southern Midwest', 1, 9, 1000, null);
insert into nav_item values (1015, 'Pacific Northwest', 1, 10, 1000, null);

insert into nav_item values (1016, 'Northern Europe', 1, 1, 1001, null);
insert into nav_item values (1017, 'Southern Europe', 1, 2, 1001, null);
