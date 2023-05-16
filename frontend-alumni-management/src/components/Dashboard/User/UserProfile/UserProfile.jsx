import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Container } from 'react-bootstrap';
import profile from '../../../../assets/profile.png';

const UserProfile = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    const { username, firstName, lastName, degree, graduationYear, gpa, grade } = currentUser;

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <div className="mx-auto col-12 col-lg-9 profile-wrapper">
                    <img src={profile} alt="" width="80px" height="80px" />

                    <div className="mt-2">
                        <span>Username : {username}</span>
                    </div>
                    <div className="mt-3 text-start">
                        <div className="row">
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">First Name</div>
                                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{firstName}</span>
                            </div>
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Last Name</div>
                                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">{lastName}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Degree</div>
                                <span className="rounded-3 w-100 user-details d-flex align-items-center">{degree}</span>
                            </div>
                            <div className="col-xl-6 mb-4">
                                <div className="mb-2">Graduation Year</div>
                                <span className="rounded-3 w-100 user-details d-flex align-items-center">{graduationYear}</span>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2"> Semester Results</div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 1</span>
                                <span>GPA {gpa?.sem1}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 2</span>
                                <span>GPA {gpa?.sem2}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 3</span>
                                <span>GPA {gpa?.sem3}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 4</span>
                                <span>GPA {gpa?.sem4}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 5</span>
                                <span>GPA {gpa?.sem5}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Semester 6</span>
                                <span>GPA {gpa?.sem6}</span>
                            </div>
                            <div className="rounded-3 w-100 user-details d-flex align-items-center justify-content-between mb-1">
                                <span>Final Overall Grade</span>
                                <span className="fw-bold text-success">{grade}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default UserProfile;