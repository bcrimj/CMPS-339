/** @format */

import "./App.css";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(["hello"]);
  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
  });

  //TODO: Remove this test commit

  const setInput = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getData = async () => {
    console.log(data);
    const newData = await fetch("/api", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(newData);
    setData(newData);
  };

  const createCustomer = async () => {
    const newData = await fetch("/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...customer,
      }),
    });
  };
  return (
    <div className="App">
      <input
        type="text"
        name="FirstName"
        placeholder="First"
        onChange={setInput}
      ></input>
      <input
        type="text"
        name="LastName"
        placeholder="Last"
        onChange={setInput}
      ></input>
      <input
        type="text"
        name="Address"
        placeholder="Address"
        onChange={setInput}
      ></input>
      <button onClick={() => getData()}> Click </button>
      <button onClick={() => createCustomer()}> Create </button>
      <button>hello</button>
      <p></p>
      {data.map &&
        data.map((item, idx) => {
          return (
            <div key={item.id}>
              {item.FirstName + " "}
              {item.LastName + " "}
              {item.Address}
            </div>
          );
        })}
    </div>
  );
}

export default App;
