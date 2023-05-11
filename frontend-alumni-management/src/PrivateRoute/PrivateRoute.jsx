import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { currentUser, isLoading } = useAuth();
    let location = useLocation();

    if (isLoading) {
        // Loading spinner
        return (
            <div className="spinner d-flex align-items-center justify-content-center">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        )
    }
    else {
        if (currentUser?.email) {
            return children;
        }
        else {
            return <Navigate to="/login" state={{ from: location }} />

        }
    }
};

export default PrivateRoute;