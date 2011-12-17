delimiter //
USE `@DB_NAME@`;

CREATE TRIGGER ins_locale BEFORE INSERT ON locale
FOR EACH ROW
BEGIN
  IF NEW.country = 'US' THEN
    select id, name into @country_id, @us_name from country where iso2 = 'US';
    select name into @full_state from region where abbrev = NEW.state;
    set NEW.full_state = @full_state;
    set NEW.country_id = @country_id;
    set NEW.country = @us_name;
  END IF;
END;

CREATE TRIGGER upd_locale BEFORE UPDATE ON locale
FOR EACH ROW
BEGIN
  IF NEW.country = 'US' THEN
    select id, name into @country_id, @us_name from country where iso2 = 'US';
    select name into @full_state from region where abbrev = NEW.state;
    set NEW.full_state = @full_state;
    set NEW.country_id = @country_id;
    set NEW.country = @us_name;
  END IF;
END
