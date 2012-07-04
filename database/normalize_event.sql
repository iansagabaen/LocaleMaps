use '@DB_NAME@';

drop procedure if exists normalize_event;

delimiter //
create procedure normalize_event()
begin
  declare done tinyint default false;
  declare event_schedule datetime;
  declare event_id int;
  declare event_cursor cursor for select id, schedule from event where year(schedule) != 1970;
  declare continue handler for not found set done = true;
  open event_cursor;
  cursor_loop: loop
    fetch event_cursor into event_id, event_schedule;
    if done then
      leave cursor_loop;
    end if;
    update event set schedule = concat('1970-01-01 ', time(event_schedule)) where id = event_id;
  end loop;
  close event_cursor;
end //

delimiter ;

call normalize_event();