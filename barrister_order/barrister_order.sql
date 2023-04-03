CREATE DATABASE IF NOT EXISTS `barrister_order` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `barrister_order`;

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `order_status` int NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`order_status`) REFERENCES `order_status`(`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `order` (`order_id`, `user_id`, `order_status`) VALUES
(99, 1, 3),
(100, 2, 1)
