import { useState, useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({})

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();


    const registerUser = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                alert("Account Created!");

            })
            .catch((error) => {

            })
            .finally(() => { });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(token => {
                        localStorage.setItem('token', token)
                    })
            } else {
                setUser({})
            }

        });
    }, [auth, user.email])

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                alert("Logged in successfully");
            }).catch((error) => {
            })
            .finally(() => { });
    }


    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Logged in successfully");
            })
            .catch((error) => {

            })
            .finally(() => { });
    }
    const logOut = () => {
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => { });
    }

    return {
        user,
        registerUser,
        signInWithGoogle,
        loginUser,
        logOut
    }

}


export default useFirebase;