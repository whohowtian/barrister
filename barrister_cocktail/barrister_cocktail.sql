CREATE DATABASE IF NOT EXISTS `barrister_cocktail` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `barrister_cocktail`;

DROP TABLE IF EXISTS `cocktail`;
CREATE TABLE IF NOT EXISTS `cocktail` (
  `cocktail_id` int NOT NULL,
  `cocktail_name` varchar(512),
  `first_spirit` int,
  `second_spirit` int,
  `sweet_base` int,
  `sour_base` int,
  `user_id` int,
  `cocktail_price` float,
  PRIMARY KEY (`cocktail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `add_ons`;
CREATE TABLE IF NOT EXISTS `add_ons` (
  `addOn_id` int NOT NULL,
  `cocktail_id` int NOT NULL,
  PRIMARY KEY (`addOn_id`, `cocktail_id`),
  -- FOREIGN KEY (`addOn_id`) REFERENCES `cocktail`(`cocktail_id`),
  FOREIGN KEY (`cocktail_id`) REFERENCES `cocktail`(`cocktail_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `cocktail` (`cocktail_id`, `cocktail_name`, `first_spirit`, `second_spirit`, `sweet_base`, `sour_base`, `user_id`, `cocktail_price`) VALUES
(1, "Devil's Toe" , 1, 2, 27, 31, 1, 23.50);

INSERT INTO `add_ons` (`addOn_id`, `cocktail_id`) VALUES
(36, 1),
(37, 1);