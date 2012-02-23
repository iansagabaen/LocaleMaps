use @DB_NAME@;

-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: 173.201.217.11
-- Generation Time: Feb 23, 2012 at 02:04 PM
-- Server version: 5.0.92
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


-- --------------------------------------------------------

--
-- Table structure for table `locale`
--

CREATE TABLE `locale` (
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
  `full_state` varchar(255) default NULL,
  `country_id` int(11) default NULL,
  PRIMARY KEY  (`localeid`),
  FULLTEXT KEY `address_search` (`name`,`country`,`full_state`,`city`,`address1`,`zip`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=329 ;

