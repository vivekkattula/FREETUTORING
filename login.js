// login.js
import { auth } from "./firebaseConfig.js";
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Handle login form submit
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to dashboard.html after login
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  });
}

// Auto-redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Already logged in → send to dashboard
    window.location.href = "dashboard.html";
  }
});
