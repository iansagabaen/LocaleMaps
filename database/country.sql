USE `@DB_NAME@`;

create table country (
  id int not null auto_increment,
  iso2 varchar(2),
  iso3 varchar(3),
  name varchar(64),
  primary key (id)
) engine=MyISAM default charset=utf8;

INSERT INTO country (id, iso2, iso3, name) values (1001, 'AF', 'AFG', 'Afghanistan');
INSERT INTO country (id, iso2, iso3, name) values (1002, 'AX', 'ALA', 'Åland Islands');
INSERT INTO country (id, iso2, iso3, name) values (1004, 'DZ', 'DZA', 'Algeria (El Djazaïr)');
INSERT INTO country (id, iso2, iso3, name) values (1003, 'AL', 'ALB', 'Albania');
INSERT INTO country (id, iso2, iso3, name) values (1005, 'AS', 'ASM', 'American Samoa');
INSERT INTO country (id, iso2, iso3, name) values (1006, 'AD', 'AND', 'Andorra');
INSERT INTO country (id, iso2, iso3, name) values (1007, 'AO', 'AGO', 'Angola');
INSERT INTO country (id, iso2, iso3, name) values (1008, 'AI', 'AIA', 'Anguilla');
INSERT INTO country (id, iso2, iso3, name) values (1009, 'AQ', 'ATA', 'Antarctica');
INSERT INTO country (id, iso2, iso3, name) values (10010, 'AG', 'ATG', 'Antigua and Barbuda');
INSERT INTO country (id, iso2, iso3, name) values (10011, 'AR', 'ARG', 'Argentina');
INSERT INTO country (id, iso2, iso3, name) values (10012, 'AM', 'ARM', 'Armenia');
INSERT INTO country (id, iso2, iso3, name) values (10013, 'AW', 'ABW', 'Aruba');
INSERT INTO country (id, iso2, iso3, name) values (10014, 'AU', 'AUS', 'Australia');
INSERT INTO country (id, iso2, iso3, name) values (10015, 'AT', 'AUT', 'Austria');
INSERT INTO country (id, iso2, iso3, name) values (10016, 'AZ', 'AZE', 'Azerbaijan');
INSERT INTO country (id, iso2, iso3, name) values (10017, 'BS', 'BHS', 'Bahamas');
INSERT INTO country (id, iso2, iso3, name) values (10018, 'BH', 'BHR', 'Bahrain');
INSERT INTO country (id, iso2, iso3, name) values (10019, 'BD', 'BGD', 'Bangladesh');
INSERT INTO country (id, iso2, iso3, name) values (10020, 'BB', 'BRB', 'Barbados');
INSERT INTO country (id, iso2, iso3, name) values (10021, 'BY', 'BLR', 'Belarus');
INSERT INTO country (id, iso2, iso3, name) values (10022, 'BE', 'BEL', 'Belgium');
INSERT INTO country (id, iso2, iso3, name) values (10023, 'BZ', 'BLZ', 'Belize');
INSERT INTO country (id, iso2, iso3, name) values (10024, 'BJ', 'BEN', 'Benin');
INSERT INTO country (id, iso2, iso3, name) values (10025, 'BM', 'BMU', 'Bermuda');
INSERT INTO country (id, iso2, iso3, name) values (10026, 'BT', 'BTN', 'Bhutan');
INSERT INTO country (id, iso2, iso3, name) values (10027, 'BO', 'BOL', 'Bolivia');
INSERT INTO country (id, iso2, iso3, name) values (10028, 'BA', 'BIH', 'Bosnia and Herzegovina');
INSERT INTO country (id, iso2, iso3, name) values (10029, 'BW', 'BWA', 'Botswana');
INSERT INTO country (id, iso2, iso3, name) values (10030, 'BV', 'BVT', 'Bouvet Island');
INSERT INTO country (id, iso2, iso3, name) values (10031, 'BR', 'BRA', 'Brazil');
INSERT INTO country (id, iso2, iso3, name) values (10032, 'IO', 'IOT', 'British Indian Ocean Territory');
INSERT INTO country (id, iso2, iso3, name) values (10033, 'BN', 'BRN', 'Brunei Darussalam');
INSERT INTO country (id, iso2, iso3, name) values (10034, 'BG', 'BGR', 'Bulgaria');
INSERT INTO country (id, iso2, iso3, name) values (10035, 'BF', 'BFA', 'Burkina Faso');
INSERT INTO country (id, iso2, iso3, name) values (10036, 'BI', 'BDI', 'Burundi');
INSERT INTO country (id, iso2, iso3, name) values (10037, 'KH', 'KHM', 'Cambodia');
INSERT INTO country (id, iso2, iso3, name) values (10038, 'CM', 'CMR', 'Cameroon');
INSERT INTO country (id, iso2, iso3, name) values (10039, 'CA', 'CAN', 'Canada');
INSERT INTO country (id, iso2, iso3, name) values (10040, 'CV', 'CPV', 'Cape Verde');
INSERT INTO country (id, iso2, iso3, name) values (10041, 'KY', 'CYM', 'Cayman Islands');
INSERT INTO country (id, iso2, iso3, name) values (10042, 'CF', 'CAF', 'Central African Republic');
INSERT INTO country (id, iso2, iso3, name) values (10043, 'TD', 'TCD', 'Chad (T''Chad)');
INSERT INTO country (id, iso2, iso3, name) values (10044, 'CL', 'CHL', 'Chile');
INSERT INTO country (id, iso2, iso3, name) values (10045, 'CN', 'CHN', 'China');
INSERT INTO country (id, iso2, iso3, name) values (10046, 'CX', 'CXR', 'Christmas Island');
INSERT INTO country (id, iso2, iso3, name) values (10047, 'CC', 'CCK', 'Cocos (Keeling) Islands');
INSERT INTO country (id, iso2, iso3, name) values (10048, 'CO', 'COL', 'Colombia');
INSERT INTO country (id, iso2, iso3, name) values (10049, 'KM', 'COM', 'Comoros');
INSERT INTO country (id, iso2, iso3, name) values (10050, 'CG', 'COG', 'Congo, Republic Of');
INSERT INTO country (id, iso2, iso3, name) values (10051, 'CD', 'COD', 'Congo, The Democratic Republic of the (formerly Zaire)');
INSERT INTO country (id, iso2, iso3, name) values (10052, 'CK', 'COK', 'Cook Islands');
INSERT INTO country (id, iso2, iso3, name) values (10053, 'CR', 'CRI', 'Costa Rica');
INSERT INTO country (id, iso2, iso3, name) values (10054, 'CI', 'CIV', 'CÔte D''Ivoire (Ivory Coast)');
INSERT INTO country (id, iso2, iso3, name) values (10055, 'HR', 'HRV', 'Croatia (hrvatska)');
INSERT INTO country (id, iso2, iso3, name) values (10056, 'CU', 'CUB', 'Cuba');
INSERT INTO country (id, iso2, iso3, name) values (10057, 'CY', 'CYP', 'Cyprus');
INSERT INTO country (id, iso2, iso3, name) values (10058, 'CZ', 'CZE', 'Czech Republic');
INSERT INTO country (id, iso2, iso3, name) values (10059, 'DK', 'DNK', 'Denmark');
INSERT INTO country (id, iso2, iso3, name) values (10060, 'DJ', 'DJI', 'Djibouti');
INSERT INTO country (id, iso2, iso3, name) values (10061, 'DM', 'DMA', 'Dominica');
INSERT INTO country (id, iso2, iso3, name) values (10062, 'DO', 'DOM', 'Dominican Republic');
INSERT INTO country (id, iso2, iso3, name) values (10063, 'EC', 'ECU', 'Ecuador');
INSERT INTO country (id, iso2, iso3, name) values (10064, 'EG', 'EGY', 'Egypt');
INSERT INTO country (id, iso2, iso3, name) values (10065, 'SV', 'SLV', 'El Salvador');
INSERT INTO country (id, iso2, iso3, name) values (10066, 'GQ', 'GNQ', 'Equatorial Guinea');
INSERT INTO country (id, iso2, iso3, name) values (10067, 'ER', 'ERI', 'Eritrea');
INSERT INTO country (id, iso2, iso3, name) values (10068, 'EE', 'EST', 'Estonia');
INSERT INTO country (id, iso2, iso3, name) values (10069, 'ET', 'ETH', 'Ethiopia');
INSERT INTO country (id, iso2, iso3, name) values (10070, 'FO', 'FRO', 'Faeroe Islands');
INSERT INTO country (id, iso2, iso3, name) values (10071, 'FK', 'FLK', 'Falkland Islands (Malvinas)');
INSERT INTO country (id, iso2, iso3, name) values (10072, 'FJ', 'FJI', 'Fiji');
INSERT INTO country (id, iso2, iso3, name) values (10073, 'FI', 'FIN', 'Finland');
INSERT INTO country (id, iso2, iso3, name) values (10074, 'FR', 'FRA', 'France');
INSERT INTO country (id, iso2, iso3, name) values (10075, 'GF', 'GUF', 'French Guiana');
INSERT INTO country (id, iso2, iso3, name) values (10076, 'PF', 'PYF', 'French Polynesia');
INSERT INTO country (id, iso2, iso3, name) values (10077, 'TF', 'ATF', 'French Southern Territories');
INSERT INTO country (id, iso2, iso3, name) values (10078, 'GA', 'GAB', 'Gabon');
INSERT INTO country (id, iso2, iso3, name) values (10079, 'GM', 'GMB', 'Gambia, The');
INSERT INTO country (id, iso2, iso3, name) values (10080, 'GE', 'GEO', 'Georgia');
INSERT INTO country (id, iso2, iso3, name) values (10081, 'DE', 'DEU', 'Germany (Deutschland)');
INSERT INTO country (id, iso2, iso3, name) values (10082, 'GH', 'GHA', 'Ghana');
INSERT INTO country (id, iso2, iso3, name) values (10083, 'GI', 'GIB', 'Gibraltar');
INSERT INTO country (id, iso2, iso3, name) values (10084, 'GB', 'GBR', 'Great Britain');
INSERT INTO country (id, iso2, iso3, name) values (10085, 'GR', 'GRC', 'Greece');
INSERT INTO country (id, iso2, iso3, name) values (10086, 'GL', 'GRL', 'Greenland');
INSERT INTO country (id, iso2, iso3, name) values (10087, 'GD', 'GRD', 'Grenada');
INSERT INTO country (id, iso2, iso3, name) values (10088, 'GP', 'GLP', 'Guadeloupe');
INSERT INTO country (id, iso2, iso3, name) values (10089, 'GU', 'GUM', 'Guam');
INSERT INTO country (id, iso2, iso3, name) values (10090, 'GT', 'GTM', 'Guatemala');
INSERT INTO country (id, iso2, iso3, name) values (10091, 'GN', 'GIN', 'Guinea');
INSERT INTO country (id, iso2, iso3, name) values (10092, 'GW', 'GNB', 'Guinea-bissau');
INSERT INTO country (id, iso2, iso3, name) values (10093, 'GY', 'GUY', 'Guyana');
INSERT INTO country (id, iso2, iso3, name) values (10094, 'HT', 'HTI', 'Haiti');
INSERT INTO country (id, iso2, iso3, name) values (10095, 'HM', 'HMD', 'Heard Island and Mcdonald Islands');
INSERT INTO country (id, iso2, iso3, name) values (10096, 'HN', 'HND', 'Honduras');
INSERT INTO country (id, iso2, iso3, name) values (10097, 'HK', 'HKG', 'Hong Kong (Special Administrative Region of China)');
INSERT INTO country (id, iso2, iso3, name) values (10098, 'HU', 'HUN', 'Hungary');
INSERT INTO country (id, iso2, iso3, name) values (10099, 'IS', 'ISL', 'Iceland');
INSERT INTO country (id, iso2, iso3, name) values (100100, 'IN', 'IND', 'India');
INSERT INTO country (id, iso2, iso3, name) values (100101, 'ID', 'IDN', 'Indonesia');
INSERT INTO country (id, iso2, iso3, name) values (100102, 'IR', 'IRN', 'Iran (Islamic Republic of Iran)');
INSERT INTO country (id, iso2, iso3, name) values (100103, 'IQ', 'IRQ', 'Iraq');
INSERT INTO country (id, iso2, iso3, name) values (100104, 'IE', 'IRL', 'Ireland');
INSERT INTO country (id, iso2, iso3, name) values (100105, 'IL', 'ISR', 'Israel');
INSERT INTO country (id, iso2, iso3, name) values (100106, 'IT', 'ITA', 'Italy');
INSERT INTO country (id, iso2, iso3, name) values (100107, 'JM', 'JAM', 'Jamaica');
INSERT INTO country (id, iso2, iso3, name) values (100108, 'JP', 'JPN', 'Japan');
INSERT INTO country (id, iso2, iso3, name) values (100109, 'JO', 'JOR', 'Jordan (Hashemite Kingdom of Jordan)');
INSERT INTO country (id, iso2, iso3, name) values (100110, 'KZ', 'KAZ', 'Kazakhstan');
INSERT INTO country (id, iso2, iso3, name) values (100111, 'KE', 'KEN', 'Kenya');
INSERT INTO country (id, iso2, iso3, name) values (100112, 'KI', 'KIR', 'Kiribati');
INSERT INTO country (id, iso2, iso3, name) values (100113, 'KP', 'PRK', 'Korea (Democratic Peoples Republic pf [North] Korea)');
INSERT INTO country (id, iso2, iso3, name) values (100114, 'KR', 'KOR', 'Korea (Republic of [South] Korea)');
INSERT INTO country (id, iso2, iso3, name) values (100115, 'KW', 'KWT', 'Kuwait');
INSERT INTO country (id, iso2, iso3, name) values (100116, 'KG', 'KGZ', 'Kyrgyzstan');
INSERT INTO country (id, iso2, iso3, name) values (100117, 'LA', 'LAO', 'Lao People''s Democratic Republic');
INSERT INTO country (id, iso2, iso3, name) values (100118, 'LV', 'LVA', 'Latvia');
INSERT INTO country (id, iso2, iso3, name) values (100119, 'LB', 'LBN', 'Lebanon');
INSERT INTO country (id, iso2, iso3, name) values (100120, 'LS', 'LSO', 'Lesotho');
INSERT INTO country (id, iso2, iso3, name) values (100121, 'LR', 'LBR', 'Liberia');
INSERT INTO country (id, iso2, iso3, name) values (100122, 'LY', 'LBY', 'Libya (Libyan Arab Jamahirya)');
INSERT INTO country (id, iso2, iso3, name) values (100123, 'LI', 'LIE', 'Liechtenstein (Fürstentum Liechtenstein)');
INSERT INTO country (id, iso2, iso3, name) values (100124, 'LT', 'LTU', 'Lithuania');
INSERT INTO country (id, iso2, iso3, name) values (100125, 'LU', 'LUX', 'Luxembourg');
INSERT INTO country (id, iso2, iso3, name) values (100126, 'MO', 'MAC', 'Macao (Special Administrative Region of China)');
INSERT INTO country (id, iso2, iso3, name) values (100127, 'MK', 'MKD', 'Macedonia (Former Yugoslav Republic of Macedonia)');
INSERT INTO country (id, iso2, iso3, name) values (100128, 'MG', 'MDG', 'Madagascar');
INSERT INTO country (id, iso2, iso3, name) values (100129, 'MW', 'MWI', 'Malawi');
INSERT INTO country (id, iso2, iso3, name) values (100130, 'MY', 'MYS', 'Malaysia');
INSERT INTO country (id, iso2, iso3, name) values (100131, 'MV', 'MDV', 'Maldives');
INSERT INTO country (id, iso2, iso3, name) values (100132, 'ML', 'MLI', 'Mali');
INSERT INTO country (id, iso2, iso3, name) values (100133, 'MT', 'MLT', 'Malta');
INSERT INTO country (id, iso2, iso3, name) values (100134, 'MH', 'MHL', 'Marshall Islands');
INSERT INTO country (id, iso2, iso3, name) values (100135, 'MQ', 'MTQ', 'Martinique');
INSERT INTO country (id, iso2, iso3, name) values (100136, 'MR', 'MRT', 'Mauritania');
INSERT INTO country (id, iso2, iso3, name) values (100137, 'MU', 'MUS', 'Mauritius');
INSERT INTO country (id, iso2, iso3, name) values (100138, 'YT', 'MYT', 'Mayotte');
INSERT INTO country (id, iso2, iso3, name) values (100139, 'MX', 'MEX', 'Mexico');
INSERT INTO country (id, iso2, iso3, name) values (100140, 'FM', 'FSM', 'Micronesia (Federated States of Micronesia)');
INSERT INTO country (id, iso2, iso3, name) values (100141, 'MD', 'MDA', 'Moldova');
INSERT INTO country (id, iso2, iso3, name) values (100142, 'MC', 'MCO', 'Monaco');
INSERT INTO country (id, iso2, iso3, name) values (100143, 'MN', 'MNG', 'Mongolia');
INSERT INTO country (id, iso2, iso3, name) values (100144, 'MS', 'MSR', 'Montserrat');
INSERT INTO country (id, iso2, iso3, name) values (100145, 'MA', 'MAR', 'Morocco');
INSERT INTO country (id, iso2, iso3, name) values (100146, 'MZ', 'MOZ', 'Mozambique (Moçambique)');
INSERT INTO country (id, iso2, iso3, name) values (100147, 'MM', 'MMR', 'Myanmar (formerly Burma)');
INSERT INTO country (id, iso2, iso3, name) values (100148, 'NA', 'NAM', 'Namibia');
INSERT INTO country (id, iso2, iso3, name) values (100149, 'NR', 'NRU', 'Nauru');
INSERT INTO country (id, iso2, iso3, name) values (100150, 'NP', 'NPL', 'Nepal');
INSERT INTO country (id, iso2, iso3, name) values (100151, 'NL', 'NLD', 'Netherlands');
INSERT INTO country (id, iso2, iso3, name) values (100152, 'AN', 'ANT', 'Netherlands Antilles');
INSERT INTO country (id, iso2, iso3, name) values (100153, 'NC', 'NCL', 'New Caledonia');
INSERT INTO country (id, iso2, iso3, name) values (100154, 'NZ', 'NZL', 'New Zealand');
INSERT INTO country (id, iso2, iso3, name) values (100155, 'NI', 'NIC', 'Nicaragua');
INSERT INTO country (id, iso2, iso3, name) values (100156, 'NE', 'NER', 'Niger');
INSERT INTO country (id, iso2, iso3, name) values (100157, 'NG', 'NGA', 'Nigeria');
INSERT INTO country (id, iso2, iso3, name) values (100158, 'NU', 'NIU', 'Niue');
INSERT INTO country (id, iso2, iso3, name) values (100159, 'NF', 'NFK', 'Norfolk Island');
INSERT INTO country (id, iso2, iso3, name) values (100160, 'MP', 'MNP', 'Northern Mariana Islands');
INSERT INTO country (id, iso2, iso3, name) values (100161, 'NO', 'NOR', 'Norway');
INSERT INTO country (id, iso2, iso3, name) values (100162, 'OM', 'OMN', 'Oman');
INSERT INTO country (id, iso2, iso3, name) values (100163, 'PK', 'PAK', 'Pakistan');
INSERT INTO country (id, iso2, iso3, name) values (100164, 'PW', 'PLW', 'Palau');
INSERT INTO country (id, iso2, iso3, name) values (100165, 'PS', 'PSE', 'Palestinian Territories');
INSERT INTO country (id, iso2, iso3, name) values (100166, 'PA', 'PAN', 'Panama');
INSERT INTO country (id, iso2, iso3, name) values (100167, 'PG', 'PNG', 'Papua New Guinea');
INSERT INTO country (id, iso2, iso3, name) values (100168, 'PY', 'PRY', 'Paraguay');
INSERT INTO country (id, iso2, iso3, name) values (100169, 'PE', 'PER', 'Peru');
INSERT INTO country (id, iso2, iso3, name) values (100170, 'PH', 'PHL', 'Philippines');
INSERT INTO country (id, iso2, iso3, name) values (100171, 'PN', 'PCN', 'Pitcairn');
INSERT INTO country (id, iso2, iso3, name) values (100172, 'PL', 'POL', 'Poland');
INSERT INTO country (id, iso2, iso3, name) values (100173, 'PT', 'PRT', 'Portugal');
INSERT INTO country (id, iso2, iso3, name) values (100174, 'PR', 'PRI', 'Puerto Rico');
INSERT INTO country (id, iso2, iso3, name) values (100175, 'QA', 'QAT', 'Qatar');
INSERT INTO country (id, iso2, iso3, name) values (100176, 'RE', 'REU', 'RÉunion');
INSERT INTO country (id, iso2, iso3, name) values (100177, 'RO', 'ROU', 'Romania');
INSERT INTO country (id, iso2, iso3, name) values (100178, 'RU', 'RUS', 'Russian Federation');
INSERT INTO country (id, iso2, iso3, name) values (100179, 'RW', 'RWA', 'Rwanda');
INSERT INTO country (id, iso2, iso3, name) values (100180, 'SH', 'SHN', 'Saint Helena');
INSERT INTO country (id, iso2, iso3, name) values (100181, 'KN', 'KNA', 'Saint Kitts and Nevis');
INSERT INTO country (id, iso2, iso3, name) values (100182, 'LC', 'LCA', 'Saint Lucia');
INSERT INTO country (id, iso2, iso3, name) values (100183, 'PM', 'SPM', 'Saint Pierre and Miquelon');
INSERT INTO country (id, iso2, iso3, name) values (100184, 'VC', 'VCT', 'Saint Vincent and the Grenadines');
INSERT INTO country (id, iso2, iso3, name) values (100185, 'WS', 'WSM', 'Samoa (formerly Western Samoa)');
INSERT INTO country (id, iso2, iso3, name) values (100186, 'SM', 'SMR', 'San Marino (Republic of)');
INSERT INTO country (id, iso2, iso3, name) values (100187, 'ST', 'STP', 'Sao Tome and Principe');
INSERT INTO country (id, iso2, iso3, name) values (100188, 'SA', 'SAU', 'Saudi Arabia (Kingdom of Saudi Arabia)');
INSERT INTO country (id, iso2, iso3, name) values (100189, 'SN', 'SEN', 'Senegal');
INSERT INTO country (id, iso2, iso3, name) values (100190, 'CS', 'SCG', 'Serbia and Montenegro (formerly Yugoslavia)');
INSERT INTO country (id, iso2, iso3, name) values (100191, 'SC', 'SYC', 'Seychelles');
INSERT INTO country (id, iso2, iso3, name) values (100192, 'SL', 'SLE', 'Sierra Leone');
INSERT INTO country (id, iso2, iso3, name) values (100193, 'SG', 'SGP', 'Singapore');
INSERT INTO country (id, iso2, iso3, name) values (100194, 'SK', 'SVK', 'Slovakia (Slovak Republic)');
INSERT INTO country (id, iso2, iso3, name) values (100195, 'SI', 'SVN', 'Slovenia');
INSERT INTO country (id, iso2, iso3, name) values (100196, 'SB', 'SLB', 'Solomon Islands');
INSERT INTO country (id, iso2, iso3, name) values (100197, 'SO', 'SOM', 'Somalia');
INSERT INTO country (id, iso2, iso3, name) values (100198, 'ZA', 'ZAF', 'South Africa (zuid Afrika)');
INSERT INTO country (id, iso2, iso3, name) values (100199, 'GS', 'SGS', 'South Georgia and the South Sandwich Islands');
INSERT INTO country (id, iso2, iso3, name) values (100200, 'ES', 'ESP', 'Spain (españa)');
INSERT INTO country (id, iso2, iso3, name) values (100201, 'LK', 'LKA', 'Sri Lanka');
INSERT INTO country (id, iso2, iso3, name) values (100202, 'SD', 'SDN', 'Sudan');
INSERT INTO country (id, iso2, iso3, name) values (100203, 'SR', 'SUR', 'Suriname');
INSERT INTO country (id, iso2, iso3, name) values (100204, 'SJ', 'SJM', 'Svalbard and Jan Mayen');
INSERT INTO country (id, iso2, iso3, name) values (100205, 'SZ', 'SWZ', 'Swaziland');
INSERT INTO country (id, iso2, iso3, name) values (100206, 'SE', 'SWE', 'Sweden');
INSERT INTO country (id, iso2, iso3, name) values (100207, 'CH', 'CHE', 'Switzerland (Confederation of Helvetia)');
INSERT INTO country (id, iso2, iso3, name) values (100208, 'SY', 'SYR', 'Syrian Arab Republic');
INSERT INTO country (id, iso2, iso3, name) values (100209, 'TW', 'TWN', 'Taiwan ("Chinese Taipei" for IOC)');
INSERT INTO country (id, iso2, iso3, name) values (100210, 'TJ', 'TJK', 'Tajikistan');
INSERT INTO country (id, iso2, iso3, name) values (100211, 'TZ', 'TZA', 'Tanzania');
INSERT INTO country (id, iso2, iso3, name) values (100212, 'TH', 'THA', 'Thailand');
INSERT INTO country (id, iso2, iso3, name) values (100213, 'TL', 'TLS', 'Timor-Leste (formerly East Timor)');
INSERT INTO country (id, iso2, iso3, name) values (100214, 'TG', 'TGO', 'Togo');
INSERT INTO country (id, iso2, iso3, name) values (100215, 'TK', 'TKL', 'Tokelau');
INSERT INTO country (id, iso2, iso3, name) values (100216, 'TO', 'TON', 'Tonga');
INSERT INTO country (id, iso2, iso3, name) values (100217, 'TT', 'TTO', 'Trinidad and Tobago');
INSERT INTO country (id, iso2, iso3, name) values (100218, 'TN', 'TUN', 'Tunisia');
INSERT INTO country (id, iso2, iso3, name) values (100219, 'TR', 'TUR', 'Turkey');
INSERT INTO country (id, iso2, iso3, name) values (100220, 'TM', 'TKM', 'Turkmenistan');
INSERT INTO country (id, iso2, iso3, name) values (100221, 'TC', 'TCA', 'Turks and Caicos Islands');
INSERT INTO country (id, iso2, iso3, name) values (100222, 'TV', 'TUV', 'Tuvalu');
INSERT INTO country (id, iso2, iso3, name) values (100223, 'UG', 'UGA', 'Uganda');
INSERT INTO country (id, iso2, iso3, name) values (100224, 'UA', 'UKR', 'Ukraine');
INSERT INTO country (id, iso2, iso3, name) values (100225, 'AE', 'ARE', 'United Arab Emirates');
INSERT INTO country (id, iso2, iso3, name) values (100226, 'GB', 'GBR', 'United Kingdom (Great Britain)');
INSERT INTO country (id, iso2, iso3, name) values (100227, 'US', 'USA', 'United States');
INSERT INTO country (id, iso2, iso3, name) values (100228, 'UM', 'UMI', 'United States Minor Outlying Islands');
INSERT INTO country (id, iso2, iso3, name) values (100229, 'UY', 'URY', 'Uruguay');
INSERT INTO country (id, iso2, iso3, name) values (100230, 'UZ', 'UZB', 'Uzbekistan');
INSERT INTO country (id, iso2, iso3, name) values (100231, 'VU', 'VUT', 'Vanuatu');
INSERT INTO country (id, iso2, iso3, name) values (100232, 'VA', 'VAT', 'Vatican City (Holy See)');
INSERT INTO country (id, iso2, iso3, name) values (100233, 'VE', 'VEN', 'Venezuela');
INSERT INTO country (id, iso2, iso3, name) values (100234, 'VN', 'VNM', 'Viet Nam');
INSERT INTO country (id, iso2, iso3, name) values (100235, 'VG', 'VGB', 'Virgin Islands, British');
INSERT INTO country (id, iso2, iso3, name) values (100236, 'VI', 'VIR', 'Virgin Islands, U.S.');
INSERT INTO country (id, iso2, iso3, name) values (100237, 'WF', 'WLF', 'Wallis and Futuna');
INSERT INTO country (id, iso2, iso3, name) values (100238, 'EH', 'ESH', 'Western Sahara (formerly Spanish Sahara)');
INSERT INTO country (id, iso2, iso3, name) values (100239, 'YE', 'YEM', 'Yemen (Arab Republic)');
INSERT INTO country (id, iso2, iso3, name) values (100240, 'ZM', 'ZMB', 'Zambia');
INSERT INTO country (id, iso2, iso3, name) values (100241, 'ZW', 'ZWE', 'Zimbabwe');