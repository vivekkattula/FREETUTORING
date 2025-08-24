// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.firebasestorage.app",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase initialized successfully");

// ------------------ REGISTER USER ------------------
async function registerUser(role, name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      role: role,
      name: name,
      email: email,
      isSubscribed: false,   // default: not subscribed
      expiryDate: null       // default: no expiry
    });

    alert("✅ Registration successful! Please login.");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
}

// ------------------ LOGIN USER ------------------
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    window.location.href = "dashboard.html";  // redirect after login
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
}

// Export functions for register.html & login.html
export { auth, db, registerUser, loginUser };
