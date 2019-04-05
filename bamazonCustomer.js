var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
        console.table(res);
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
            message: "Please enter the quantity you'd like to purchase."
        } //query sql based on answer
    ]).then(function (answer) {
        var query = "SELECT * FROM products WHERE ?"
        connection.query(query, {
            item_id: answer.choice,
            // stock_quantity: answer.quantity,
        }, function (err, res) {
            if (err) throw err;
            // console.log(res[0].stock_quantity)
            if (answer.quantity > res[0].stock_quantity) {
                console.log("I'm sorry but we only have " + res[0].stock_quantity + " devices available.")
            } else {
                // console.log(res[0].stock_quantity)
                console.log("Thank you for ordering " + answer.quantity + " " + res[0].product_name + "s.");
                //display the total cost of their purchase
                console.log("Your total is $ " + answer.quantity * res[0].price + ".")
                var query = "UPDATE products SET ? WHERE ?"
                connection.query(query, [{
                    stock_quantity: res[0].stock_quantity - answer.quantity
                }, { item_id: answer.choice }], 
            function (err, res) {
            if (err) throw err;
            connection.end();
              }  
            )}
        });      
    })
}










