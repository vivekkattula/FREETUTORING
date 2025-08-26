// profile.js
import { auth, db } from "./firebase.js";
import { 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase Storage init
const storage = getStorage();

const profileForm = document.getElementById("profileForm");
const logoutBtn = document.getElementById("logoutBtn");
const profilePicInput = document.getElementById("profilePic");
const profilePicPreview = document.getElementById("profilePicPreview");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html"; // redirect if not logged in
    return;
  }

  console.log("✅ Logged in as:", user.email);

  // Load existing profile data
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    document.getElementById("name").value = data.name || "";
    document.getElementById("role").value = data.role || "student";

    if (data.photoURL) {
      profilePicPreview.src = data.photoURL;
    }
  }
});

// Handle profile form save
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Not logged in!");

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;

  let photoURL = "";

  // If new photo selected → upload to Firebase Storage
  if (profilePicInput.files.length > 0) {
    const file = profilePicInput.files[0];
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  // Save in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    role,
    email: user.email,
    photoURL: photoURL || profilePicPreview.src || ""
  });

  alert("✅ Profile saved successfully!");
});

// Show selected picture preview
profilePicInput.addEventListener("change", () => {
  const file = profilePicInput.files[0];
  if (file) {
    profilePicPreview.src = URL.createObjectURL(file);
  }
});

// Handle logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
