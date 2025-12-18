import React from 'react';
import Navbar from "./Navbar";

import {Link} from "react-router-dom";

import "./HomePage.css";

function HomePage() {
    return (
        <div className='m-3'>
            <Navbar/>
            <div className="homePage    ">
                
                <div className="heroText pt-5">
                    Future Tech
                    <div className="colour">Redefined</div>
                </div>

                <div className="description w-35">
                    Discover a curated selection of premium electronics designed to elevate your workflow and lifestyle. Minimalist design, maximum performance.
                </div>
                
                <Link to="/products" className='btn btn-info rounded-pill p-3 m-3'>Shop Now <i class="bi bi-arrow-right"></i>    </Link>

                <div className='featuresGrid'>

                    <div className='featuresDiv'>
                        <div className='icons'><i class="bi bi-lightning-charge"></i></div>
                        <div>
                            <span className='title'>Fast Shipping</span>
                            <br />
                            <span className='description'>Free delivery on orders over $100</span>
                        </div>
                    </div>

                    <div className='featuresDiv'>
                        <div className='icons'><i class="bi bi-shield"></i></div>
                        <div>
                            <span className='title'>Two Year Warranty</span>
                            <br />
                            <span className='description'>Full coverage on all premium gear</span>
                        </div>
                    </div>

                    <div className='featuresDiv'>
                        <div className='icons'><i class="bi bi-truck"></i></div>
                        <div>
                            <span className='title'>30-Day Returns</span>
                            <br />
                            <span className='description'>Hassle-free return policy</span>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default HomePage;