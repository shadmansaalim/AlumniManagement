import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {

    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Sign Up</h1>
                        <form >
                            <div className="form-floating mb-3">
                                <input
                                    name="name"
                                    type="text" className="form-control" id="signUpName" placeholder="Your Name" />
                                <label htmlFor="signUpName">Your Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    name="email"
                                    type="email" className="form-control" id="signUpEmail" placeholder="Email address" />
                                <label htmlFor="signUpEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    name="password"
                                    type="password" className="form-control" id="signUpPassword1" placeholder="Password" />
                                <label htmlFor="signUpPassword1">Password</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    name="password2"
                                    type="password" className="form-control" id="signUpPassword2" placeholder="Confirm Password" />
                                <label htmlFor="signUpPassword2">Confirm Password</label>
                            </div>

                            <div className="text-center mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Sign Up <FontAwesomeIcon icon={faSignInAlt} /></button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login" type="button" className="link-danger">Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;