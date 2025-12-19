import React from 'react';
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch("http://13.53.101.85:3000/api/login", {
                method: "POST",
                credentials : "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            if(response.ok){
                await fetch("http://13.53.101.85:3000/api/me", {credentials : "include"});
                alert("Login Successfull");
                navigate("/");
                console.log(response);
                
            }
            else{
                alert("Login Failed");
            }
        }
        catch(error){
            console.log(error);
        }
        

    }

    return (
        <div className='loginPage '>
            <form onSubmit={(event) => handleLogin(event)} className='formContainer p-3 rounded rounded-5'>
                <h2>Login</h2>
                <div>
                    <label htmlFor="emailInput" className='form-label'>Enter your email :</label>
                    <input type="text" name="emailInput" id="emailInput"
                        className='form-control form-control-lg' value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="passwordInput" className='form-label'>Enter your password : </label>
                    <input type="password" name='passwordInput' id='passwordInput'
                        className='form-control form-control-lg' value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button className='btn btn-primary'>Login</button>

                <p>Do not have an account ? <Link to="/register">Register</Link></p>
            </form>

        </div>
    );
}

export default LoginPage;