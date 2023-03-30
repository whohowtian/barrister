CREATE DATABASE IF NOT EXISTS `order_status` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `order_status`;

DROP TABLE IF EXISTS `order_status`;
CREATE TABLE IF NOT EXISTS `order_status` (
  `status_id` int NOT NULL,
  `status_name` varchar(50)
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `order_status` (`status_id`, `status_name`) VALUES
(0, 'CART'),
(1, 'IN PROGRESS'),
(2, 'OUT FOR DELIVERY'),
(3, 'COMPLETE')