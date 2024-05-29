import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signUpUser = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) return true;
  } catch (error) {
    // TODO: add error handling
    console.log(error.code);
    console.log(error.message);
    return false;
  }
};

export const logOutUser = () => {
  signOut(auth);
  location.reload();
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Check if user exists in the database
    const userDoc = doc(db, "user", user.uid);
    const userSnap = await getDoc(userDoc);

    // If user does not exist, create a new user
    if (!userSnap.exists()) {
      await setDoc(userDoc, {
        allMistakes: [],
        pageMistakes: [],
      });
    }
    // TODO: check if this works correctly
    return true;
  } catch (error) {
    // TODO: add error handling
    console.log(error.code);
    console.log(error.message);
    return false;
  }
};

export const authListener = (callback: (user: { uid: string }) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};
