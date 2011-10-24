CREATE DATABASE  `@DB_NAME@` ;
USE `@DB_NAME@`;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
CREATE TABLE IF NOT EXISTS `localemaps` (
  `localeid` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) default NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `emailcontact` varchar(255) default NULL,
  `times` varchar(1000) default NULL,
  `contact` varchar(255) default NULL,
  `timestamp` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`localeid`),
  FULLTEXT INDEX address_search (name, address1, city, zip)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
