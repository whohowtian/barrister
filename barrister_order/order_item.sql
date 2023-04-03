CREATE DATABASE IF NOT EXISTS `order_item` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `order_item`;

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `item_name` varchar(50),
  `quantity` int NOT NULL
  PRIMARY KEY (``)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `order` (`order_id`, `user_id`, `order_status`) VALUES
(0, 'CART'),
(1, 'IN PROGRESS'),
(2, 'OUT FOR DELIVERY'),
(3, 'COMPLETE')