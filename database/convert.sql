use `@DB_NAME@`;

alter table `localemaps` rename to `locale`;

create table if not exists `event` (
  `id` int  not null auto_increment,
  `locale_id` int not null,
  `type` tinyint not null,
  `recurring` tinyint not null default 0,
  `day_of_week` tinyint not null,
  `schedule` datetime not null,
  `metadata` text,
  `description` varchar(1000),
  primary key  (`id`)
) engine=MyISAM  default charset=utf8;