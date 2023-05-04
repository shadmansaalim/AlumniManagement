import React from 'react';

// CSS for Login Page
import './Login.css';

// Fontawesome library imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Login</h1>
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    name="email"
                                    type="email" className="form-control" id="loginEmail" placeholder="Email address" />
                                <label htmlFor="loginEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    name="password"
                                    type="password" className="form-control" id="loginPassword" placeholder="Password" />
                                <label htmlFor="loginPassword">Password</label>
                            </div>

                            <div className="text-center mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Login <FontAwesomeIcon icon={faSignInAlt} /></button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" type="button" className="link-danger">Sign Up</a></p>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>OR</p>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className="lead fw-normal mb-0 me-2">Sign in with</p>
                                <button type="button" className="btn btn-dark rounded-3">
                                    Google <i className="fab fa-google"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;