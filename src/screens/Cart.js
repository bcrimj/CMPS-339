import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './Cart.css';
import { IoTrashOutline } from "react-icons/io5";


function Cart(props) {

    const {show, onClose} = props;
    const [cart, setCart] = useState([]);

    useEffect (() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        if (items) {
            setCart(items);
        }
    },[show]);

    const removeItem = async (id) => {
        const arr = cart.filter((item) => item.Id !== id);
        setCart(arr);
        let newArr = JSON.parse(localStorage.getItem('cart'));
        const index = newArr.findIndex(x => x.Id == id);
        newArr.splice(index, 1);
        await localStorage.setItem('cart', JSON.stringify(newArr));
        console.log(cart);
       }

    

    return (
        <Modal
        show={show}
        onHide={onClose}
        >
            <Modal.Title className="cart-header"> Cart </Modal.Title>
            <Modal.Body>
                {cart.map(item => (
                    <div style={{ marginBottom: "20px"}}>
                    <text style={{ fontWeight: 'bold'}}>{item.Size} </text> 
                    <text>{item.Name}</text>
                    <IoTrashOutline style={{ float: 'right', color: 'red'}} onClick={() => removeItem(item.Id)}/>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success">Checkout</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;