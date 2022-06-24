import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../screens/Alldata.css';
function Alldata(){
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
		.then(getData());
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
		    <div>
			    <p></p>
		        <div className="Customer">
                    <h1>New Customer</h1>
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
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            name="Address"
                            placeholder="Address"
                            onChange={setInput}
                        />      
                    </InputGroup>
                </div>
			    <Button className="button" variant='success' onClick={() => getData()}> Refresh </Button>
			    <Button variant='success' onClick={() => createCustomer()}> Create </Button>
			    <p></p>
            </div >
            <Table widthstriped bordered hover size="small" className="Table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th> Address</th>
                    </tr>
                </thead>
                <tbody>
			{
			data.map && data.map((item, idx) => {
				return (
			<tr key={item.id}>
            <td>{item.Id}</td>
			<td>{item.FirstName}</td>
			<td>{item.LastName}</td>
			<td>{item.Address}</td>
            </tr>
			
			)
		})
	        }
            </tbody>
            </Table>
		<div>
			<p></p>
			<div className="Customer">
                    <h1>New Product</h1>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            name="Name"
                            placeholder="Product Name"
                            onChange={setPinput}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            name="Size"
                            placeholder="Product Size"
                            onChange={setPinput}
                        />
                    </InputGroup>
                </div>
			<Button className="button" variant="success" onClick={() => getProduct()}> Refresh </Button>
			<Button variant="success" onClick={() => createProduct()}> Create </Button>
			<p></p>
		</div >
        <Table widthstriped bordered hover size="small" className="Table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
		{
			pdata.map && pdata.map((item, idx) => {
				return (
					<tr key={item.Id}>
                        <td>{item.Id}</td>
						<td>{item.Name}</td>
						<td>{item.Size}</td>
					</tr>
				)
			})
		}
        </tbody>
        </Table>
		<div>
			<p></p>
			{/* <input type="number" name="ProductId" placeholder="Customer Id" onChange={setOinput}></input>
			<input type="number" name="CustomerId" placeholder="Product Id" onChange={setOinput}></input>
			<input type="number" name="Amount" placeholder="Amount" onChange={setOinput}></input> */}
            <h1>New Order</h1>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            name="CustomerId"
                            placeholder="Customer Id"
                            onChange={setOinput}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            name="ProductId"
                            placeholder="Product Id"
                            onChange={setOinput}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            name="Amount"
                            placeholder="Total Amount"
                            onChange={setOinput}
                        />
                    </InputGroup>
			<Button className="Button" variant="success" onClick={() => getOrders()}> Click </Button>
			<Button variant="success" onClick={() => createOrder()}> Create </Button>
			<p></p>
		</div >
        <Table widthstriped bordered hover size="small" className="Table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Id #</th>
                        <th>Product Id #</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
		{
			odata.map && odata.map((item, idx) => {
				return (
					<tr key={item.Id}>
                        <td>{item.Id}</td>
						<td>{item.CustomerId}</td>
						<td>{item.ProductId}</td>
						<td>{item.Amount}</td>
					</tr>
				)
			})
		}
        </tbody>
        </Table>
	</div>
		
	);

}

export default Alldata;