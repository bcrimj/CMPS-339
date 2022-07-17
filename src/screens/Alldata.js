/** @format */

import React, { useEffect, useState } from "react";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import "../screens/Alldata.css";
export function Alldata() {
  const [data, setData] = useState([""]);
  const [odata, setOdata] = useState([""]);
  const [pdata, setPdata] = useState([""]);
  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
  });

  const setInput = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getData = async () => {
    const newData = await fetch("/api", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setData(newData);
  };

  const getOrders = async () => {
    const newData = await fetch("/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setOdata(newData);
  };

  const createCustomer = async () => {
    await fetch("/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...customer,
      }),
    }).then(getData());
  };

  const getProduct = async () => {
    const newData = await fetch("/product", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setPdata(newData);
  };
  useEffect(() => {
    getData();
    getOrders();
    getProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div>
        <p></p>
        <div className="Customer">
          <h1>All Customers</h1>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              name="FirstName"
              placeholder="First Name"
              onChange={setInput}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              name="LastName"
              placeholder="Last Name"
              onChange={setInput}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              name="Address"
              placeholder="Address"
              onChange={setInput}
            />
          </InputGroup>
        </div>
        <Button className="button" variant="success" onClick={() => getData()}>
          Refresh
        </Button>
        <Button variant="success" onClick={() => createCustomer()}>
          Create
        </Button>
        <p></p>
      </div>
      <Table striped bordered hover size="small" className="Table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th> Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map &&
            data.map((item, idx) => {
              return (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Address}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <h1>All Products</h1>
      <Table striped bordered hover size="small" className="Table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {pdata.map &&
            pdata.map((item, idx) => {
              return (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Size}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <p></p>
      <div className="Customer">
        <p></p>
        <h1>All Orders</h1>
        <p></p>
      </div>
      <Table striped bordered hover size="small" className="Table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Id #</th>
            <th>Product Id #</th>
            <th>Total Amount</th>
            <th>Shipping Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {odata.map &&
            odata.map((item) => {
              return (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.CustomerId}</td>
                  <td>{item.ProductId}</td>
                  <td>{item.Amount}</td>
                  <td>{item.ShippingAddress}</td>
                  <td>{item.Price}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Alldata;
