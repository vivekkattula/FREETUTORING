// login.js
import { auth } from "./firebase.js";
import { 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Redirect already logged-in users directly to profile
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Already logged in, redirecting to profile...");
    window.location.href = "profile.html";
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Logged in:", userCredential.user);

    // Redirect after login
    window.location.href = "profile.html";
  } catch (error) {
    console.error("❌ Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
});
