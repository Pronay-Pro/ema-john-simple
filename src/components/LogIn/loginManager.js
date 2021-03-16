import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initializeLogInFrameWorker = () =>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
    .then((results) => {
            const { displayName, email, photoURL } = results.user;
            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success : true,
            };
            return signInUser;
            // console.log(displayName, email, photoURL);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
};
export const handleSignOut = () => {
   return firebase.auth().signOut()
        .then((res) => {
            const signOut = {
                isSignedIn: false,
                name: "",
                email: "",
                photoURL: "",
                success : false,
            };
            return signOut;
            // console.log(res);
        })
        .catch((error) => {
            // console.log(error);
        });
};
export const createUserWithEmailAndPassword =(name ,email ,password)=> {
   return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
        // Signed in
        const userInfo = res.user;
        userInfo.error = "";
        userInfo.success = true;
        updateUserName(name);
        return userInfo;
        // ...
    })
    .catch((error) => {
        const userInfo = {};
        userInfo.error = error.message;
        userInfo.success = false;
        return userInfo;
        // var errorMessage = error.message;
        // console.log(errorCode,errorMessage)
    });
}
 export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {
        // Signed in
        const newUserInfo =res.user;
        newUserInfo.error = "";
        newUserInfo.success = true;
        return newUserInfo;
        // console.log(res.user)
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
 }
 const updateUserName = (names) => {
    const user = firebase.auth().currentUser;

    user
        .updateProfile({
            displayName: names,
            
        })
        .then((res) => {
            console.log("Update successful");
        })
        .catch((error) => {
            console.log(error);
        });
};