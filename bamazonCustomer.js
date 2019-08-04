var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the initBamazon function after the connection is made
    initBamazon();
});

function initBamazon() {
    // console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
        buyProducts();
    });
};

function buyProducts() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to Buy?:  "
            },
            {
                name: "qty",
                type: "input",
                message: "How many items you would like to Buy?:  "
            },
        ])
        .then(function (ans) {
            // based on their answer, either call the bid or the post functions
            connection.query("SELECT * FROM products", function (err, resDB) {
                if (err) throw err;
                var i = ans.item - 1;
                // console.log(res[i].product_name);
                if (ans.qty <= resDB[i].stock_quantity) {
                    var newQ = (resDB[i].stock_quantity - ans.qty);

                    // console.log(newQ);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQ
                            },
                            {
                                item_id: ans.item
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Order placed successfully!");
                            var total = (ans.qty * resDB[i].price);
                            console.log("And your Total is: $" + total);
                            connection.end();
                            // console.log("There are only " + newQ + " " + resDB[i].product_name + " availables")
                        }
                    );
                    // console.log("Compra realizada !!!");
                } else {
                    console.log("Insufficient quantity!");
                    console.log("Your order has been cancelled!!!")
                    connection.end();
                }

            });
        });
}