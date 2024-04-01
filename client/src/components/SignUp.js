import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password, cpassword
            })
        });

        const data = await res.json();

        if (data.status === 422 || !data || data.error) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else {
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/login");
        }

    }



    return (

        <div className='login-singup-wrapper-1'>
            <div className='login-singup-wrapper-2 active' id="container">
                <div className="form-container sign-in">
                    <form method='POST'>
                        <h2>Create Account</h2>

                        <input type="text" name='name' id='name' autoComplete='off'
                            placeholder="Name"
                            value={user.name}
                            onChange={handleInputs}
                        />

                        <input type="email" name='email' id='email' autoComplete='off'
                            placeholder="Email"
                            value={user.email}
                            onChange={handleInputs}
                        />

                        <input type="tel" name='phone' id='phone' autoComplete='off'
                            placeholder="Mobile Number"
                            value={user.phone}
                            onChange={handleInputs}
                        />

                        <input type='password' name='password' id='password' autoComplete='off'
                            value={user.password}
                            onChange={handleInputs}
                            placeholder='Enter Password'
                        />

                        <input type='password' name='cpassword' id='cpassword' autoComplete='off'
                            value={user.cpassword}
                            onChange={handleInputs}
                            placeholder='Confirm the Password'
                        />


                        <input type='submit' name='signup' id='signup' className='form-submit'
                            value='Register' onClick={PostData}
                        />
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className='toggle-panel toggle-left'>
                            <h1>Welcome Back!</h1>
                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignUp;
