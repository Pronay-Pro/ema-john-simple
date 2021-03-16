import React, { useContext } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLogInFrameWorker, signInWithEmailAndPassword } from "./loginManager";

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
// }
function LogIn() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        phone: "",
        password: "",
        success: false,
    });
    initializeLogInFrameWorker()
    const [logInUser, setLogInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const googleSignIn = ()=>{
        handleGoogleSignIn()
        .then(res =>{
            handleResponse(res,true)
        })
    }
    const googleSignOut = ()=>{
       handleSignOut()
        .then(res =>{
            handleResponse(res,false)
        })
    }

    const handleResponse =(res,redirect)=>{
        setUser(res)
        setLogInUser(res)
        if(redirect){
            history.replace(from);
        }
    }

    // const handleGoogleSignIn = () => {
    //     firebase
    //         .auth()
    //         .signInWithPopup(provider)
    //         .then((results) => {
    //             const { displayName, email, photoURL } = results.user;
    //             const signInUser = {
    //                 isSignedIn: true,
    //                 name: displayName,
    //                 email: email,
    //                 photoURL: photoURL,
    //             };
    //             setUser(signInUser);
    //             setLogInUser(signInUser);
    //             history.replace(from);
    //             console.log(displayName, email, photoURL);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             console.log(err.message);
    //         });
    // };
    // const handleSignOut = () => {
    //     firebase
    //         .auth()
    //         .signOut()
    //         .then((res) => {
    //             const signOut = {
    //                 isSignedIn: false,
    //                 name: "",
    //                 email: "",
    //                 photoURL: "",
    //             };
    //             setUser(signOut);
    //             console.log(res);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const handleChange = (event) => {
        let isFormValid = true;
        if (event.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 8;
            const hasPassword = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && hasPassword;
        }
        if (event.target.name === "name") {
            const isNameValid = /^[A-Za-z\'\s\.\,]+$/.test(event.target.value);
            isFormValid = isNameValid;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res =>{
                handleResponse(res,true)
            })

            // firebase.auth()
            //     .createUserWithEmailAndPassword(user.email, user.password)
            //     .then((res) => {
            //         // Signed in
            //         const userInfo = { ...user};
            //         userInfo.error = "";
            //         userInfo.success = true;
            //         setUser(userInfo);
            //         updateUserName(user.names);
            //         console.log(res.user)
            //         // ...
            //     })
            //     .catch((error) => {
            //         const userInfo = {...user};
            //         userInfo.error = error.message;
            //         userInfo.success = false;
            //         setUser(userInfo);
            //         // var errorMessage = error.message;
            //         // console.log(errorCode,errorMessage)
            //     });
        }
            if (!newUser && user.email && user.password) {
                signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res,true)
                })
                // firebase
                //     .auth()
                //     .signInWithEmailAndPassword(user.email, user.password)
                //     .then((res) => {
                //         // Signed in
                //         const newUserInfo = {...user};
                //         newUserInfo.error = "";
                //         newUserInfo.success = true;
                //         setUser(newUserInfo);
                //         setLogInUser(newUserInfo);
                //         history.replace(from);
                //         console.log(res.user)
                //     })
                //     .catch((error) => {
                //         const userInfo = {...user};
                //         userInfo.error = error.message;
                //         userInfo.success = false;
                //         setUser(userInfo);
                //        console.log(error.message)
                //     });
            }
        
        event.preventDefault();
    };

    // const updateUserName = (names) => {
    //     const user = firebase.auth().currentUser;

    //     user
    //         .updateProfile({
    //             displayName: names,
                
    //         })
    //         .then((res) => {
    //             console.log("Update successful");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    return (
        <div className="App">
            {user.isSignedIn ? (
                <button onClick={googleSignOut}>Sign Out</button>
            ) : (
                <button onClick={googleSignIn}>Sign In</button>
            )}
            <br />
            <br />
            <button>LogIn With Facebook</button>
            {user.isSignedIn && (
                <div>
                    <h1> Welcome,{user.name}</h1>
                    <h4> Email :{user.email}</h4>
                    <img src={user.photoURL} alt="" />
                </div>
            )}
            <br />
            <br />
            <div>
                {/* <p>Name :{user.name}</p>
       <p>Email : {user.email}</p>
       <p>Password : {user.password}</p> */}
                <input
                    type="checkbox"
                    onChange={() => setNewUser(!newUser)}
                    name=""
                    id=""
                />
                <label htmlFor="newUser">New User Sign In</label>
                <br />
                <form action="" onSubmit={handleSubmit}>
                    {newUser && (
                        <input
                            type="text"
                            name="name"
                            onBlur={handleChange}
                            placeholder="Enter Your Name"
                            required
                            id=""
                        />
                    )}
                    <br />
                    <input
                        type="email"
                        name="email"
                        onBlur={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        onBlur={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <br />
                    <input type="submit" value={newUser ? "Sign IN" : "Sign Up"} />
                </form>
                <h1 style={{ color: "red" }}>{user.error}</h1>
                {user.success && (
                    <h1 style={{ color: "green" }}>
                        You Account Is {newUser ? "Created" : "LogIn"}
                    </h1>
                )}
            </div>
        </div>
    );
}

export default LogIn;
