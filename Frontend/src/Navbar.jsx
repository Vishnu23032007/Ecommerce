import React from 'react'
import "./Navbar.css";

import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    return (
        <div className='navbar navbar-expand-md'>
            <div className="container">
                <div className="navbar-brand">
                    ElectroMart
                </div>

                <button className="navbar-toggler" data-bs-target = "#links" data-bs-toggle="collapse">
                    <span className='navbar-toggler-icon'>  </span>
                </button>
                <div id="links" className='collapse navbar-collapse justify-content-end gap-2'>
                    <ul className="navbar-nav">
                        <li className="nav-item"><a href="#" className='nav-link mx-2' onClick={() => navigate("/")}>Home</a></li>
                        <li className="nav-item"><a href="#" className='nav-link mx-2' onClick={() => navigate("/products")}>Shop</a></li>
                        <li className="nav-item"><a href="#"className='nav-link mx-2' onClick={() => navigate("/cart")} >Cart</a></li>
                        <li className="nav-item"><a href="#" className='nav-link mx-2'>Collections</a></li>
                        <li className="nav-item"><a href="#" className='nav-link mx-2'>About</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar