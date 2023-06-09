import React from 'react';
import { Container, Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import profile from '../../../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';



const AdminStudents = ({ students }) => {
    const navigate = useNavigate();

    return (
        <div>

            <Container className="mt-4">
                <section className="my-4">
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

                                            {
                                                // If the student has grade property then he has graduated
                                                student?.grade
                                                &&
                                                <button data-toggle="tooltip" data-placement="top" title="Alumni" type="button" className="btn btn-success btn-circle btn-lg ms-auto">
                                                    <FontAwesomeIcon icon={faGraduationCap} />
                                                </button>
                                            }


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