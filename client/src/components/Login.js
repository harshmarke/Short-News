import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
    
        // console.log("Logging in...");
        
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        };
    
        // console.log("Request Options:", requestOptions);
    
        try {
            const res = await fetch("/signin", requestOptions);
    
    
            const data = await res.json();
            
            // console.log("Response Data:", data);
    
            if (data.status === 400 || !data || data.error) {
                window.alert("Invalid credentials");
            } else {
                window.alert("Login Successful");
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error);
            // window.alert("An error occurred while logging in");
        }
    }
    


    return (


        <div className='login-singup-wrapper-1'>
            <div className='login-singup-wrapper-2 active' id="container">
                <div className="form-container sign-in">
                    <form method='POST'>
                        <h2>Sign In</h2>
                        <span>use your email and password</span>
                        <input type='email' name='email' id='email' autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <input type='password' name='password' id='password' autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                        />
                        <input type='submit' name='signin' id='signin'
                            value='Signin'
                            onClick={loginUser}
                        />
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className='toggle-panel toggle-left'>
                            <h1>Welcome Back!</h1>
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;
