// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.firebasestorage.app",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    window.location.href = "index.html"; // Redirect to homepage after login
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});
