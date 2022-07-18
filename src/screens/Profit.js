/** @format */

import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Form } from "react-bootstrap";

function ProfitScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [total, setTotal] = useState([]);
  const [rtotal, setRtotal] = useState([]);
  const [productRangeTotal, setProductRangeTotal] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productOptions, setProductOptions] = useState([""]);

  const changeStart = (data) => {
    let sqlDate = format(data, "yyyy-MM-dd 00:00:00");
    setStartDate(data);
    setStart(sqlDate);
  };

  const getProductOptions = async () => {
    const data = await fetch(`/products/options`, {
      method: "Get",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    setProductOptions(data);
  };

  const changeEnd = (data) => {
    let sqlDate = format(data, "yyyy-MM-dd 23:59:59");
    setEndDate(data);
    setEnd(sqlDate);
  };

  const getProfit = async () => {
    const newData = await fetch("/profit", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    if (newData) {
      setTotal(newData[0].Total);
    }
  };

  const getRange = async () => {
    const rdata = await fetch("/profit/range", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Start: start,
        End: end,
      }),
    }).then((res) => res.json());
    if (rdata) {
      if (!rdata[0].Total) {
        setRtotal(0);
      } else {
        setRtotal(rdata[0].Total);
      }
    }
  };

  const getRangeForProduct = async () => {
    if (productId === 0) {
      setProductRangeTotal(0);
    } else {
      const productRangeData = await fetch("/product/profit/range", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Start: start,
          End: end,
          ProductId: productId,
        }),
      }).then((res) => res.json());
      if (productRangeData) {
        if (!productRangeData[0].Total) {
          setProductRangeTotal(0);
        } else {
          setProductRangeTotal(productRangeData[0].Total);
        }
      }
    }
  };

  const setInputProductId = (e) => {
    const { value } = e.target;
    setProductId(value);
  };

  useEffect(() => {
    getProfit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRange();
    getRangeForProduct();
    getProductOptions();
    // eslint-disable-next-line
  }, [startDate, endDate, productId]);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "70%",
          alignContent: "center",
          margin: "50px auto",
        }}
      >
        <div>
          <h2>Start Date</h2>
          <DatePicker
            popperPlacement="bottom"
            selected={startDate}
            onChange={(date) => changeStart(date)}
          />
        </div>
        <div>
          <h2>End Date</h2>
          <DatePicker
            style={{ marginLeft: "0px" }}
            popperPlacement="bottom"
            selected={endDate}
            onChange={(date) => changeEnd(date)}
          />
        </div>
        <div>
          <h2>Product</h2>
          <Form.Select onChange={setInputProductId}>
            <option>Select a Product</option>
            {productOptions &&
              productOptions.map((x) => {
                return (
                  <option value={x.Id}>
                    {x.Size} {x.Name}
                  </option>
                );
              })}
          </Form.Select>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginTop: "20px" }}>
          Total Profit to Date: <span style={{ color: "green" }}>${total}</span>
        </h2>
        <h2 style={{ marginTop: "20px" }}>
          Profit Between Selected Range:
          <span style={{ color: "green" }}>${rtotal}</span>
        </h2>
        <h2 style={{ marginTop: "20px" }}>
          Product Profit Between Selected Range:
          <span style={{ color: "green" }}>${productRangeTotal}</span>
        </h2>
      </div>
    </div>
  );
}

export default ProfitScreen;
