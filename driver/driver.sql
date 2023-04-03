CREATE DATABASE driver;
USE driver;

CREATE TABLE driver (
    driver_id		INT				NOT NULL AUTO_INCREMENT,
    driver_name		VARCHAR (64)	NOT NULL,
    phone_num 		VARCHAR (20)	NOT NULL,
    PRIMARY KEY (driver_id)
);

INSERT INTO   driver (driver_id, driver_name, phone_num)
       VALUES
                    (1, 'Tom', '91111111'),
                    (2, 'Jerry', '82222222');
