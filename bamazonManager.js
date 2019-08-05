var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the initBamazon function after the connection is made
    initManager();
});

function initManager() {
    inquirer
        .prompt({
            name: "managerTask",
            type: "list",
            message: "Select an Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        })
        .then(function (choosen) {

            switch (choosen.managerTask) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
                default: connection.end();
            }
        });
}

function viewProducts() {
    var table = new Table({
        head: ["ID", "Product Name", "Departament", "Stock", "Price $",]
        , colWidths: [5, 20, 20, 10, 10]
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity, res[i].price]
            )
        }
        console.log(table.toString());
        initManager();
    });

}

function viewLowInventory() {
    var table = new Table({
        head: ["ID", "Product Name", "Departament", "Stock", "Price $",]
        , colWidths: [5, 20, 20, 10, 10]
    });
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity, res[i].price]
            )
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].stock_quantity + " | " + res[i].price);
        }
        // console.log("-----------------------------------");
        console.log(table.toString());
        initManager();
    });
}

function addInventory() {
    var table = new Table({
        head: ["ID", "Product Name", "Departament", "Stock", "Price $",]
        , colWidths: [5, 20, 20, 10, 10]
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity, res[i].price]
            )
        }
        console.log(table.toString());

        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "What item would you like to add stock (ID)?: "
                },
                {
                    name: "qty",
                    type: "input",
                    message: "Please insert the stock to add: "
                },
            ])
            .then(function (ans) {
                connection.query("SELECT * FROM products", function (err, resDB) {
                    var i = ans.item - 1;
                    var newQ = parseInt(ans.qty) + parseInt(resDB[i].stock_quantity);
                    console.log(newQ);
                    connection.query("UPDATE products SET ? WHERE ?",
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
                            console.log("Add new Stock successfully!");
                            console.log("The new Inventory for " + resDB[i].product_name + " has been updated from " + resDB[i].stock_quantity + " to " + newQ );
                        }
                    );
                })
            })        
    });
    
};

function addNewProduct() {
    console.log("Entro por Agregar nuevo PRODUCTO");
};