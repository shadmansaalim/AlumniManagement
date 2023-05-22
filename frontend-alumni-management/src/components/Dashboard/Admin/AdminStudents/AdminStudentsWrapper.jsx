import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

import axios from '../../../../axios/axios';

import AdminStudents from './AdminStudents';



const AdminStudentsWrapper = () => {
    const [students, setStudents] = useState([]);
    const [data, setData] = useState("everyone");

    useEffect(() => {
        const API = `https://alumni-management-ryp1.onrender.com/api/v1/students?data=${data}`;
        axios.get(API).then(res => {
            if (res.data) {
                setStudents(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [data])

    const handleSelect = (e) => {
        setData(e === 'first' ? 'everyone' : 'alumni');
    }


    return (
        <Tab.Container defaultActiveKey="first" onSelect={handleSelect}>
            <Nav className="mt-3 ms-3" variant="pills">
                <Nav.Item>
                    <Nav.Link eventKey="first">Show Everyone  <FontAwesomeIcon className="ms-2" icon={faUser} /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second">   Show Alumnis Only   <FontAwesomeIcon className="ms-2" icon={faGraduationCap} /></Nav.Link>
                </Nav.Item>
            </Nav>

            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <AdminStudents students={students} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    <AdminStudents students={students} />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
};

export default AdminStudentsWrapper;