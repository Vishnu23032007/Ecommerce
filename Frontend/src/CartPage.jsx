import React from 'react';
import "./CartPage.css";
import Navbar from "./Navbar";

import { useState, useEffect } from "react";

function CartPage() {

    const [cartList, setCartList] = useState({ items: [] });

    useEffect(() => {
        fetchCart();
    } , [])

    function fetchCart(){

        fetch("http://localhost:3000/api/cart",{
            credentials : "include"
        })
        .then(response => response.json())
        .then(data => setCartList(data))
        .catch(error => console.log(error));
    }

    function handleQuantityIncrement(id){

        const bodyData = {productId : id, action : "increase"}

        fetch("http://localhost:3000/api/cart/update" , {
            method : "PUT",
            credentials : "include",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(bodyData)
        })
        .then(() => fetchCart())
        .catch(error => console.log(error))
    }

    function handleQuantityDecrement(id){
        const bodyData = {productId : id , action : "decrease"}

        fetch("http://localhost:3000/api/cart/update" , {
            method : "PUT",
            credentials : "include",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(bodyData)
        })
        .then(() => fetchCart())
        .catch(error => console.log(error))
    }

    return (
        <div className='cartPage'>
            <Navbar/>
            <h1 className='ps-5'>Shopping Cart</h1>
            <div className='totalPriceDiv ps-5  '>
                <span className='totalPrice'>Total Price : ₹{(cartList.totalPrice || 0).toLocaleString('en-IN')}</span>
                <span className='totalItems'>No. Of Items : {cartList.totalItems}</span>
            </div>
            <div className="cartGrid">
                {cartList.items.map((item , index) => {
                    return (
                        <div key={item.product._id} className='productDiv'>
                            <div className='imageDiv'>
                                <img src={item.product.image} alt="" />
                            </div>

                            <div className="details">
                                <h2 className='productName'>{item.product.name}</h2>
                                <p className='productDesc'>{item.product.description}</p>

                                <div className="metaRow">
                                    <span className="category">
                                        {item.product.category}
                                    </span>
                                    <span className="price">
                                        ₹{item.product.price}
                                    </span>
                                </div>

                                <div className="quantityRow">
                                    <div className='qtyText'>Quantity : {item.quantity}</div>
                                    <div className='icons'>
                                        <button onClick={() => handleQuantityIncrement(item.product._id)}><i className="bi bi-plus"></i></button>
                                        <button onClick={() => handleQuantityDecrement(item.product._id)}><i className="bi bi-dash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            
        </div>
    )
}

export default CartPage;