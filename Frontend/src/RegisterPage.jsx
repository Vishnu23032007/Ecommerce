import React , {useState , useEffect} from 'react'
import {Link} from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {

    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    function validateDetails(){

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return false;
        }

        if(password.length < 4){
            alert("Password should be atleast 4 characters");
            return false;
        }
        return true;
    }

    async function submitForm(event){

        event.preventDefault();

        if(!validateDetails())
            return ;

        const userData = {userName , email , password};
        
        try{
            const response = await fetch("http://localhost:3000/api/register",{
                method : "POST" , 
                credentials : "include",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(userData)
            });

            const data = response.json();
            console.log(data);

            if(response.ok){
                alert("Registration Successfull");
            }
            else{
                alert(data.message || "Error during registration.");
            }
        }
        catch(error) {
            console.log(error);
        }

    }

    return (
        <div className='registerPage'>
            <form onSubmit={(event) => submitForm(event)} className='formContainer rounded-5'>
                <h2 className='mt-3'>Register</h2>
                <div>
                    <label htmlFor="userNameInput" className='form-label '>Enter your username :</label>
                    <input type="text" className='form-control form-control-lg' id='userNameInput' value={userName} onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="emailInput" className='form-label'>Enter your email :</label>
                    <input type="text" className='form-control form-control-lg' id='emailInput' value={email} onChange={(event) => setEmail(event.target.value)}  />
                </div>
                <div>
                    <label htmlFor="passwordInput" className='form-label'>Enter your password :</label>
                    <input type="password" className='form-control form-control-lg' id='passwordInput' value={password} onChange={(event) => setPassword(event.target.value)}  />
                </div>
                <div>
                    <label htmlFor="confirmPasswordInput" className='form-label'>Re-enter your password :</label>
                    <input type="password" className='form-control form-control-lg' id='confirmPasswordInput' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}  />
                </div>

                <button className="btn btn-primary">Register</button>
                <p>Already have an account ? <Link to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default RegisterPage