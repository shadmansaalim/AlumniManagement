import { useState, useEffect } from "react";
import { saveUser, getUser, removeUser, saveToken } from "./LocalStorage";
import swal from "sweetalert";
import axios from '../axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation library
import Joi from "joi";

const API_URL = 'https://alumni-management-ryp1.onrender.com';

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
        .pattern(new RegExp("(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"))
        .required()
        .messages({
            "string.pattern.base": `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric value, and one special character.`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
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
        const API = `${API_URL}/api/v1/users?username=${username}`;
        try {
            const res = await axios.get(API);
            return res.data;
        } catch (err) {
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

    // Function to check whether student exists with given student username
    const studentExists = async (username) => {
        const API = `${API_URL}/api/v1/students?username=${username}`;
        try {
            const res = await axios.get(API);
            console.log(res)
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const verifyStudent = (firstName, lastName, student, semesterToCheck, userInputGpa) => {
        let result = {
            verified: true
        };
        if (student.firstName !== firstName || student.lastName !== lastName) {
            result.verified = false;
        }
        if (student.gpa[`sem${semesterToCheck}`] !== userInputGpa) {
            result.verified = false;
        }
        if (student.graduationYear >= new Date().getFullYear()) {
            result.verified = false;
        }

        return result;
    }


    // Function to register user in backend
    const registerUser = async (firstName, lastName, username, semesterToCheck, userInputGpa, password, navigate, isAdmin = false) => {

        // Checking whether user exists or not
        const exists = await userExists(username);

        if (exists) {
            swal("User Already Exists", "An user already exists with this username", "warning");
        }
        else {
            const student = await studentExists(username);
            if (student) {
                // Verifying Student
                const studentVerificationResult = verifyStudent(firstName, lastName, student, semesterToCheck, userInputGpa);
                if (studentVerificationResult.verified) {
                    // Getting the role
                    const role = isAdmin ? "admin" : "user";

                    try {
                        // Validating user input
                        validateUser({ username, password, firstName, lastName, role });

                        // Creating the user
                        const user = {
                            username,
                            password,
                            firstName,
                            lastName,
                            role
                        }
                        axios.post(`${API_URL}/api/v1/users/create-user`, JSON.stringify(user), {
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    console.log(res.data.data)
                                    setCurrentUser(res.data.data);
                                    saveUser(username);
                                    navigate("/dashboard");
                                    swal("Account Created Successfully!", `Hey ${firstName}, You are now part of the RMIT Grad Network`, "success");
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });


                    } catch (error) {
                        swal("Invalid Input", error.message, "warning");
                    }
                }
                else {
                    swal("Not Verified", `We couldn't verify you. Please check whether you have provided your first and last name correctly just like your student profile also do check whether you provided semester ${semesterToCheck} GPA correctly. Also please note if you are a current RMIT Student this platform is not for you this is only for RMIT Alumnis. If you pretend to be someone else, RMIT Team will take legal actions.`, "warning");
                }
            }
            else {
                swal("Invalid Student", "No student exists in RMIT with this username", "warning");
            }
        }
    }

    // Function to login user
    const loginUser = async (username, password, navigate) => {
        // Checking whether user exists or not
        const exists = await userExists(username);

        // If exists then calling the LOGIN API and checking username and password matches or not
        if (exists) {
            const API = `${API_URL}/api/v1/users/login?username=${username}&password=${password}`;
            axios.get(API).then(res => {
                if (res.data) {
                    const data = res.data.data;
                    const token = res.data.token;
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