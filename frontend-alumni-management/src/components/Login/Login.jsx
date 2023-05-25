import React, { useState, useEffect } from 'react';

// CSS for Login Page
import './Login.css';

// Fontawesome library imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';

const SITE_KEY = import.meta.env.VITE_SITE_KEY;
const API_URL = 'https://alumni-management-ryp1.onrender.com';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const loadScriptByURL = (id, url) => {
            const isScriptExist = document.getElementById(id);

            if (!isScriptExist) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.id = id;
                document.body.appendChild(script);
            }
        }

        // load the reacaptcha script by passing the URL
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`);
    }, []);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        e.preventDefault();

        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
                axios.post(`${API_URL}/api/v1/users/verify-recaptcha`, {
                    username: loginData.username,
                    password: loginData.password,
                    "g-recaptcha-response": token
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(({ data: { verified } }) => {
                        if (verified) {
                            loginUser(loginData.username, loginData.password, navigate);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        });
    }


    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Login</h1>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="username"
                                    type="text" className="form-control" id="username" placeholder="Student Username" required />
                                <label htmlFor="username">Student Username</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password"
                                    type="password" className="form-control" id="loginPassword" placeholder="Password" required />
                                <label htmlFor="loginPassword">Password</label>
                            </div>

                            <div className="text-center mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Login <FontAwesomeIcon icon={faSignInAlt} /></button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" type="button" className="link-danger">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;