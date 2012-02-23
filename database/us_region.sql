use @DB_NAME@;

# usps_region_list.sql
#
# This will create and then populate a MySQL table with a list of the names and
# USPS abbreviations for US state and possessions in existence as of the date 
# below.
#
# Usage:
#    mysql -u username -p password database_name < usps_region_list.sql
#
# For updates to this file, see http://27.org/isocountrylist/
# For more about USPS state abbreviations, see http://www.usps.com/ncsc/lookups/usps_abbreviations.html
#
# Wm. Rhodes <iso_country_list@27.org>
# 1/1/03
#

create table if not exists region (
  id int not null auto_increment,
  country_id int not null,
  name varchar(40) not null,
  abbrev varchar(2) not null,
  primary key (id),
  foreign key (country_id) references country(id)
) engine=MyISAM default charset=utf8;

INSERT INTO region (country_id, name, abbrev) values (100227, 'Alaska', 'AK');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Alabama', 'AL');
INSERT INTO region (country_id, name, abbrev) values (100227, 'American Samoa', 'AS');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Arizona', 'AZ');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Arkansas', 'AR');
INSERT INTO region (country_id, name, abbrev) values (100227, 'California', 'CA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Colorado', 'CO');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Connecticut', 'CT');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Delaware', 'DE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'District of Columbia', 'DC');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Federated region of Micronesia', 'FM');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Florida', 'FL');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Georgia', 'GA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Guam', 'GU');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Hawaii', 'HI');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Idaho', 'ID');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Illinois', 'IL');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Indiana', 'IN');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Iowa', 'IA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Kansas', 'KS');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Kentucky', 'KY');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Louisiana', 'LA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Maine', 'ME');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Marshall Islands', 'MH');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Maryland', 'MD');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Massachusetts', 'MA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Michigan', 'MI');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Minnesota', 'MN');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Mississippi', 'MS');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Missouri', 'MO');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Montana', 'MT');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Nebraska', 'NE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Nevada', 'NV');
INSERT INTO region (country_id, name, abbrev) values (100227, 'New Hampshire', 'NH');
INSERT INTO region (country_id, name, abbrev) values (100227, 'New Jersey', 'NJ');
INSERT INTO region (country_id, name, abbrev) values (100227, 'New Mexico', 'NM');
INSERT INTO region (country_id, name, abbrev) values (100227, 'New York', 'NY');
INSERT INTO region (country_id, name, abbrev) values (100227, 'North Carolina', 'NC');
INSERT INTO region (country_id, name, abbrev) values (100227, 'North Dakota', 'ND');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Northern Mariana Islands', 'MP');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Ohio', 'OH');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Oklahoma', 'OK');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Oregon', 'OR');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Palau', 'PW');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Pennsylvania', 'PA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Puerto Rico', 'PR');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Rhode Island', 'RI');
INSERT INTO region (country_id, name, abbrev) values (100227, 'South Carolina', 'SC');
INSERT INTO region (country_id, name, abbrev) values (100227, 'South Dakota', 'SD');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Tennessee', 'TN');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Texas', 'TX');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Utah', 'UT');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Vermont', 'VT');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Virgin Islands', 'VI');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Virginia', 'VA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Washington', 'WA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'West Virginia', 'WV');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Wisconsin', 'WI');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Wyoming', 'WY');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Africa', 'AE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Americas (except Canada)', 'AA');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Canada', 'AE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Europe', 'AE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Middle East', 'AE');
INSERT INTO region (country_id, name, abbrev) values (100227, 'Armed Forces Pacific', 'AP');