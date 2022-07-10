/** @format */

import React, { useState, useEffect } from "react";
import { Modal, Button, FormControl, InputGroup } from "react-bootstrap";
import "./Cart.css";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function Cart(props) {
  const { show, onClose } = props;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
    getTotal(items);
  }, [show]);

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
    };
    submitOrder();
  }, [order]);

  const removeItem = async (id) => {
    const arr = cart.filter((item) => item.Id !== id);
    setCart(arr);
    let newArr = JSON.parse(localStorage.getItem("cart"));
    const index = newArr.findIndex((x) => x.Id === id);
    newArr.splice(index, 1);
    await localStorage.setItem("cart", JSON.stringify(newArr));
    getTotal(newArr);
    console.log(cart);
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
    setTotal(total + tax);
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
        Price: cart[i].Amount * cart[i].Price,
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
          >
            <div style={{ marginRight: "5px" }}>
              <span style={{ fontWeight: "bold" }}>{item.Size} </span>
              <span>{item.Name}</span>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <input
                type="number"
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
        <div>
          <InputGroup>
            <FormControl
              type="input"
              name="shippingAddress"
              placeholder="Shipping Address"
              onChange={setInputShippingAddress}
            />
          </InputGroup>
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
