var mysql = require("mysql");
var inquirer = require("inquirer");

//Configuration of specs used to connect to mysql DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "P0SlavDu2",
    database: "bamazon_db"
});

//Connects program to local bamazon_db and calls itemList function
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    itemList()
})


/*Prompts user whether they'd like to view our items.
Runs showProduct function on confirm Y and itemList else*/
function itemList() {
    // console.log("Please see our list of ")
    inquirer.prompt({
        name: "productListConfirm",
        type: "confirm",
        message: "Would you like to view our list of high-end technology devices?",
        default: true
    })
        .then(function (answer) {
            if (answer.productListConfirm === true) {
                showProducts();
            } else {
                console.log("Thanks for visiting.")
                itemList();
            }
        })
}
//This function dipslays items for sale and includes item_id, product_name and prices 
function showProducts() {
    var query = "SELECT item_id, product_name, price FROM products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        // console.log("Please enter the Item ID of the product you'd like to purchase.");
        orderProduct();
    })
}

/* this function asks user to enter the Item Id of item they'd like to purchase*/
function orderProduct() {
    inquirer.prompt([
        { //ask user for ID of item
            name: "choice",
            type: "input",
            message: "Please enter the Item ID of the product you'd like to purchase."
        },
        { // ask user quantity of item
            name: "quantity",
            type: "input",
            message: "Please enter the quantity you'd like to purchase.",
        } //query sql based on answer
    ]).then(function (answer) {
        var query = "SELECT * FROM products WHERE ?"
        connection.query(query, {
            item_id: answer.choice,
            // stock_quantity: answer.quantity,
        }, function (err, res) {
            if (err) throw err;
            console.log()
            // inventoryCheck();
        })
    })
}

//create var to hold quantity response?
// function inventoryCheck() needs to check quantity entered above and insure we have enough items instock
//if quantityOrdered > stock_quantity, return/console.log "I'm sorry but we only have X devices available"
//if store does have enough items, update SQL db to reflect remaining quantity
//display the total cost of their purchase


// }
