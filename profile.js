// profile.js
import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");
const saveBtn = document.getElementById("saveProfile");
const logoutBtn = document.getElementById("logout");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      nameInput.value = data.name || "";
      roleInput.value = data.role || "";
      bioInput.value = data.bio || "";
    }
  } else {
    // Redirect to login if not logged in
    window.location.href = "login.html";
  }
});

// Save Profile
saveBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: nameInput.value,
      role: roleInput.value,
      bio: bioInput.value,
      email: user.email
    });
    alert("✅ Profile saved successfully!");
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
