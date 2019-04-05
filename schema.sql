DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
manufacturer VARCHAR(30) NULL,
department_name VARCHAR(100) NOT NULL,
price INT NOT NULL DEFAULT 0,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, manufacturer, department_name, price, stock_quantity)
VALUES 
("Pixel 4", "Google", "Mobile Devices", 749, 50), 
("Pixel 4 XL", "Google", "Mobile Devices", 949, 25),
("Galaxy S10", "Samsung", "Mobile Devices", 699, 40),
("Galaxy S10+", "Samsung", "Mobile Devices", 899, 20),
("iPad Mini", "Apple", "Tablets", 329, 10),
("iPad Pro", "Apple", "Tablets", 1099, 15),
("Pixelbook", "Google", "Laptops", 1299, 15),
("Macbook Pro", "Apple", "Laptops", 1599, 10),
("Hero 7", "GoPro", "Action Camera", 499, 20),
("Insta360 X", "Insta360", "360 Camera", 399, 20);

SELECT * FROM products 


