/** @format */

const config = require("./dbconfig.js");
const sql = require("mssql");

const getCustomer = async () => {
  try {
    let pool = await sql.connect(config);
    let customers = pool.request().query("SELECT * from Customers");
    console.log(customers);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

const loginCustomer = async (FirstName, LastName) => {
  try {
    let pool = await sql.connect(config);
    let customer = await pool
      .request()
      .query(
        `SELECT Id FROM Customers WHERE FirstName LIKE '${FirstName}' AND LastName LIKE '${LastName}'`
      );
    return customer;
  } catch (error) {
    console.log(error);
  }
};

const getMyOrders = async (CustomerId) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .query(`SELECT * FROM Orders WHERE CustomerId = ${CustomerId}`);
    return orders;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async () => {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query("SELECT * from Products");
    return products;
  } catch (error) {
    return error;
  }
};

const getOrder = async () => {
  try {
    let pool = await sql.connect(config);
    let orders = pool.request().query("SELECT * from Orders");
    return orders;
  } catch (error) {
    return error;
  }
};
const createCustomer = async (Customer) => {
  try {
    let pool = await sql.connect(config);
    let customers = pool.request()
      .query(`INSERT INTO Customers (FirstName, LastName, Address) VALUES
        ('${Customer.FirstName}', '${Customer.LastName}', '${Customer.Address}')`);
    console.log(customers);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (Product) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(
        `INSERT INTO Products VALUES ('${Product.Name}', '${Product.Size}')`
      );
    return products;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (ProdId) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(`DELETE FROM Products WHERE Id = ${ProdId}`);
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteOrder = async (Id) => {
  console.log("sql id", Id);
  try {
    let pool = await sql.connect(config);
    let orders = pool.request().query(`DELETE FROM Orders WHERE Id = ${Id}`);
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrder = async (Order) => {
  try {
    console.log(Order);
    let pool = await sql.connect(config);
    let orders = pool
      .request()
      .query(
        `INSERT INTO Orders VALUES ('${Order.ProductId}', '${Order.CustomerId}', '${Order.Amount}', '${Order.ShippingAddress}', '${Order.Price}' )`
      );
    return orders;
    } 
  catch (error) {
    return error;
  }
};

const updateOrder = async (Order) => {
  try {
    let pool = await sql.connect(config);
    let orders = pool
      .request()
      .query(
        `UPDATE Orders SET ProductId = '${Order.ProductId}', Amount = '${Order.Amount}', ShippingAddress = '${Order.ShippingAddress}' WHERE Id = '${Order.Id}';`
      );
    return orders;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getCustomer,
  createCustomer,
  getProduct,
  createProduct,
  createOrder,
  getOrder,
  deleteProduct,
  loginCustomer,
  getMyOrders,
  deleteOrder,
  updateOrder,
};
