use @DB_NAME@;

-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: 173.201.217.11
-- Generation Time: Feb 23, 2012 at 02:05 PM
-- Server version: 5.0.92
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL auto_increment,
  `locale_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `recurring` tinyint(4) NOT NULL default '0',
  `day_of_week` tinyint(4) NOT NULL,
  `schedule` datetime NOT NULL,
  `metadata` text,
  `description` varchar(1000) default NULL,
  PRIMARY KEY  (`id`),
  KEY `locale_id` (`locale_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5698 ;

