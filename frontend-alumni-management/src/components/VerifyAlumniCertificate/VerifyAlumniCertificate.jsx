import React, { useState } from 'react';

// Fontawesome library imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';

const VerifyAlumniCertificate = () => {
    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-10 col-lg-8 col-xl-6 shadow-lg p-3 p-md-5 rounded-3 mx-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Verify Alumni</h1>
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    name="id"
                                    type="number" className="form-control" id="uniqueId" placeholder="Unique Certificate Number" required />
                                <label htmlFor="uniqueId">Unique Certificate Number</label>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>RMIT Grad Network</p>
                            </div>

                            <div className="text-center mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Verify <FontAwesomeIcon icon={faFileCircleCheck} /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAlumniCertificate;