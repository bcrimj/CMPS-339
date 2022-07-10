/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, FormControl, InputGroup, Form } from "react-bootstrap";
import "./Cart.css";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart(props) {
  const { show, onClose } = props;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const [shippingAddressOptions, setShippingAddressOptions] = useState([""]);
  const [usePastShippingAddress, setUsePastShippingAddress] = useState(false);

  const getShippingAddresses = useCallback(async () => {
    const customerId = JSON.parse(localStorage.getItem("id"));
    const data = await fetch(
      `/orders/shipping-address/options?CustomerId=${customerId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());
    setShippingAddressOptions(data);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
    getTotal(items);
    getShippingAddresses();
  }, [show, getShippingAddresses]);

  useEffect(() => {
    const submitOrder = async () => {
      if (!order.length && order.length < 1) {
        return;
      } else {
        for (let i = 0; i < order.length; i++) {
          await fetch("/ocreate", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ...order[i],
            }),
          });
        }
      }
      toast.success("Order placed!");
      setOrder([]);
      setCart([]);
      setTotal(0);
      setTax(0);
      setUsePastShippingAddress(false);
      clearCart();
      navigate("orders");
    };
    submitOrder();
  }, [order, navigate]);

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const removeItem = async (id) => {
    const arr = cart.filter((item) => item.Id !== id);
    setCart(arr);
    let newArr = JSON.parse(localStorage.getItem("cart"));
    const index = newArr.findIndex((x) => x.Id === id);
    newArr.splice(index, 1);
    await localStorage.setItem("cart", JSON.stringify(newArr));
    getTotal(newArr);
    console.log(cart);
    toast.success("Removed");
  };

  const updateQty = async (e, data) => {
    let newcart = cart.map((item) => {
      if (item.Id === data.Id) {
        item.Amount = parseInt(e);
      }
      return item;
    });
    setCart(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
    getTotal(newcart);
  };

  const getTotal = (data) => {
    let total = 0;
    let taxes = 0;
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const productPrice = data[index].Price * data[index].Amount;
        total = total + productPrice;
        taxes = taxes + total * 0.1;
      }
    }
    setTax(taxes);
    setTotal(total + taxes);
  };

  const doMath = (item) => {
    let amt = parseFloat(item.Amount);
    let prc = parseFloat(item.Price);
    let total = amt * prc;
    return total;
  };

  const createOrder = async () => {
    const customerId = JSON.parse(localStorage.getItem("id"));
    if (customerId === null) {
      toast.error("You need to log in first!");
      return;
    }
    let orderArray = [];
    for (let i = 0; i < cart.length; i++) {
      orderArray.push({
        ProductId: parseInt(cart[i].Id),
        CustomerId: customerId,
        Amount: cart[i].Amount,
        ShippingAddress: shippingAddress,
        Price:
          cart[i].Amount * cart[i].Price + cart[i].Amount * cart[i].Price * 0.1,
      });
    }
    setOrder(orderArray);
  };

  const [shippingAddress, setShippingAddress] = useState("");

  const setInputShippingAddress = (e) => {
    const { value } = e.target;
    setShippingAddress(value);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Title className="cart-header"> Cart </Modal.Title>
      <Modal.Body>
        {cart.map((item) => (
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "row",
            }}
            key={item}
          >
            <div style={{ marginRight: "5px" }}>
              <span style={{ fontWeight: "bold" }}>{item.Size} </span>
              <span>{item.Name}</span>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <input
                type="number"
                min="1"
                placeholder={item.Amount}
                style={{ width: "50px", marginRight: "30px" }}
                onChange={(event) => updateQty(event.target.value, item)}
              ></input>
              <span style={{}}>{doMath(item).toFixed(2)}</span>
              <IoTrashOutline
                style={{ marginLeft: "auto", color: "red" }}
                onClick={() => removeItem(item.Id)}
              />
            </div>
          </div>
        ))}
        <div
          style={{
            spanAlign: "right",
            borderTopColor: "black",
            borderTop: "2px solid black",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{}}>Tax: {tax.toFixed(2)}</span>
            <span style={{}}>Total: {total.toFixed(2)}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            Toggle Shipping Address
            <Form.Switch
              onChange={() =>
                setUsePastShippingAddress(!usePastShippingAddress)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <InputGroup
              style={{
                marginTop: "10px",
              }}
            >
              <FormControl
                disabled={usePastShippingAddress === false}
                type="input"
                name="shippingAddress"
                placeholder="Shipping Address"
                onChange={setInputShippingAddress}
              />
            </InputGroup>
            <Form.Select
              onChange={setInputShippingAddress}
              disabled={usePastShippingAddress === true}
              style={{
                marginTop: "10px",
              }}
            >
              <option>Select Past Shipping Address</option>
              {shippingAddressOptions &&
                shippingAddressOptions.map((x) => {
                  return (
                    <option value={x.shippingAddress}>
                      {x.ShippingAddress}
                    </option>
                  );
                })}
            </Form.Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={createOrder}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;
