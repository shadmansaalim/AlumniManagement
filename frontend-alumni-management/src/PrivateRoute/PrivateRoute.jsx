import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const hasAccess = (userRole, allowedRoles) => {
    return allowedRoles?.includes(userRole);
}

const PrivateRoute = ({ userRequired, children, roles }) => {
    const { currentUser, isLoading, logout } = useAuth();
    let location = useLocation();

    useEffect(() => {
        async function checkAccess() {
            if (currentUser && !hasAccess(currentUser?.role, roles)) {
                await logout();
            }
        }
        checkAccess()
    }, [])

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
            if (currentUser?.username) {
                // Checking access for the routes
                if (hasAccess(currentUser.role, roles)) {
                    return children;
                }
                return <Navigate to="/login" state={{ from: location }} />
            }
            else {
                return <Navigate to="/login" state={{ from: location }} />

            }
        }
        // Hiding Login & Signup page for authenticated people
        else {
            if (currentUser?.username) {
                return <Navigate to="/" state={{ from: location }} />
            }
            else {
                return children;
            }
        }
    }
};

export default PrivateRoute;