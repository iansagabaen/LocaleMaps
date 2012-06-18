use '@DB_NAME@';
drop procedure if exists add_nav_item;

delimiter //
create procedure add_nav_item(locale_id int, parent_nav_item_id int)
begin
  declare level, ordinal, num_rows tinyint default 0;
  declare nav_item_name varchar(50);
  select level from nav_item where id = parent_nav_item_id into level;
  set level = level + 1;
  select count(*) from nav_item where parent_id = parent_nav_item_id into ordinal;
  select name from locale where localeid = locale_id into nav_item_name;
  insert into nav_item (name, level, ordinal, parent_id, locale_id) values (nav_item_name, level, ordinal, parent_nav_item_id, locale_id);
end //
delimiter ;

set @africa = 1003;
set @asia = 1004;
set @australia = 1002;
set @canada_east = 1006;
set @canada_west = 1007;
set @hawaii_pacific = 1008;
set @nesb = 1011;
set @nor_cal = 1009;
set @northern_europe = 1016;
set @northern_midwest = 1013;
set @philippines = 1005;
set @pnw = 1015;
set @sesb = 1012;
set @so_cal = 1010;
set @southern_europe = 1017;
set @southern_midwest = 1014;

call add_nav_item(1, @australia);
call add_nav_item(2, @nor_cal);
call add_nav_item(3, @nesb);
call add_nav_item(4, @pnw);
call add_nav_item(5, @southern_midwest);
call add_nav_item(6, @nor_cal);
call add_nav_item(7, @so_cal);
call add_nav_item(8, @pnw);
call add_nav_item(9, @nor_cal);
call add_nav_item(10, @sesb);
call add_nav_item(11, @southern_midwest);
call add_nav_item(12, @australia);
call add_nav_item(14, @nesb);
call add_nav_item(15, @australia);
call add_nav_item(16, @northern_europe);
call add_nav_item(17, @pnw);
call add_nav_item(18, @northern_europe);
call add_nav_item(19, @nesb);
call add_nav_item(20, @sesb);
call add_nav_item(21, @sesb);
call add_nav_item(22, @northern_midwest);
call add_nav_item(23, @nesb);
call add_nav_item(24, @northern_europe);
call add_nav_item(25, @pnw);
call add_nav_item(26, @australia);
call add_nav_item(27, @australia);
call add_nav_item(28, @nesb);
call add_nav_item(29, @pnw);
call add_nav_item(30, @canada_west);
call add_nav_item(31, @australia);
call add_nav_item(32, @canada_west);
call add_nav_item(33, @canada_west);
call add_nav_item(34, @northern_europe);
call add_nav_item(35, @northern_europe);
call add_nav_item(36, @australia);
call add_nav_item(37, @australia);
call add_nav_item(38, @australia);
call add_nav_item(39, @nesb);
call add_nav_item(40, @sesb);
call add_nav_item(41, @sesb);
call add_nav_item(42, @northern_europe);
call add_nav_item(43, @northern_midwest);
call add_nav_item(44, @northern_midwest);
call add_nav_item(45, @northern_europe);
call add_nav_item(46, @northern_midwest);
call add_nav_item(47, @nor_cal);
call add_nav_item(48, @southern_midwest);
call add_nav_item(49, @so_cal);
call add_nav_item(50, @southern_midwest);
call add_nav_item(51, @nesb);
call add_nav_item(52, @southern_midwest);
call add_nav_item(53, @nor_cal);
call add_nav_item(54, @australia);
call add_nav_item(55, @australia);
call add_nav_item(56, @so_cal);
call add_nav_item(57, @northern_midwest);
call add_nav_item(58, @northern_midwest);
call add_nav_item(59, @australia);
call add_nav_item(60, @so_cal);
call add_nav_item(61, @canada_west);
call add_nav_item(62, @northern_europe);
call add_nav_item(63, @australia);
call add_nav_item(64, @southern_midwest);
call add_nav_item(66, @northern_europe);
call add_nav_item(67, @canada_east);
call add_nav_item(68, @so_cal);
call add_nav_item(69, @southern_midwest);
call add_nav_item(70, @nesb);
call add_nav_item(71, @nor_cal);
call add_nav_item(72, @pnw);
call add_nav_item(73, @northern_europe);
call add_nav_item(74, @pnw);
call add_nav_item(75, @nor_cal);
call add_nav_item(76, @southern_midwest);
call add_nav_item(77, @sesb);
call add_nav_item(78, @nesb);
call add_nav_item(79, @southern_midwest);
call add_nav_item(80, @nor_cal);
call add_nav_item(83, @australia);
call add_nav_item(85, @australia);
call add_nav_item(88, @pnw);
call add_nav_item(89, @northern_midwest);
call add_nav_item(90, @australia);
call add_nav_item(91, @nor_cal);
call add_nav_item(92, @northern_europe);
call add_nav_item(93, @so_cal);
call add_nav_item(94, @northern_europe);
call add_nav_item(95, @australia);
call add_nav_item(96, @hawaii_pacific);
call add_nav_item(97, @hawaii_pacific);
call add_nav_item(98, @northern_midwest);
call add_nav_item(99, @northern_europe);
call add_nav_item(100, @southern_midwest);
call add_nav_item(101, @northern_midwest);
call add_nav_item(102, @so_cal);
call add_nav_item(103, @sesb);
call add_nav_item(104, @nesb);
call add_nav_item(105, @hawaii_pacific);
call add_nav_item(106, @hawaii_pacific);
call add_nav_item(107, @australia);
call add_nav_item(108, @northern_midwest);
call add_nav_item(109, @hawaii_pacific);
call add_nav_item(110, @australia);
call add_nav_item(111, @pnw);
call add_nav_item(112, @pnw);
call add_nav_item(113, @pnw);
call add_nav_item(115, @sesb);
call add_nav_item(116, @pnw);
call add_nav_item(117, @hawaii_pacific);
call add_nav_item(118, @so_cal);
call add_nav_item(119, @so_cal);
call add_nav_item(120, @australia);
call add_nav_item(121, @nor_cal);
call add_nav_item(122, @hawaii_pacific);
call add_nav_item(123, @southern_midwest);
call add_nav_item(124, @nor_cal);
call add_nav_item(125, @australia);
call add_nav_item(126, @so_cal);
call add_nav_item(127, @nesb);
call add_nav_item(128, @so_cal);
call add_nav_item(129, @nesb);
call add_nav_item(130, @so_cal);
call add_nav_item(131, @sesb);
call add_nav_item(132, @southern_midwest);
call add_nav_item(133, @australia);
call add_nav_item(134, @sesb);
call add_nav_item(135, @northern_midwest);
call add_nav_item(136, @hawaii_pacific);
call add_nav_item(137, @northern_europe);
call add_nav_item(138, @southern_midwest);
call add_nav_item(139, @australia);
call add_nav_item(140, @sesb);
call add_nav_item(141, @sesb);
call add_nav_item(142, @northern_midwest);
call add_nav_item(143, @canada_east);
call add_nav_item(144, @so_cal);
call add_nav_item(145, @nor_cal);
call add_nav_item(146, @canada_east);
call add_nav_item(147, @australia);
call add_nav_item(148, @pnw);
call add_nav_item(149, @nor_cal);
call add_nav_item(150, @hawaii_pacific);
call add_nav_item(151, @australia);
call add_nav_item(152, @so_cal);
call add_nav_item(153, @hawaii_pacific);
call add_nav_item(154, @northern_europe);
call add_nav_item(156, @nesb);
call add_nav_item(157, @sesb);
call add_nav_item(158, @northern_midwest);
call add_nav_item(159, @so_cal);
call add_nav_item(160, @so_cal);
call add_nav_item(161, @nesb);
call add_nav_item(162, @northern_europe);
call add_nav_item(163, @nor_cal);
call add_nav_item(164, @southern_midwest);
call add_nav_item(165, @northern_midwest);
call add_nav_item(166, @sesb);
call add_nav_item(167, @sesb);
call add_nav_item(168, @nor_cal);
call add_nav_item(169, @northern_europe);
call add_nav_item(170, @canada_east);
call add_nav_item(171, @northern_europe);
call add_nav_item(172, @so_cal);
call add_nav_item(173, @so_cal);
call add_nav_item(174, @northern_midwest);
call add_nav_item(175, @canada_west);
call add_nav_item(176, @so_cal);
call add_nav_item(177, @australia);
call add_nav_item(178, @sesb);
call add_nav_item(179, @australia);
call add_nav_item(180, @nesb);
call add_nav_item(181, @so_cal);
call add_nav_item(182, @pnw);
call add_nav_item(183, @australia);
call add_nav_item(184, @northern_midwest);
call add_nav_item(185, @pnw);
call add_nav_item(186, @northern_europe);
call add_nav_item(188, @nor_cal);
call add_nav_item(189, @canada_west);
call add_nav_item(190, @nor_cal);
call add_nav_item(191, @canada_west);
call add_nav_item(192, @nor_cal);
call add_nav_item(193, @so_cal);
call add_nav_item(194, @nesb);
call add_nav_item(195, @nesb);
call add_nav_item(196, @sesb);
call add_nav_item(197, @nor_cal);
call add_nav_item(198, @nor_cal);
call add_nav_item(200, @nor_cal);
call add_nav_item(201, @so_cal);
call add_nav_item(202, @southern_midwest);
call add_nav_item(203, @nor_cal);
call add_nav_item(204, @so_cal);
call add_nav_item(205, @nor_cal);
call add_nav_item(206, @nor_cal);
call add_nav_item(207, @nor_cal);
call add_nav_item(208, @so_cal);
call add_nav_item(209, @so_cal);
call add_nav_item(210, @nor_cal);
call add_nav_item(211, @canada_west);
call add_nav_item(212, @canada_east);
call add_nav_item(213, @pnw);
call add_nav_item(214, @pnw);
call add_nav_item(215, @pnw);
call add_nav_item(216, @nesb);
call add_nav_item(217, @sesb);
call add_nav_item(218, @nor_cal);
call add_nav_item(219, @so_cal);
call add_nav_item(220, @nor_cal);
call add_nav_item(221, @nesb);
call add_nav_item(222, @southern_midwest);
call add_nav_item(223, @pnw);
call add_nav_item(224, @northern_midwest);
call add_nav_item(225, @sesb);
call add_nav_item(226, @nesb);
call add_nav_item(227, @nor_cal);
call add_nav_item(228, @northern_europe);
call add_nav_item(229, @so_cal);
call add_nav_item(230, @northern_europe);
call add_nav_item(231, @canada_west);
call add_nav_item(232, @northern_europe);
call add_nav_item(234, @nesb);
call add_nav_item(235, @so_cal);
call add_nav_item(236, @nesb);
call add_nav_item(237, @canada_east);
call add_nav_item(238, @so_cal);
call add_nav_item(239, @australia);
call add_nav_item(240, @nor_cal);
call add_nav_item(241, @so_cal);
call add_nav_item(242, @southern_midwest);
call add_nav_item(243, @nor_cal);
call add_nav_item(244, @canada_west);
call add_nav_item(245, @canada_west);
call add_nav_item(246, @so_cal);
call add_nav_item(247, @northern_midwest);
call add_nav_item(248, @nesb);
call add_nav_item(249, @so_cal);
call add_nav_item(250, @hawaii_pacific);
call add_nav_item(251, @hawaii_pacific);
call add_nav_item(252, @hawaii_pacific);
call add_nav_item(253, @australia);
call add_nav_item(254, @nesb);
call add_nav_item(255, @nor_cal);
call add_nav_item(256, @sesb);
call add_nav_item(257, @australia);
call add_nav_item(258, @australia);
call add_nav_item(259, @nesb);
call add_nav_item(260, @canada_east);
call add_nav_item(261, @canada_east);
call add_nav_item(262, @sesb);
call add_nav_item(263, @australia);
call add_nav_item(264, @so_cal);
call add_nav_item(265, @nesb);
call add_nav_item(266, @australia);
call add_nav_item(273, @philippines);
call add_nav_item(274, @sesb);
call add_nav_item(275, @sesb);
call add_nav_item(276, @so_cal);
call add_nav_item(279, @asia);
call add_nav_item(280, @asia);
call add_nav_item(281, @asia);
call add_nav_item(282, @asia);
call add_nav_item(283, @hawaii_pacific);
call add_nav_item(284, @southern_midwest);
call add_nav_item(285, @northern_midwest);
call add_nav_item(287, @so_cal);
call add_nav_item(289, @southern_europe);
call add_nav_item(291, @southern_europe);
call add_nav_item(292, @asia);
call add_nav_item(293, @northern_europe);
call add_nav_item(294, @northern_europe);
call add_nav_item(295, @northern_europe);
call add_nav_item(298, @northern_europe);
call add_nav_item(299, @nor_cal);
call add_nav_item(302, @northern_midwest);
call add_nav_item(303, @canada_east);
call add_nav_item(304, @nesb);
call add_nav_item(305, @canada_west);
call add_nav_item(306, @canada_west);
call add_nav_item(308, @northern_midwest);
call add_nav_item(309, @northern_midwest);
call add_nav_item(310, @southern_europe);
call add_nav_item(312, @philippines);
call add_nav_item(313, @nor_cal);
call add_nav_item(314, @canada_west);
call add_nav_item(316, @canada_west);
call add_nav_item(319, @asia);
call add_nav_item(320, @asia);
call add_nav_item(321, @asia);
call add_nav_item(322, @asia);
call add_nav_item(323, @nor_cal);
call add_nav_item(324, @canada_east);
call add_nav_item(325, @nesb);
call add_nav_item(326, @nesb);
call add_nav_item(328, @hawaii_pacific);

drop procedure if exists add_nav_item;