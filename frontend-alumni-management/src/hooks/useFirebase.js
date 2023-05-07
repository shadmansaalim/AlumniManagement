import { useState, useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

initializeAuthentication();

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
                alert("Account Created!");
            })
            .catch((error) => {

            })
            .finally(() => {
                setIsLoading(false);
                navigate('/');
            });
    }

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(token => {
                        localStorage.setItem('token', token);
                        setIsLoading(false);
                    })
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
                alert("Logged in successfully");
            }).catch((error) => {
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
                alert("Logged in successfully");
            })
            .catch((error) => {

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