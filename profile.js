import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Redirect if not logged in
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    console.log("✅ Logged in:", user.email);

    // Load profile if exists
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("name").value = data.name || "";
      document.getElementById("role").value = data.role || "student";
      document.getElementById("subject").value = data.subject || "";
      document.getElementById("bio").value = data.bio || "";
    }
  }
});

// Save profile
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Not logged in!");

  const profileData = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    subject: document.getElementById("subject").value,
    bio: document.getElementById("bio").value,
    email: user.email
  };

  try {
    await setDoc(doc(db, "users", user.uid), profileData);
    alert("✅ Profile saved!");
  } catch (error) {
    console.error("❌ Error saving profile:", error);
    alert("Error saving profile. Check console.");
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
