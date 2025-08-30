import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Dropdown toggle
const userMenu = document.querySelector(".user-menu");
const dropdownMenu = document.getElementById("dropdownMenu");

userMenu.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
  if (!userMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// Auth check
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userEmail").textContent = user.email;
    if (user.photoURL) {
      document.getElementById("profilePic").src = user.photoURL;
    }
  } else {
    window.location.href = "login.html"; // Redirect if not logged in
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
