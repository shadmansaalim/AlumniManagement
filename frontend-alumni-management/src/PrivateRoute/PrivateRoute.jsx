import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ userRequired, children }) => {
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
        // Hiding Dashboard
        if (userRequired) {
            if (currentUser?.email) {
                return children;
            }
            else {
                return <Navigate to="/login" state={{ from: location }} />

            }
        }
        // Hiding Login & Signup page for authenticated people
        else {
            if (currentUser?.email) {
                return <Navigate to="/" state={{ from: location }} />
            }
            else {
                return children;
            }
        }
    }
};

export default PrivateRoute;