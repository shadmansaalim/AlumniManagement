import React from 'react';
import { useState } from 'react';
import './Dashboard.css';
import {
    Link,
    useNavigate,
    Outlet
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBuildingColumns, faBook, faSuitcase, faSignOutAlt, faCalendarDays, faBell, faFileLines } from '@fortawesome/free-solid-svg-icons';
import profile from '../../../assets/profile.png';

const Dashboard = () => {
    const [toggled, setToggled] = useState(true);
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [offCanvasShow, setOffCanvasShow] = useState(false);
    const handleOffCanvasClose = () => setOffCanvasShow(false);
    const handleOffCanvasShow = () => setOffCanvasShow(true);
    const { role } = currentUser;

    return (
        <div>
            <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">
                <div id="sidebar-wrapper" style={{
                    backgroundColor: 'black'
                }}>
                    <div className="text-center pt-4 pb-2 border-bottom">

                        <img width="70px" height="70px" className=" img-fluid rounded-circle settings-user-img mb-3" src={profile} alt=""></img>

                    </div>
                    <div className="list-group list-group-flush my-3 mx-auto">
                        <div>
                            <Link to="/dashboard" className="text-decoration-none">
                                <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                    <span className="col-3 text-end">
                                        <FontAwesomeIcon icon={faHome} />
                                    </span>
                                    <span className="col-8 text-start">Home</span>
                                </Button>
                            </Link>
                            {role === "admin" && (
                                <Link to="/dashboard/students" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Students
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "admin" && (
                                <Link to="/dashboard/colleges" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faBuildingColumns} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Colleges +
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "admin" && (
                                <Link to="/dashboard/courses" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faBook} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Courses +
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "admin" && (
                                <Link to="/dashboard/manage-job-post" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faSuitcase} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Manage Job Post
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "user" && (
                                <Link to="/dashboard/profile" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Profile
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "user" && (
                                <Link to="/dashboard/certificates" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faFileLines} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Academic Certificates
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            {role === "user" && (
                                <Link to="/dashboard/jobs" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-3 text-end">
                                            <FontAwesomeIcon icon={faSuitcase} />
                                        </span>
                                        <span className="col-8 text-start">
                                            Job Opportunities
                                        </span>
                                    </Button>
                                </Link>
                            )}
                            <Link to="/dashboard/events" className="text-decoration-none">
                                <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                    <span className="col-3 text-end">
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                    </span>
                                    <span className="col-8 text-start">
                                        Events
                                    </span>
                                </Button>
                            </Link>
                            <Link to="/dashboard/announcements" className="text-decoration-none">
                                <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                    <span className="col-3 text-end">
                                        <FontAwesomeIcon icon={faBell} />
                                    </span>
                                    <span className="col-8 text-start">
                                        Announcements
                                    </span>
                                </Button>
                            </Link>
                            <button onClick={() => {
                                logout();
                                handleOffCanvasClose();
                                navigate('/');
                            }} className="btn btn-outline-warning col-10 d-flex justify-content-between align-items-center mx-auto">
                                <span className="col-3 text-end">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </span>
                                <span className="col-8 text-start">Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i onClick={() => setToggled(!toggled)} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"
                                style={{ color: '#006B5A' }}
                            ></i>
                            <h3 className="m-0"
                            ><span>Dashboard for RMIT Alumnis</span></h3>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </div>


        </div>



    );
};

export default Dashboard;

