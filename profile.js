// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Your Firebase configuration (copied from your console)
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.firebasestorage.app",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// UI elements
const profilePic = document.getElementById("profilePic");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const profileEmail = document.getElementById("profileEmail");

// Tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    tabContents.forEach(c => {
      c.classList.remove("active");
      if (c.id === target) c.classList.add("active");
    });
  });
});

// Auth check
onAuthStateChanged(auth, async (user) => {
  if (user) {
    profileEmail.textContent = user.email;

    const docRef = doc(db, "profiles", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      profileName.textContent = data.name || "No Name";
      profileRole.textContent = data.role || "student";
      if (data.photoURL) profilePic.src = data.photoURL;
    } else {
      profileName.textContent = user.displayName || "New User";
      profileRole.textContent = "student";
    }
  } else {
    window.location.href = "login.html";
  }
});

// Upload photo (Base64 stored in Firestore)
uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Please choose a file first.");

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result;

    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "profiles", user.uid), {
      photoURL: base64,
    }, { merge: true });

    profilePic.src = base64;
    alert("Profile picture updated!");
  };
  reader.readAsDataURL(file);
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => signOut(auth));
document.getElementById("logoutBtn2").addEventListener("click", () => signOut(auth));
