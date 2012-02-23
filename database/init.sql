CREATE DATABASE  `@DB_NAME@` ;
USE `@DB_NAME@`;

/*
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
CREATE TABLE IF NOT EXISTS `localemaps` (
  `localeid` int not null auto_increment,
  `name` varchar(255) not null,
  `address1` varchar(255) not null,
  `address2` varchar(255) default null,
  `city` varchar(255) not null,
  `state` varchar(255) not null,
  `full_state` varchar(255) default null,
  `zip` varchar(255) not null,
  `country` varchar(255) not null,
  `country_id` int null,
  `latitude` varchar(255) not null,
  `longitude` varchar(255) not null,
  `emailcontact` varchar(255) default null,
  `times` varchar(1000) default null,
  `contact` varchar(255) default null,
  `timestamp` timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`localeid`),
  FULLTEXT INDEX address_search (name, country, full_state, city, address1, zip)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
*/