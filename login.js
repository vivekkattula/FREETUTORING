import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful");

      // Redirect to home page after login
      window.location.href = "home.html";

    } catch (error) {
      console.error("❌ Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  });
}

// Keep user logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    // Already logged in → go directly to home page
    window.location.href = "home.html";
  }
});
