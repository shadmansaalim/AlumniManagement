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
import { faHome, faSignOutAlt, faImage, faPen, faTachometerAlt, faBox, faBlog, faBars } from '@fortawesome/free-solid-svg-icons';
import profile from '../../../assets/profile.png';

const Dashboard = () => {
    const [toggled, setToggled] = useState(true);
    const navigate = useNavigate();
    const { user, logOut, isLoading } = useAuth();
    const [offCanvasShow, setOffCanvasShow] = useState(false);
    const handleOffCanvasClose = () => setOffCanvasShow(false);
    const handleOffCanvasShow = () => setOffCanvasShow(true);

    return (
        <div>
            {
                !isLoading
                &&
                <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">

                    <div id="sidebar-wrapper" style={{
                        backgroundColor: 'black'
                    }}>
                        <div className="text-center pt-4 pb-2 border-bottom">

                            <img width="70px" height="70px" className=" img-fluid rounded-circle settings-user-img mb-3" src={
                                user.photoURL
                                    ?
                                    user.photoURL
                                    :
                                    profile
                            } alt=""></img>

                        </div>
                        <div className="list-group list-group-flush my-3 mx-auto">
                            <div>
                                <Link to="/" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >

                                        <span className="col-8 text-start">Home</span>
                                    </Button>
                                </Link>
                                <Link to="/dashboard" className="text-decoration-none"><Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >

                                    <span className="col-8 text-start">Dashboard</span>
                                </Button></Link>

                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >

                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >

                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >

                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <Link to="" className="text-decoration-none">
                                    <Button className="btn btn-success col-10 mb-3 d-flex justify-content-between align-items-center mx-auto" >
                                        <span className="col-8 text-start">
                                            TAB
                                        </span>
                                    </Button>
                                </Link>
                                <button onClick={() => {
                                    logOut();
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
                                ><span className="text-uppercase">{user.displayName?.split(" ")[0]}</span>'s <span className="fw-bold">Dashboard</span></h3>
                            </div>
                        </nav>
                        <div className="container-fluid">
                            {/* <Outlet /> */}
                        </div>
                    </div>
                </div>
            }

        </div>



    );
};

export default Dashboard;
