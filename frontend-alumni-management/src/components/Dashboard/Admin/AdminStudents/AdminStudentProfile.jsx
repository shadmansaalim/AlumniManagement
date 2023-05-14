import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';

import { Container } from 'react-bootstrap';
import profile from '../../../../assets/profile.png';

import './AdminStudentProfile.css';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios/axios';


import { Button, Modal, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';

function IssueCertificateModal(props) {
    const { currentUser } = useAuth();

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Issue Certificate
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={props.handleSubmitIssueCertificate}>
                <Modal.Body>
                    <p>
                        You, {currentUser?.firstName} {currentUser?.lastName} is granting {props?.student?.firstName} {props?.student?.lastName}'s graduation certificate as an administrator. Please do provide your unique private key as it is a digital representation of your identity that is used to sign and encrypt the alumni's certificate.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="form-floating w-100">
                        <input
                            onChange={(e) => props.setPrivateKey(e.target.value)}
                            name="firstName"
                            type="text" className="form-control" id="privateKey" placeholder="Private Ke" required
                        />
                        <label htmlFor="privateKey">Private Key</label>
                    </div>
                    <div className="w-100 mt-3">
                        <Button type="submit" className="w-100 justify-content-center py-2">Submit</Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>

    );
}




const AdminStudentProfile = () => {
    const { username } = useParams();
    const [student, setStudent] = useState(null);

    const [modalShow, setModalShow] = useState(false);

    const [privateKey, setPrivateKey] = useState("");

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

    const handleSubmitIssueCertificate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/certificates/create-certificate', {
                privateKey,
                student
            });
            console.log(response.data);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };


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

                        <div className="mb-3">
                            <div className="mb-2">Student Grade</div>
                            <span className="rounded-3 w-100 user-details d-flex align-items-center">{student?.grade}</span>
                        </div>


                        <div className="me-auto">
                            <button onClick={() => setModalShow(true)} className="btn btn-secondary me-md-3 w-100">Issue Certificate <FontAwesomeIcon icon={faFileSignature} /></button>


                            <IssueCertificateModal
                                show={modalShow}
                                student={student}
                                setPrivateKey={setPrivateKey}
                                handleSubmitIssueCertificate={handleSubmitIssueCertificate}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminStudentProfile;