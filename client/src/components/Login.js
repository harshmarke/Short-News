import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Login.css'; // Import your CSS file

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true
        };
    }

    handleToggle = () => {
        this.setState(prevState => ({
            isSignIn: !prevState.isSignIn
        }));
    };

    render() {
        const { isSignIn } = this.state;
        return (
            <div className='login-singup-wrapper-1'>
                <div className={`login-singup-wrapper-2 ${isSignIn ? 'active' : ''}`} id="container">
                    <div className="form-container sign-up">
                        <form>
                            <h2>Create Account</h2>
                            {/* <div className="social-icons">
                                <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            </div> */}
                            {/* <span>or use your email for registeration</span> */}
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <input type="tel" placeholder="Mobile Number" />
                            <input type="date" placeholder="Birth Date" />
                            <div className='gender-field'>
                                <label for="gender">Gender :</label>
                                <select id="gender" name="gender">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form>
                            <h2>Sign In</h2>
                            <div className="social-icons">
                                <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            </div>
                            <span>or use your email password</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forget Your Password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className={`toggle-panel toggle-left ${isSignIn ? 'active' : ''}`}>
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login" onClick={this.handleToggle}>Sign In</button>
                            </div>
                            <div className={`toggle-panel toggle-right ${!isSignIn ? 'active' : ''}`}>
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className="hidden" id="register" onClick={this.handleToggle}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
