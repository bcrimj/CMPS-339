/** @format */

const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperation.js");
const Customer = require("./dbFiles/customer.js");
const API_PORT = process.env.PORT || 5000;
const app = express();
const querystring = require("querystring");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/api", async (req, res) => {
  console.log("Called");
  const result = await dbOperation.getCustomer();
  res.send(result.recordset);
});

app.post("/create", async (req, res) => {
  await dbOperation.createCustomer(req.body);
  const result = await dbOperation.getCustomer();
  console.log("Called create");
  res.send(result.recordset);
});

app.post("/customer/login", async (req, res) => {
  const result = await dbOperation.loginCustomer(
    req.body.FirstName,
    req.body.LastName
  );
  res.send(result.recordset);
});

app.post("/pcreate", async (req, res) => {
  await dbOperation.createProduct(req.body);
  const result = await dbOperation.getProduct();
  res.send(result.recordset);
});

app.get("/product", async (req, res) => {
  const result = await dbOperation.getProduct();
  res.send(result.recordset);
});

app.post("/product/delete", async (req, res) => {
  const result = await dbOperation.deleteProduct(req.body.Id);
  res.send(result);
});

app.post("/orders/delete", async (req, res) => {
  const result = await dbOperation.deleteOrder(req.body.Id);
  res.send(result);
});

app.get("/order", async (req, res) => {
  const result = await dbOperation.getOrder();
  res.send(result.recordset);
});

app.get("/my-orders", async (req, res) => {
  let CustomerId = req.query.CustomerId;
  const result = await dbOperation.getMyOrders(CustomerId);
  res.send(result.recordset);
});

app.post("/ocreate", async (req, res) => {
  const result = await dbOperation.createOrder(req.body);
  res.send(result.recordset);
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
