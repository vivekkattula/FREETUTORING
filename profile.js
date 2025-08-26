// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ✅ Firebase config (same as your firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.appspot.com",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM Elements
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const profilePic = document.getElementById("profilePic");
const uploadPhotoInput = document.getElementById("uploadPhoto");

// ✅ Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      userName.textContent = data.name || "No Name";
      userEmail.textContent = data.email || user.email;
      userRole.textContent = data.role || "student";

      // Load profile picture if exists
      if (data.photoURL) {
        profilePic.src = data.photoURL;
      }
    } else {
      // Create empty profile if not exists
      await setDoc(userRef, {
        email: user.email,
        name: "",
        role: "student",
        bio: "",
        photoURL: ""
      });
    }
  } else {
    window.location.href = "login.html";
  }
});

// ✅ Upload Profile Picture
window.uploadProfilePic = async function () {
  const user = auth.currentUser;
  if (!user) return alert("Please login first.");

  const file = uploadPhotoInput.files[0];
  if (!file) return alert("Please select a photo to upload.");

  const storageRef = ref(storage, `profilePics/${user.uid}`);
  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  // Update Firestore with photo URL
  await updateDoc(doc(db, "users", user.uid), {
    photoURL: downloadURL
  });

  profilePic.src = downloadURL;
  alert("✅ Profile photo updated successfully!");
};

// ✅ Logout
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
