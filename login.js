// login.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Handle login form submit
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("✅ Login successful:", userCredential.user.email);

      // Redirect user to profile page after login
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error("❌ Login failed:", error.message);
      alert("Login failed: " + error.message);
    });
});
