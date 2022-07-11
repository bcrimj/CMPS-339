/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Table, InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

function ProductAdmin() {
  const [pdata, setPdata] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState([]);
  const [prodId, setProdId] = useState("");

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
    getProduct();
  }, [getProduct]);

  const setPinput = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const setPStringInput = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateOrder = async (orderId) => {
    await fetch("/products/update", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: `${prodId}`,
        Size: `${product.Size}`,
        Name: `${product.Name}`,
        Price: `${product.Price}`,
      }),
    })
      .then(getProduct())
      .then(setModalShow(false))
      .then(toast.success("Updated"));
  };

  const deleteProduct = async (id) => {
    await fetch("/product/delete", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Id: `${id}` }),
    }).then(getProduct());
  };

  const handleUpdate = (param) => {
    setModalShow(true);
    setProdId(param);
  };

  return (
    <div className="App">
      <AddProduct getProduct={getProduct} />
      <h1>All Products</h1>
      <Table striped bordered hover size="small" className="Table">
        <thead>
          <tr>
            <th>#</th>
            <th>Size</th>
            <th>Name</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pdata.map &&
            pdata.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.Id}</td>
                  <td>{item.Size}</td>
                  <td>{item.Name}</td>
                  <td>${item.Price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(item.Id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => deleteProduct(item.Id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              name="Size"
              placeholder="Size"
              onChange={setPStringInput}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              name="Name"
              placeholder="Name"
              onChange={setPStringInput}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="number"
              name="Price"
              placeholder="Price"
              onChange={setPinput}
            />
          </InputGroup>
          <Button variant="success" onClick={() => updateOrder(prodId)}>
            Update
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const AddProduct = (props) => {
  const { getProduct } = props;
  const [product, setProduct] = useState([]);

  const setNumberInput = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setStringInput = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createProduct = async () => {
    await fetch("/pcreate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Size: `${product.Size}`,
        Name: `${product.Name}`,
        Price: `${product.Price}`,
      }),
    })
      .then(getProduct())
      .then(toast.success("Product Created"));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Create A Product</h1>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            name="Size"
            placeholder="Size"
            onChange={setStringInput}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            name="Name"
            placeholder="Name"
            onChange={setStringInput}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            type="number"
            name="Price"
            placeholder="Price"
            onChange={setNumberInput}
          />
        </InputGroup>
        <Button variant="success" onClick={() => createProduct()}>
          Create
        </Button>
      </div>
    </>
  );
};

export default ProductAdmin;
