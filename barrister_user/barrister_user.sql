CREATE DATABASE IF NOT EXISTS `barrister_user` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `barrister_user`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `phone_number` int,
  `email` varchar(50),
  `address` varchar(255),
  `role` varchar(50),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `phone_number`, `email`, `address`, `role`) VALUES
(1, 'Team', 'Barley', 81110000, 'team_barley@smu.sg', '416 Cherry Street, Langley Falls, VA, 23665', 'user'),
(2, 'Driver', 'Chris', 91230000, 'driver@driver.sg', '31 Spooner Street', 'driver');