import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import profile from '../../../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../axios/axios';
import { useNavigate } from 'react-router-dom';


const AdminStudents = () => {
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const API = `http://localhost:3000/api/v1/students/`;
        axios.get(API).then(res => {
            if (res.data) {
                console.log(res.data.data);
                setStudents(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Container className="mt-4">
                <section className="my-5">
                    <Row xs={1} lg={2} className="g-4">
                        {
                            students.map((student) => <Col key={student.username}>
                                <Card style={{ minHeight: '300px', maxHeight: '300px', overflow: 'scroll' }} className="mx-2">
                                    <Card.Body>
                                        <div className="d-flex align-items-center text-start">

                                            <img className="img-fluid rounded-circle" src={profile} alt="" style={{ width: 48, height: 48 }}
                                            ></img>

                                            <Card.Title className="ms-3 my-0">
                                                <small className="m-0">{student.firstName}  {student.lastName}</small>
                                            </Card.Title>


                                            <button type="button" className="btn btn-danger btn-circle btn-lg ms-auto">
                                                <FontAwesomeIcon icon={faCircleExclamation} />
                                            </button>
                                        </div>
                                        <hr />
                                        <Card.Text className="text-start">
                                            {student.degree}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <button
                                            onClick={() => navigate(`/dashboard/students/${student.username}`)}
                                            className="btn btn-secondary w-100">Open Profile</button>
                                    </Card.Footer>
                                </Card>
                            </Col>)
                        }
                    </Row>
                </section>
            </Container>
        </div>
    );
};

export default AdminStudents;