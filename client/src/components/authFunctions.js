// In authFunctions.js
import { auth } from '../firebaseConfig';
  
// Sign Up
const signUp = async (email, password) => {
  console.log(auth)
  // await auth.createUserWithEmailAndPassword(email, password);
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
