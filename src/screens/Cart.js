import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './Cart.css';
import { IoTrashOutline } from "react-icons/io5";


function Cart(props) {

    const {show, onClose} = props;
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState([]);
    
    useEffect (() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        if (items) {
            setCart(items);
        }
        getTotal(items);
    },[show]);

    useEffect (() => {
        console.log(JSON.stringify(order));
        const submitOrder = async () => {
        if (order.length < 1) {
            return;
        }
        else {
            console.log(order);
            await fetch("/ocreate", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
          },
          body: JSON.stringify({
           ...order
          }),
          
        })
        }
       
    }
    submitOrder();
}, [order])

    const removeItem = async (id) => {
        const arr = cart.filter((item) => item.Id !== id);
        setCart(arr);
        let newArr = JSON.parse(localStorage.getItem('cart'));
        const index = newArr.findIndex(x => x.Id === id);
        newArr.splice(index, 1);
        await localStorage.setItem('cart', JSON.stringify(newArr));
        getTotal(newArr);
        console.log(cart);
       }

    const updateQty = async(e, data) => {
        let newcart = cart.map((item) => {
            if(item.Id === data.Id){
                {item.Amount = parseInt(e)};
            }
            return item;
        })
        setCart(newcart);
        await localStorage.setItem('cart', JSON.stringify(newcart));
        getTotal(newcart);
        console.log(cart);
        console.log(total);
    }

    const getTotal = data => {
        let total = 0;
        for (let index = 0; index < data.length; index++) {
          const productPrice = data[index].Price * data[index].Amount;
          total = total + productPrice;
        }
        setTotal(total);
      };

    const doMath = (item) => {
        let amt = parseFloat(item.Amount);
        let prc = parseFloat(item.Price);
        let total = amt * prc;
        return total;
    }

    const createOrder = async () => {
        let orderArray = [];
        for (let i = 0; i < cart.length; i++) {
           orderArray.push({
            ProductId: cart[i].Id,
            CustomerId: 1,
            Amount: cart[i].Amount,
            ShippingAddress: "12 Electric Avenue",
            Price: cart[i].Amount * cart[i].Price
           })
    }
    setOrder(orderArray);
    console.log(cart);
    };
    
    
    return (
        <Modal
        show={show}
        onHide={onClose}
        >
            <Modal.Title className="cart-header"> Cart </Modal.Title>
            <Modal.Body>
                {cart.map(item => (
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row"}}>
                        <div style={{ marginRight: "5px"}}>
                            <text style={{ fontWeight: 'bold'}}>{item.Size} </text> 
                            <text>{item.Name}</text>
                        </div>
                        
                        <div style={{ marginLeft: "auto"}}>
                            <input type="number" placeholder={item.Amount} style={{ width: "50px", marginRight: "30px"}} onChange={(event) => updateQty(event.target.value, item)}></input>
                            <text style={{ }}>{doMath(item).toFixed(2)}</text>
                            <IoTrashOutline style={{ marginLeft: "auto", color: 'red'}} onClick={() => removeItem(item.Id)}/>
                        </div>
                    </div>
                ))}
                <div style={{ textAlign: "right", borderTopColor: "black", borderTop: "2px solid black", width: "100%"}}>
                    <text style={{ }}>Total: {total.toFixed(2)}</text>
                </div>
                <div>
                    <input type="input" name="ShippingAddress" placeholder="Shipping Address"></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={createOrder}>Checkout</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;