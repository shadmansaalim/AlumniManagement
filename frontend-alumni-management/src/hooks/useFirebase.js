import { useState, useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


initializeAuthentication();
toast.configure()

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();


    const registerUser = (name, email, password, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                //Add user to db
                saveUserToDb(email, name, 'POST');

                // Send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    swal("Account Created Successfully!", "You are now part of the RMIT Grad Network", "success");
                    setIsLoading(false);
                    navigate('/');

                })
            })
            .catch((error) => {
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    swal("Invalid!", "An account already exists with this email'", "error");
                }
                if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    swal("Invalid!", "Password should be at least 6 characters", "error");
                }
            })
    }

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                fetch(`http://localhost:3000/users?email=${user.email}`)
                    .then(res => res.json())
                    .then((data) => setUser(data))
                    .finally(() => {
                        getIdToken(user)
                            .then(token => {
                                localStorage.setItem('token', token);
                                setIsLoading(false);
                            })
                    });

            } else {
                setUser({});
                setIsLoading(false);
            }

        });
    }, [auth, user.email])

    const signInWithGoogle = (navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                //Add user to db
                saveUserToDb(user.email, user.displayName, 'PUT');


                toast.success(`Welcome back ${auth.currentUser.displayName.split(' ')[0]}`)
            }).catch((error) => {
                if (error.message == 'Firebase: Error (auth/account-exists-with-different-credential).') {
                    swal("Invalid!", "An account already exists with this email'", "error");
                }
            })
            .finally(() => {
                setIsLoading(false);
                navigate('/');
            });
    }


    const loginUser = (email, password, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success(`Welcome back ${auth.currentUser.displayName.split(' ')[0]}`)
            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    swal("Invalid Password!", "Please check your email & password and then try again", "error");
                }
                else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    swal("User Not Found!", "Please check your email & password and then try again", "warning");
                }
            })
            .finally(() => {
                setIsLoading(false);
                navigate('/');
            });
    }
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }



    //Function to add users to database MONGO DB Backend
    const saveUserToDb = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:3000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    return {
        user,
        isLoading,
        setIsLoading,
        registerUser,
        signInWithGoogle,
        loginUser,
        logOut
    }

}


export default useFirebase;