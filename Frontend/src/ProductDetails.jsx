import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import {Link , useNavigate} from "react-router-dom";

import Navbar from "./Navbar";
import StarRating from './StarRating';
import "./ProductDetails.css";

function ProductDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const featuresList = [];

    useEffect(() => {
        fetch("http://localhost:3000/api/products/" + id)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, []);



    return (
        <div>
            <Navbar />
            <span style={{ color: "var(--text-secondary)" , cursor : "pointer" }} onClick={() => navigate("/products")} className='ms-5 mt-5'><i class="bi bi-arrow-left"></i> Back to Shop</span>
            {product &&
                <div className='productDetailsSection  vh-100 d-flex'>
                    <div className="imageDiv p-5  m-5 w-50 rounded" style={{ backgroundColor: "lightgray" }}>
                        <img src={product.image} alt="" className='w-100' style={{objectFit : "contain"}} onError={(event) => {
                            event.target.onerror = null;
                            event.target.src = "/images/ImageDefaultPlaceholder.png";
                        }}/>
                    </div>
                    <div className="otherDetails w-50 m-3">
                        <div className="categoryAndRating d-flex justify-content-between align-items-center mb-3 me-3 w-100">
                            <span className='text-uppercase productCategory '>{product.category}</span>
                            <StarRating rating={product.rating.average} count={product.rating.count} />
                        </div>

                        <div className="namePriceAndDescription">
                            <span className='productName'>{product.name}</span>
                            <span className='productPrice'>₹{product.price}</span>
                            <span style={{ color: "var(--text-secondary)" }}>{product.description}</span>
                            {console.log(product.features)}
                        </div>

                        <hr className='my-4 opacity-25'/>

                        <div className="featuresList">
                            {(product.features).map((item , index) => {
                                return (
                                    <div key={index} className='featureCard'>
                                        <div  style={{color : "var(--text-secondary)" , fontSize : "14px"}}>{item.label}</div>
                                        <div className='card-body' style={{color : "var(--text-primary)" , fontSize : "16px" , fontWeight : "600"}}>{item.value}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <hr className='my-4 opacity-25'/>
                        
                        <div className="buttons d-flex gap-3">
                            <button className='btn btn-success addToCart'>Add to Cart</button>
                            <span className='heartIcon'><i class="bi bi-heart"></i></span>
                            <span className='heartIcon'><i class="bi bi-share"></i></span>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails