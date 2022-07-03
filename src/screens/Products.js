import React, { useState, useEffect } from 'react';
import '../screens/Alldata.css';
import { Table, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import Coffee from '../images/coffee.jpg';
import Cart from './Cart';

function Products() {

    const [pdata, setPdata] = useState(['']);
    const [product, setProduct] = useState({Name: '', Size: ''});
    const [cart, setCart] = useState([]);

    useEffect (() => {
        getProduct();
        // eslint-disable-next-line
    }, []);

    useEffect (() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const setPinput = (e) => {
		const {name, value } = e.target;
		setProduct(prevState => ({
			...prevState,
			[name]: value
		}))
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

    const createProduct = async () => {
		await fetch('/pcreate', {
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

    const deleteProduct = async (x) => {
        await fetch('/product/delete', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({"Id": `${x}`})
        })
        .then(getProduct());
        
    }

    const handleCart =  async data => {
        let items = await localStorage.getItem('cart');
        items = JSON.parse(items);
        if (items)
        {
            let array = items;
            array.push(data);
            try
            {
                await localStorage.setItem('cart', JSON.stringify(array));
            }
            catch (error)
            {
                return error;
            }
        }
        else
        {
            let array=[];
            array.push(data);
            try
            {
                await localStorage.setItem('cart', JSON.stringify(array));
            }
            catch (error)
            {
                return error;
            }
        }
    }
    
    return (
        <div className='products-display'>
            {
                pdata.map && pdata.map((item, idx) => {
                    return (
                    <>
                    <Card style={{ marginTop: '20px', marginRight: '20px', width: '40vh'}}>
                        <Card.Img variant="top" src={Coffee} style={{ height: '30vh',}} />
                        <Card.Body>
                            <Card.Title>
                                <text style={{ color: 'green', fontWeight: 'bold'}}>{item.Size} </text> 
                                <text style={{ fontWeight: 'bold'}}>{item.Name}</text>
                                <Button variant="success" style={{ float: "right", height: '40px'}} onClick={() => handleCart(item)}>Add to Cart</Button>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    </>
                    )
                })
            }
        </div>
        // <div className="Products-Container">
        //     <h1>Add/Remove Products</h1>
        //     <InputGroup className="mb-3">
        //         <FormControl
        //             type="text"
        //             name="Name"
        //             placeholder="Product Name"
        //             onChange={setPinput}
        //         />
        //     </InputGroup>
        //     <InputGroup className="mb-3">
        //         <FormControl
        //             type="text"
        //             name="Size"
        //             placeholder="Size"
        //             onChange={setPinput}
        //         />
        //     </InputGroup>
        //     <Button className="button" variant='success' onClick={() => getProduct()}> Refresh </Button>
		// 	<Button variant='success' onClick={() => createProduct  ()}> Create </Button>
        //     <Table striped bordered hover size="small" className="Table">
        //         <thead>
        //             <tr>
        //                 <th>#</th>
        //                 <th>Product Name</th>
        //                 <th>Size</th>
        //                 <th>Delete Product?</th>
        //             </tr>
        //         </thead>
        //         <tbody>
		// 	{
		// 	pdata.map && pdata.map((item, idx) => {
		// 		return (
        //     <tr key={item.Id}>
        //     <td>{item.Id}</td>
		// 	<td>{item.Name}</td>
		// 	<td>{item.Size}</td>
        //     <td><Button variant="success" onClick={() => deleteProduct(item.Id)}>Delete</Button></td>
        //     </tr>
			
		// 	)
		// })
	    //     }
        //     </tbody>
        //     </Table>
        // </div>
    )
}

export default Products;