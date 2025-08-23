// register.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.firebasestorage.app",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form handling
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save extra user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      role,
      name,
      email
    });

    alert("✅ Registration successful! Redirecting to login...");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});
