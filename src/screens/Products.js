/** @format */

import React, { useState, useEffect } from "react";
import "../screens/Alldata.css";
import { Table, Button, Card } from "react-bootstrap";
import Coffee from "../images/coffee.jpg";
import toast from "react-hot-toast";

function Products() {
  const [pdata, setPdata] = useState([""]);
  const [product, setProduct] = useState({ Name: "", Size: "" });
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState();

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const setPinput = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const deleteProduct = async (x) => {
    await fetch("/product/delete", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Id: `${x}` }),
    }).then(getProduct());
  };

  const handleCart = async (data) => {
    const customerId = JSON.parse(localStorage.getItem("id"));
    if (customerId === null) {
      toast.error("You need to log in first!");
      return;
    }
    data.Amount = amount;
    let items = await localStorage.getItem("cart");
    items = JSON.parse(items);
    if (items) {
      let array = items;
      array.push(data);
      try {
        await localStorage.setItem("cart", JSON.stringify(array));
      } catch (error) {
        toast.error("Something went wrong");
        toast.error(`${error}`);
        return;
      }
    } else {
      let array = [];
      array.push(data);
      try {
        await localStorage.setItem("cart", JSON.stringify(array));
      } catch (error) {
        toast.error("Something went wrong");
        toast.error(`${error}`);
        return;
      }
    }
    toast.success(`Added ${data.Name}`);
  };

  const setQuantity = (e) => {
    let qty = parseInt(e.target.value);
    setAmount(qty);
  };

  return (
    <div className="products-display">
      {pdata.map &&
        pdata.map((item, idx) => {
          return (
            <>
              <Card
                style={{
                  marginTop: "20px",
                  marginRight: "20px",
                  width: "40vh",
                }}
              >
                <Card.Img
                  variant="top"
                  src={Coffee}
                  style={{ height: "30vh" }}
                />
                <Card.Body>
                  <Card.Title>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <text
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        {item.Size}
                      </text>
                      <text style={{ fontWeight: "bold" }}>{item.Name}</text>
                      <input
                        style={{ width: "50px", marginLeft: "auto" }}
                        type="number"
                        placeholder="0"
                        onChange={setQuantity}
                      ></input>
                      <Button
                        variant="success"
                        style={{ height: "40px", marginLeft: "auto" }}
                        onClick={() => handleCart(item)}
                      >
                        Add
                      </Button>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </>
          );
        })}
    </div>
  );
}

export default Products;
