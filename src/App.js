import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './images/lion.png';

import { Navbar, Nav, Container} from 'react-bootstrap';
function App() {

	const [data, setData] = useState(['hello']);
	const [pdata, setPdata] = useState(['']);
	const [odata, setOdata] = useState(['']);
	const [customer, setCustomer] = useState({FirstName: '', LastName: '', Address: ''});
	const [product, setProduct] = useState({Name: '', Size: ''});
	const [order, setOrder] = useState({ProductId: 0, CustomerId: 0, Amount : 0});

	const setInput = (e) => {
		const {name, value } = e.target;
		setCustomer(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const setPinput = (e) => {
		const {name, value } = e.target;
		setProduct(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const setOinput = (e) => {
		const {name, value } = e.target;
		setOrder(prevState => ({
			...prevState,
			[name]: parseInt(value)
		}))
	}
	const getData = async () => {
		console.log(data)
		const newData = await fetch('/api', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Accept' : 'application/json'
			}
		})
		.then(res => res.json());
		console.log(newData);
		setData(newData);
	 }

	 const getProduct = async () => {
		const newData = await fetch('/product', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json());
		setPdata(newData)
	}

	const getOrders = async () => {
		const newData = await fetch('/order', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json());
		setOdata(newData)
		
	 }

	const createCustomer = async () => {
		const newData = await fetch('/create', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				...customer
			})
		})
		.then(getProduct());
	}

	const createProduct = async () => {
		const newData = await fetch('/pcreate', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				...product
			})
			
		})
		.then(getProduct());
	}

	const createOrder = async () => {
		const newData = await fetch('/ocreate', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				...order
			})
			
		})
		.then(getOrders());
	}

	useEffect(() => {
		getData();
		getProduct();
		getOrders();
	}, []);

	return (
		<div className="App">
		<img className="Lion" src={logo}/>
		
		<Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
			<div>
			<p></p>
			<input type="text" name="FirstName" placeholder="First" onChange={setInput}></input>
			<input type="text" name="LastName" placeholder="Last" onChange={setInput}></input>
			<input type="text" name="Address" placeholder="Address" onChange={setInput}></input>
			<button onClick={() => getData()}> Click </button>
			<button onClick={() => createCustomer()}> Create </button>
			<p></p>
			</div >
			{
			data.map && data.map((item, idx) => {
				return (
			<div key={item.id}>
			{item.FirstName + " "}
			{item.LastName + " "}
			{item.Address}
			</div>
			)
		})
	}
		<div>
			<p></p>
			<input type="text" name="Name" placeholder="Product Name" onChange={setPinput}></input>
			<input type="text" name="Size" placeholder="Size" onChange={setPinput}></input>
			<button onClick={() => getProduct()}> Click </button>
			<button onClick={() => createProduct()}> Create </button>
			<p></p>
		</div >
		{
			pdata.map && pdata.map((item, idx) => {
				return (
					<div key={item.id}>
						{item.Name + " "}
						{item.Size + " "}
					</div>
				)
			})
		}
		<div>
			<p></p>
			<input type="number" name="ProductId" placeholder="Customer Id" onChange={setOinput}></input>
			<input type="number" name="CustomerId" placeholder="Product Id" onChange={setOinput}></input>
			<input type="number" name="Amount" placeholder="Amount" onChange={setOinput}></input>
			<button onClick={() => getProduct()}> Click </button>
			<button onClick={() => createOrder()}> Create </button>
			<p></p>
		</div >
		{
			odata.map && odata.map((item, idx) => {
				return (
					<div key={item.id}>
						{item.CustomerId + " "}
						{item.ProductId + " "}
						{item.Amount}
					</div>
				)
			})
		}
	</div>
		
	);
}

export default App;
