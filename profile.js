// profile.js
import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Reference to form
const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");

// Load user profile when logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("✅ Logged in as:", user.email);

    // Check if profile already exists
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      nameInput.value = data.name || "";
      roleInput.value = data.role || "";
      bioInput.value = data.bio || "";
    }
  } else {
    // Redirect if not logged in
    window.location.href = "login.html";
  }
});

// Save profile data
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("You must be logged in!");

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: nameInput.value,
    role: roleInput.value,
    bio: bioInput.value,
    email: user.email
  });

  alert("✅ Profile saved successfully!");
});
