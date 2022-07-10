/** @format */

import React, { useState, useEffect } from "react";
import "../screens/Alldata.css";
import { Button, Card } from "react-bootstrap";
import Coffee from "../images/coffee.jpg";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";

function Products() {
  const [pdata, setPdata] = useState([""]);
  const [product, setProduct] = useState({ Name: "", Size: "" });
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1);

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
                  padding: "10px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                border="success"
              >
                <Card.Img
                  variant="top"
                  src={Coffee}
                  style={{ height: "30vh" }}
                />
                <Card.Body>
                  <Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          {item.Size}
                        </span>
                        <span style={{ fontWeight: "bold" }}>{item.Name}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          marginTop: "10px",
                        }}
                      >
                        <input
                          style={{ width: "50px" }}
                          type="number"
                          placeholder={1}
                          onChange={setQuantity}
                        ></input>
                        <Button
                          variant="success"
                          style={{ height: "40px" }}
                          onClick={() => handleCart(item)}
                        >
                          <IoCartOutline />
                        </Button>
                      </div>
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
