import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();


    if (isLoading) {
        return (
            <div className="spinner d-flex align-items-center justify-content-center">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        )
    }
    else {
        if (!user.email) {
            return <Navigate to="/login" state={{ from: location }} />
        }
        else {
            return children;
        }
    }
};

export default PrivateRoute;