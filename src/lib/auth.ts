import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider } from "./firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";

const handleFbError = (error: FirebaseError) => {
  const errorMap = new Map([
    ["auth/email-already-in-use", "Email already in use"],
    ["Firebase: Error (auth/invalid-email).", "Invalid email"],
    ["Firebase: Error (auth/invalid-password).", "Invalid password"],
    ["Firebase: Error (auth/missing-password).", "Missing password"],
    ["Firebase: Error (auth/weak-password).", "Weak password"],
    ["Firebase: Error (auth/email-already-exists).", "Email already exists"],
    [
      "Firebase: Error (auth/invalid-credential).",
      "Email does not exist, sign up instead",
    ],
  ]);
  const errorMessage = errorMap.get(error.message);
  if (!errorMessage) return error.message;
  return errorMessage;
};
export const signUpUser = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) return true;
  } catch (error) {
    const errorMessage = error as FirebaseError;
    return handleFbError(errorMessage);
  }
};

export const logOutUser = () => {
  signOut(auth);
  location.reload();
};

export const loginWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // console.log(user);
      return true;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
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
  } catch (error: unknown) {
    const errorMessage = error as FirebaseError;
    return handleFbError(errorMessage);
  }
};

export const authListener = (callback: (user: { uid: string }) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      // FIX: fix ts error
      // @ts-ignore
      callback(null);
    }
  });
};
