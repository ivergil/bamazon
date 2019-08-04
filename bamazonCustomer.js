var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    initBamazon();
  });

function initBamazon(){
    console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT * FROM bamazon_db", function(err, res) {
        if (err) throw err;
  
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price );
        }
        // console.log("-----------------------------------");
      });
}