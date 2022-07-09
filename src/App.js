/** @format */

import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Basenav from "./Components/Navbar";
import Alldata from "./screens/Alldata";
import Userscreen from "./screens/Userscreen";
import Products from "./screens/Products";
import logo from "./images/lion.png";
import MyOrders from "./screens/Orders";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <div>
        <img className="Lion" alt="A Lion" src={logo} />
      </div>
      <Router>
        <Basenav />
        <Routes>
          <Route path="/" element={<Alldata />} />
          <Route path="user" element={<Userscreen />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
