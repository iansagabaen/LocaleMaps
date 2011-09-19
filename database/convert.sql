delimiter //
use '@DB_NAME@';
drop procedure if exists revamp_db;
create procedure revamp_db()
begin
  set @a = 0;
  select count(*) from information_schema.tables where table_schema = 'localemaps' and table_name = 'localemaps' into @a;
  if @a > 0 then
    alter table localemaps rename to locale;
    create table if not exists event (
      id int not null auto_increment,
      locale_id int not null,
      type tinyint not null,
      recurring tinyint not null default 0,
      day_of_week tinyint not null,
      schedule datetime not null,
      metadata text,
      description varchar(1000),
      primary key (id)
    ) engine=MyISAM  default charset=utf8;
  end if;
end;
call revamp_db();
drop procedure if exists revamp_db;
