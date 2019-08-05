# BamazonApp

## bamazonCustomer.js: 

In this file the user could see the total availables products to buy.

I used 3 different NPM packages, 

  * cli-table
  * inquirer
  * mysql
  
On this first app the user could buy any of the availables products, the app check for inventory and avoid to do a purchase with more than the current inventory, also update the products table after any purchase.

## bamazonManager.js:

  In this app you could choose the following options:

*__View Products for Sale:__*

  With this option you could view the entire Table of the availables products. And show them in a special table layout on the console.
  
*__View Low Inventory:__*

  This options list all items with an inventory count lower than five.

*__Add to Inventory:__*

  The app display a prompt that will let the you "add more stock" of any item currently in the store. Then update the inventory on the database.

*__Add New Product:__*

   Allow the user to add a completely new product to the store. (Add a new "row" to the products table).
   
   
[GitHub](http://github.com)
