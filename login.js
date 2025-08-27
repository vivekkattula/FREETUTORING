// login.js
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Handle login form submit
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ Logged in:", user.uid);

      // Fetch user details from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Login successful! Redirecting...");

        // Redirect to profile page
        window.location.href = "profile.html";
      } else {
        alert("⚠️ No user profile found in database.");
      }

    } catch (error) {
      console.error("❌ Login Error:", error.message);
      alert("Login failed: " + error.message);
    }
  });
}
