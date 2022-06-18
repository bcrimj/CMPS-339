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

module.exports = {
    getCustomer,
    createCustomer
}