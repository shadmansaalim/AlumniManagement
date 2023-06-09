import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({});
    const { registerUser } = useAuth();


    const [semesterToCheck, setSemesterToCheck] = useState(0);

    useEffect(() => {
        // Randomly choosing a semester from 1 to 6
        setSemesterToCheck(Math.floor(Math.random() * 6) + 1);
    }, []);


    const navigate = useNavigate();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newSignUpData = { ...signUpData };
        newSignUpData[field] = value;
        setSignUpData(newSignUpData);
    }

    const handleSignUpSubmit = e => {
        if (signUpData.password !== signUpData.password2) {
            swal("Passwords doesn't match!", "Please check password and then try again", "error");
        }
        else {
            registerUser(signUpData.firstName, signUpData.lastName, signUpData.username, semesterToCheck, parseFloat(signUpData.userInputGpa), signUpData.password, navigate, false);
            e.target.reset();
        }

        e.preventDefault();
    }
    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Sign Up</h1>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="firstName"
                                    type="text" className="form-control" id="firstName" placeholder="First Name" required />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="lastName"
                                    type="text" className="form-control" id="lastName" placeholder="Last Name" required />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="username"
                                    type="text" className="form-control" id="username" placeholder="Student Username" required />
                                <label htmlFor="username">Student Username</label>
                            </div>
                            <div>
                                <p className="text-start text-secondary mb-1">This helps us to verify you</p>
                                <div className="form-floating mb-3">
                                    <input
                                        onBlur={handleOnBlur}
                                        name="userInputGpa"
                                        type="string"
                                        className="form-control" id="userInputGpa" placeholder={`Your semester ${semesterToCheck} GPA`} required />
                                    <label htmlFor="userInputGpa">Your semester {semesterToCheck} GPA</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password"
                                    type="password" className="form-control" id="signUpPassword1" placeholder="Password" required />
                                <label htmlFor="signUpPassword1">Password</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password2"
                                    type="password" className="form-control" id="signUpPassword2" placeholder="Confirm Password" required />
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










