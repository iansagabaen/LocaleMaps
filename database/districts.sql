USE `@DB_NAME@`;

create table district (
  `id` int not null auto_increment,
  `name` varchar(64),
  primary key (id)
) engine=MyISAM default charset=utf8;

insert into district (id, name) values (1001, 'Africa');
insert into district (id, name) values (1002, 'Asia');
insert into district (id, name) values (1003, 'Canada East');
insert into district (id, name) values (1004, 'Canada West');
insert into district (id, name) values (1005, 'Hawaii-Pacific');
insert into district (id, name) values (1006, 'Metro Manila Central');
insert into district (id, name) values (1007, 'Metro Manila East');
insert into district (id, name) values (1008, 'Metro Manila North');
insert into district (id, name) values (1009, 'Metro Manila South');
insert into district (id, name) values (1010, 'Metro Manila West');
insert into district (id, name) values (1011, 'Middle East');
insert into district (id, name) values (1012, 'Northeastern Seaboard');
insert into district (id, name) values (1013, 'Northern California');
insert into district (id, name) values (1014, 'Northern Europe');
insert into district (id, name) values (1015, 'Northern Midwest');
insert into district (id, name) values (1016, 'South America');
insert into district (id, name) values (1017, 'Southeastern Seaboard');
insert into district (id, name) values (1018, 'Southern California');
insert into district (id, name) values (1019, 'Southern Europe');
insert into district (id, name) values (1020, 'Southern Midwest');
