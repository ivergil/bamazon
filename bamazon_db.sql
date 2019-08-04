DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50) NOT NULL
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone X", "Electronics", 925.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy 10", "Electronics", 720.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1825.50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dinner Table", "Home", 250.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microwave", "Home", 125.00, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebook", "Office", 4.75, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk Chair", "Office", 44.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stroller", "Baby", 144.75, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Seat", "Baby", 64.98, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pajama", "Baby", 2.75, 30);