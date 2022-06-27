/** @format */

import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../screens/Alldata.css";

function Userscreen() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ FirstName: "", LastName: "" });

  const setInput = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClick = async () => {
    const response = await fetch(`/customer/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...customer,
      }),
    }).then((res) => res.json());
    validateCustomer(response[0].Id);
  };

  const validateCustomer = (Id) => {
    if (Id) {
      localStorage.setItem("id", JSON.stringify(Id));
      navigate("/");
    }
  };

  return (
    <div className="login-page-container">
      <h1>Login</h1>
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
      <Button className="button" variant="success" onClick={() => onClick()}>
        Login
      </Button>
      <p></p>
    </div>
  );
}

export default Userscreen;
