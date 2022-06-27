/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import "../screens/Alldata.css";

export function MyOrders() {
  const [odata, setOdata] = useState([""]);

  const [order, setOrder] = useState({
    ProductId: 0,
    CustomerId: 0,
    Amount: 0,
    ShippingAddress: "",
  });

  const setOinput = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  const getMyOrders = useCallback(async () => {
    const id = JSON.parse(localStorage.getItem("id"));
    const newData = await fetch(`/my-orders?CustomerId=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setOdata(newData);
  }, []);

  const createOrder = async () => {
    const id = JSON.parse(localStorage.getItem("id"));
    await fetch("/ocreate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        CustomerId: `${id}`,
        ProductId: `${order.ProductId}`,
        Amount: `${order.Amount}`,
        ShippingAddress: `${order.ShippingAddress}`,
      }),
    }).then(getMyOrders());
  };

  const deleteOrder = async (id) => {
    await fetch("/orders/delete", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Id: `${id}` }),
    }).then(getMyOrders());
  };

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  return (
    <div className="App">
      {odata ? (
        <>
          <div className="Customer">
            <p></p>
            <h1>New Order</h1>
            <InputGroup className="mb-3">
              <FormControl
                type="number"
                name="ProductId"
                placeholder="Product Id"
                onChange={setOinput}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                type="number"
                name="Amount"
                placeholder="Total Amount"
                onChange={setOinput}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                type="input"
                name="ShippingAddress"
                placeholder="Shipping Address"
                onChange={setOinput}
              />
            </InputGroup>
            <Button variant="success" onClick={() => createOrder()}>
              {" "}
              Create{" "}
            </Button>
            <p></p>
          </div>
          <h1>My Orders</h1>
          <Table striped bordered hover size="small" className="Table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Id #</th>
                <th>Product Id #</th>
                <th>Total Amount</th>
                <th>Shipping Address</th>
                <th>Delete Order?</th>
              </tr>
            </thead>
            <tbody>
              {odata.map &&
                odata.map((item, idx) => {
                  return (
                    <tr key={item.Id}>
                      <td>{item.Id}</td>
                      <td>{item.CustomerId}</td>
                      <td>{item.ProductId}</td>
                      <td>{item.Amount}</td>
                      <td>{item.ShippingAddress}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => deleteOrder(item.Id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      ) : (
        <span>You need to login first</span>
      )}
    </div>
  );
}

export default MyOrders;
