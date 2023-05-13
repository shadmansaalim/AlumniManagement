import { useState, useEffect } from "react";
import { saveUser, getUser, removeUser, saveToken } from "./LocalStorage";
import swal from "sweetalert";
import axios from '../axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation library
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    UCN: Joi.number().min(5).required(),
    role: Joi.string().required()
});

toast.configure()

const useDb = () => {

    // Current user states
    const [currentUser, setCurrentUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (username) => {
        try {
            const user = await userExists(username);
            setCurrentUser(user);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Keeping the user stored even after reload
    useEffect(() => {
        const username = getUser();
        if (username !== null) {
            fetchUser(username);
        } else {
            setIsLoading(false);
        }
    }, []);

    // Function to check whether user exists in DB or NOT
    const userExists = async (username) => {
        const API = `http://localhost:3000/api/v1/users?username=${username}`;
        try {
            const res = await axios.get(API);
            return res.data;
        } catch(err) {
            console.log(err);
            return null;
        }
    };


    const validateUser = (user) => {
        const { error } = userSchema.validate(user);
        if (error) {
            throw new Error(error.details[0].message);
        }
    };


    // Function to register user in backend
    const registerUser = async (firstName, lastName, username, password, navigate, isAdmin = false) => {
        const API = `http://localhost:3000/api/v1/users/generate-ucn`;
        let UCN = null;
        try {
            const res = await axios.get(API);
            UCN = res.data.data;
        } catch (err) {
            console.log(err);
        }

        // Getting the role
        const role = isAdmin ? "admin" : "user";

        try {
            // Validating user input
            validateUser({ username, password, firstName, lastName, UCN, role });


            // Checking whether user exists or not
            const exists = await userExists(username);

            if (exists) {
                swal("User Already Exists", "An user already exists with this username", "warning");
            }
            else {
                // Creating the user
                const user = {
                    username,
                    password,
                    firstName,
                    lastName,
                    UCN,
                    role
                }
                axios.post('http://localhost:3000/api/v1/users/create-user', JSON.stringify(user), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(res => {
                    if (res.data) {
                        setCurrentUser(res.data.data);
                        saveUser(username);
                        navigate("/dashboard");
                        swal("Account Created Successfully!", `Hey ${firstName}, You are now part of the RMIT Grad Network`, "success");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }

        } catch (error) {
            swal("Invalid Input", error.message, "warning");
        }

    }

    // Function to login user
    const loginUser = async (username, password, navigate) => {
        // Checking whether user exists or not
        const exists = await userExists(username);

        // If exists then calling the LOGIN API and checking username and password matches or not
        if (exists) {
            const API = `http://localhost:3000/api/v1/users/login?username=${username}&password=${password}`;
            axios.get(API).then(res => {
                if (res.data) {
                    const { token, data } = res.data;
                    setCurrentUser(data);
                    saveToken(token);
                    saveUser(username);
                    navigate("/dashboard");
                    toast.success(`Welcome back ${data.firstName}`);
                } else {
                    swal("Invalid Username/Password", "Please try again", "warning");
                }
            }).catch(err => {
                console.log(err);
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