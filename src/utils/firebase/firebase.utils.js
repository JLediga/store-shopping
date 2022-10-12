// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithRedirect,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore,doc,getDoc, setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcY1DlZ6MEyEhqZJl9OrDKjOhoBBtHblc",
  authDomain: "store-shopping-db.firebaseapp.com",
  projectId: "store-shopping-db",
  storageBucket: "store-shopping-db.appspot.com",
  messagingSenderId: "891038381964",
  appId: "1:891038381964:web:f2a293456feec9e06508a9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup =() => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect =() => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) =>{
  if(!userAuth) return;

  const userDocRef = doc(db , 'user', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef , { displayName,email, createdAt, additionalInformation, });

    }catch (error){


    }
  }
  return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)


}