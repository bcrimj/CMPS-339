/** @format */

import React, { useState, useEffect, useCallback } from "react";
import "../screens/Alldata.css";
import { Button, Card } from "react-bootstrap";
import Coffee from "../images/coffee.jpg";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";

function Products() {
  const [pdata, setPdata] = useState([""]);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1);
  const [test, setTest] = useState([]);
  const [price, setPrice] = useState();

  const getProduct = useCallback(async () => {
    const newData = await fetch("/product", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setPdata(newData);
  }, []);

  useEffect(() => {
    if (pdata) {
      let array=[];
      for (let i=0; i<pdata.length; i++) {
        if (array.filter(e => e.Name === pdata[i].Name).length > 0){
          continue;
        }
        else {
          array.push({ Name: pdata[i].Name, Size: pdata[i].Size, Price: pdata[i].Price})
        }
      }
      console.log(array);
      setTest(array);
}},[pdata])

  const testHandle = (data) => {
    let id = 0;
    for (let i=0; i<pdata.length; i++) {
      if (data.Name == pdata[i].Name && data.Size == pdata[i].Size && data.Price == pdata[i].Price) {
        console.log(pdata[i].Id);
      }
      else {
        continue;
      }
    }

  }

  const handleCart = async (data) => {
    const customerId = JSON.parse(localStorage.getItem("id"));
    if (customerId === null) {
      toast.error("You need to log in first!");
      return;
    }
    let id = 0;
    for (let i=0; i<pdata.length; i++) {
      if (data.Name == pdata[i].Name && data.Size == pdata[i].Size && data.Price == pdata[i].Price) {
        id = pdata[i].Id;
      }
      else {
        continue;
      }
    }
    data.Amount = amount;
    let items = await localStorage.getItem("cart");
    items = JSON.parse(items);
    if (items) {
      let array = items;
      array.push({Id: id, Amount: data.Amount});
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
        localStorage.setItem("cart", JSON.stringify(array));
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

  const setSizes = (data) => {
    let sarray = [];
    for (let i=0; i<pdata.length; i++) {
      if (pdata[i].Name == data){
        sarray.push(pdata[i].Size)
      }
      else {
        continue;
      }
    }
    return sarray;
  }

  const setPrices = (name, size) => {
    let price = 0;
    for (let i=0; i<pdata.length; i++) {
      if (pdata[i].Name == name) {
        if (pdata[i].Size == size) {
          price = pdata[i].Price;
          return price;
        }
      }
    }
  }
 
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    getProduct();
  }, [cart, getProduct]);
  
  return (
    <div className="products-display">
      
      {test &&
        test.map((item, idx) => {
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
                        alignItems: "center",
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
                        {/* <span
                          style={{
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          {item.Size} */}
                        {/* </span> */}
                        <span style={{ fontWeight: "bold" }}>{item.Name}</span>
                        <select onChange={(e) => {item.Size = e.target.value; item.Price = setPrices(item.Name, item.Size); setTest([...test])}}>{setSizes(item.Name).map(val => <option val={val}>{val}</option>)}</select>
                      </div>
                      <span>${item.Price}</span>
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
                        min="1"
                        placeholder={1}
                        onChange={setQuantity}
                        onKeyDown={(event) => {
                          event.preventDefault();
                        }}
                      ></input>
                      <Button
                        variant="success"
                        style={{ height: "40px" }}
                        onClick={() => handleCart(item)}
                      >
                        <IoCartOutline />
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
