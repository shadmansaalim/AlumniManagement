import React, { useState } from 'react';

// Fontawesome library imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';

import swal from 'sweetalert';
import axios from '../../axios/axios';

import { Modal } from 'react-bootstrap';


import profile from '../../assets/profile.png'


const API_URL = 'https://alumni-management-ryp1.onrender.com';

function AlumniInfoModal(props) {
    const { alumni } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Alumni Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mx-auto col-12 col-lg-9 profile-wrapper">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <img src={profile} alt="" width="80px" height="80px" />
                    </div>
                    <div className="mt-3 text-start">
                        <div className="row">
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">First Name</div>
                                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{alumni.firstName}</span>
                            </div>
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Last Name</div>
                                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{alumni.lastName}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Degree</div>
                                <span className="rounded-3 w-100 user-details d-flex align-items-center">{alumni.degree}</span>
                            </div>
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Graduation Year</div>
                                <span className="rounded-3 w-100 user-details d-flex align-items-center">{alumni.graduationYear}</span>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2"> Semester Results</div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 1</span>
                                <span>GPA {alumni.gpa?.sem1}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 2</span>
                                <span>GPA {alumni.gpa?.sem2}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 3</span>
                                <span>GPA {alumni.gpa?.sem3}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 4</span>
                                <span>GPA {alumni.gpa?.sem4}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 5</span>
                                <span>GPA {alumni.gpa?.sem5}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 6</span>
                                <span>GPA {alumni.gpa?.sem6}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Final Overall Grade</span>
                                <span className="fw-bold text-success">{alumni.grade}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const VerifyAlumniCertificate = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const [UCN, setUCN] = useState("");
    const [alumni, setAlumni] = useState(null);

    const handleOnBlur = e => {
        setUCN(e.target.value);
    }

    const handleVerifyUCN = e => {
        e.preventDefault();
        const API = `${API_URL}/api/v1/users/verify-alumni-certificate?ucn=${UCN}`;
        axios.get(API).then(res => {
            if (res.data.verified) {
                setAlumni(res.data.data);
                setModalShow(true);
                swal("Valid UCN", "This is a verified Unique Certificate Number", "success");
            }
            else {
                swal("Invalid UCN", "This is not a verified Unique Certificate Number", "error");
            }
        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-11 col-md-10 col-lg-8 col-xl-6 shadow-lg p-3 p-md-5 rounded-3 mx-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Verify Alumni</h1>
                        <form onSubmit={handleVerifyUCN}>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="UCN"
                                    type="text" className="form-control" id="uniqueId" placeholder="Unique Certificate Number" required />
                                <label htmlFor="uniqueId">Unique Certificate Number</label>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>RMIT Grad Network</p>
                            </div>

                            <div className="text-center mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Verify <FontAwesomeIcon icon={faFileCircleCheck} /></button>
                            </div>

                            {
                                alumni
                                &&
                                <AlumniInfoModal
                                    alumni={alumni}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAlumniCertificate;