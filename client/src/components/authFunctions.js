// In authFunctions.js
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth"
  
// Sign Up
const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(email, password);
};

// Sign In
const signIn = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password);
};

// Sign Out
const signOut = async () => {
  await auth.signOut();
};

// export
export { signUp, signIn, signOut };
