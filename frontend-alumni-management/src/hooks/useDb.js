import { useState, useEffect, useRef } from "react";
import { saveUser, getUser, removeUser, } from "./LocalStorage";
import swal from "sweetalert";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const useDb = () => {

    // Current user states
    const [currentUser, setCurrentUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (email) => {
        try {
            const user = await userExists(email);
            setCurrentUser(user);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Keeping the user stored even after reload
    useEffect(() => {
        const email = getUser();
        if (email !== null) {
            fetchUser(email);
        } else {
            setIsLoading(false);
        }
    }, []);

    // Function to check whether user exists in DB or NOT
    const userExists = async (email) => {
        const API = `http://localhost:3000/users?email=${email}`;
        const res = await fetch(API);
        const user = await res.json();
        return user || null;
    };

    // Function to register user in backend
    const registerUser = async (firstName, lastName, email, password, navigate, isAdmin = false) => {
        // Checking whether user exists or not
        const exists = await userExists(email);
        // Getting the role
        const role = isAdmin ? "admin" : "user";
        if (exists) {
            swal("User Already Exists", "An user already exists with this username", "warning");
        }
        else {
            // Creating the user
            const user = {
                email,
                password,
                firstName,
                lastName,
                role
            }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then((data) => {
                    if (data) {
                        setCurrentUser(data);
                        saveUser(email);
                        navigate("/dashboard");
                        swal("Account Created Successfully!", `Hey ${firstName}, You are now part of the RMIT Grad Network`, "success");
                    }
                })
        }
    }


    // Function to login user
    const loginUser = async (email, password, navigate) => {
        // Checking whether user exists or not
        const exists = await userExists(email);

        // If exists then calling the LOGIN API and checking email and password matches or not
        if (exists) {
            fetch(`http://localhost:3000/users/login?email=${email}&password=${password}`)
                .then(res => res.json())
                .then((data) => {
                    if (data) {
                        setCurrentUser(data);
                        saveUser(email);
                        navigate("/dashboard");
                        toast.success(`Welcome back ${data.firstName}`)
                    }
                    else {
                        swal("Invalid Username/Password", "Please try again", "warning");
                    }
                })
        }
        else {
            swal("Invalid User", "No user exists on this username", "warning");
        }
    }

    // Function to logout current user
    const logout = async () => {
        // Removing the current user from local storage
        removeUser();
        setCurrentUser(null);
    }

    return {
        currentUser,
        isLoading,
        setIsLoading,
        setCurrentUser,
        userExists,
        registerUser,
        loginUser,
        logout
    };
};

export default useDb;