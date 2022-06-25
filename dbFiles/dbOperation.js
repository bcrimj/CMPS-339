const config = require('./dbconfig.js');
const sql = require('mssql');

const getCustomer = async() => {
    try {
        let pool = await sql.connect(config);
        let customers = pool.request().query("SELECT * from Customers")
        console.log(customers);
        return customers;
    }
    catch(error) {
        console.log(error);
    }
}

const getProduct = async() => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query("SELECT * from Products")
        return products;
    }
    catch(error)
    {
        return(error);
    }
}

const getOrder = async() => {
    try {
        let pool = await sql.connect(config);
        let orders = pool.request().query("SELECT * from Orders")
        return orders;
    }
    catch(error)
    {
        return(error);
    }
}
const createCustomer = async(Customer) => {
    try {
        let pool = await sql.connect(config);
        let customers = pool.request()
        .query(`INSERT INTO Customers (FirstName, LastName, Address) VALUES
        ('${Customer.FirstName}', '${Customer.LastName}', '${Customer.Address}')`)
        console.log(customers);
        return customers;
    }
    catch(error) {
        console.log(error);
    }
}

const createProduct = async(Product) => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request()
        .query(`INSERT INTO Products VALUES ('${Product.Name}', '${Product.Size}')`)
        return products;
    }
    catch(error) {
        return error;
    }
}

const deleteProduct = async(ProdId) => {
    try {
    let pool = await sql.connect(config);
    let products = pool.request()
    .query(`DELETE FROM Products WHERE Id = ${ProdId}`)
    return products;
    }
    catch(error) {
        console.log(error)
        return error;
    }
}

const createOrder = async(Order) => {
    try {
        let pool = await sql.connect(config);
        let orders = pool.request()
        .query(`INSERT INTO Orders VALUES ('${Order.ProductId}', '${Order.CustomerId}', '${Order.Amount}')`)
        return orders;
    }
    catch(error) {
        return error;
    }
}

module.exports = {
    getCustomer,
    createCustomer,
    getProduct,
    createProduct,
    createOrder,
    getOrder,
    deleteProduct
}