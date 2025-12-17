import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import HomePage from './HomePage.jsx';
import Products from './Products.jsx';
import ProductDetails from './ProductDetails.jsx';
import CartPage from "./CartPage.jsx";

const router = createBrowserRouter([
    {
        path : "/login",
        element : <LoginPage/>
    },
    {
        path : "/register",
        element : <RegisterPage/>
    },
    {
        path : "/",
        element : <HomePage/>
    },
    {
        path : "/products",
        element : <Products/>
    },
    {
        path : "/products/:id",
        element : <ProductDetails/>
    },
    {
        path : "/cart",
        element : <CartPage/>
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
        <App />
    </StrictMode>,
)
