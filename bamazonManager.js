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
                    // initManager();
                    connection.end();
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
                [res[i].item_id,res[i].product_name,res[i].department_name,res[i].stock_quantity,res[i].price]
            )
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].stock_quantity + " | " + res[i].price);
        }
        // console.log("-----------------------------------");
        console.log(table.toString());
    });

    console.log("entro por ver productos")

}

function viewLowInventory() {

    console.table(values);
    console.log("entro por ver inventario bajo")
}

function addInventory() {
    console.log("Entro por Agregar Inventario")
}

function addNewProduct() {
    console.log("Entro por Agregar nuevo PRODUCTO")
}