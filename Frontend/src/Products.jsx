
import React from 'react';
import Navbar from './Navbar';
import { useState, useEffect  } from "react";
import {useNavigate} from "react-router-dom";

import "./Products.css";

function Products() {

    const navigate = useNavigate();

    const [startPrice, setStartPrice] = useState(0);

    const [productList, setProductList] = useState([]);

    const [showFilters, setShowFilters] = useState(true);

    useEffect(() => {

        fetch("http://localhost:3000/api/products")
            .then(response => response.json())
            .then(data => setProductList(data))
            .catch(error => console.log(error));

    }, []);

    async function addToCart(id){
        
        const response  = await fetch("http://localhost:3000/api/cart/add" , {
            method : "POST",
            credentials : "include",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({productId : id})
        })
        
        if(response.ok){
            alert("Item Added to Cart");
        }

    }

    return (
        <>

        
            <Navbar/>   
            <button className='filter-toggle-btn btn btn-warning ms-5'
                            onClick={() => setShowFilters(!showFilters)}>{showFilters ? "<- Hide Filters" : "Show Filters ->"}</button>
            <div className='productsPage mt-5'>

                

                {showFilters && <div className={`filtersSection w-35 ms-5 ${showFilters ? "" : " filters-hidden"}`}>
                    <h2>Shop All </h2>  
                    
                    <p>Browse our complete collection of premium electronics.</p>

                    <p className='fw-bold'>Categories</p>

                    <div className='checkboxes'>
                        <label className='my-2'><input type="checkbox" value="All" />All</label>
                        <br />
                        <label className='my-2'><input type="checkbox" value="Audio" />Audio</label>
                        <br />
                        <label className='my-2'><input type="checkbox" value="Wearables" />Wearables</label>
                        <br />
                        <label className='my-2'><input type="checkbox" value="Camera" />Camera</label>

                    </div>

                    <p className='fw-bold mt-4'>Price Range</p>
                    <div className="range-wrapper">
                        <span>₹{startPrice}</span>
                        <input type="range" min="0" max="50000" className='rangeInput' onChange={(event) => setStartPrice(event.target.value)} />
                        <span>₹50000</span>
                    </div>
                </div>}
                <div className="productListSection ms-5">
                    {productList && productList.map((product) => {
                        return (
                            <div className='card p-1' key={product._id} onClick={() => navigate("/products/"+product._id)}>
                                <img src={product.image} alt="" className='card-img-top' onError={(event) => {
                                    event.target.onerror = null;    
                                    event.target.src = "./images/ImageDefaultPlaceholder.png"}} />
                                <div className="card-body">
                                    <div className="card-title h5">{product.name}</div>
                                    <div className='meta-container'>
                                        <span style={{color: "var(--text-secondary)"}}>{product.category}</span>
                                        <span className='btn btn-info rounded-pill justify-content-end ms-5'>Price : ₹{product.price} </span>
                                    </div>
                                    <br />
                                    <button onClick={(event) => {
                                        event.stopPropagation();
                                        addToCart(product._id)
                                    }} className='btn btn-outline-success'>Add to Cart <i class="bi bi-plus"></i></button>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Products