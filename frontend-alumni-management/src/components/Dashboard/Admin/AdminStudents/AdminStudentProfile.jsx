import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';

import { Container } from 'react-bootstrap';
import profile from '../../../../assets/profile.png';

import './AdminStudentProfile.css';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios/axios';

const AdminStudentProfile = () => {
    const { username } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const API = `http://localhost:3000/api/v1/students?username=${username}`;
        axios.get(API).then(res => {
            if (res.data) {
                setStudent(res.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Container className="d-flex justify-content-center my-4">
                <div className="mx-auto col-12 col-lg-9 profile-wrapper">
                    <img src={profile} alt="" width="80px" height="80px" />

                    <div className="mt-2">
                        <span>Username : {student?.username}</span>
                    </div>
                    <div className="mt-3 text-start">
                        <div className="mb-3">
                            <div className="mb-2">First Name</div>
                            <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{student?.firstName}</span>
                        </div>
                        <div className="mb-3">
                            <div className="mb-2">Last Name</div>
                            <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{student?.lastName}</span>
                        </div>
                        <div className="mb-3">
                            <div className="mb-2">Degree</div>
                            <span className="rounded-3 w-100 user-details d-flex align-items-center">{student?.degree}</span>
                        </div>
                        <div className="mb-3">
                            <div className="mb-2">Graduation Year</div>
                            <span className="rounded-3 w-100 user-details d-flex align-items-center">{student?.graduationYear}</span>
                        </div>

                        <div className="mb-3">
                            <div className="mb-2">Semester Results</div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 1</span>
                                <span>GPA {student?.gpa?.sem1}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 1</span>
                                <span>GPA {student?.gpa?.sem1}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 2</span>
                                <span>GPA {student?.gpa?.sem2}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 3</span>
                                <span>GPA {student?.gpa?.sem3}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 4</span>
                                <span>GPA {student?.gpa?.sem4}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 5</span>
                                <span>GPA {student?.gpa?.sem5}</span>
                            </div>
                        </div>


                        <div className="me-auto">
                            <button className="btn btn-secondary me-md-3 w-100">Issue Certificate <FontAwesomeIcon icon={faFileSignature} /></button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminStudentProfile;