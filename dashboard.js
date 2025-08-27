// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your Firebase config (replace with your project details)
const firebaseConfig = {
  apiKey: "AIzaSyBAB1RatL7MlFxCKIDM6y10mArNOsH4_v8",
  authDomain: "freetutoring-4d649.firebaseapp.com",
  projectId: "freetutoring-4d649",
  storageBucket: "freetutoring-4d649.firebasestorage.app",
  messagingSenderId: "874862317947",
  appId: "1:874862317947:web:3dd0190bb074729466edde",
  measurementId: "G-4H92BXM3PC"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check user auth
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Load profile
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      document.getElementById("profileName").textContent = data.name || "No Name";
      document.getElementById("profileEmail").textContent = user.email;
      document.getElementById("profileAddress").textContent = data.address || "Not provided";
      document.getElementById("profileStatus").textContent = data.status || "Pending Review";
      if (data.photoURL) {
        document.getElementById("profilePhoto").src = data.photoURL;
      }
    }

    // Load class requests
    const requestsSnapshot = await getDocs(collection(db, "classRequests"));
    const requestsList = document.getElementById("classRequestsList");
    requestsList.innerHTML = "";
    if (requestsSnapshot.empty) {
      requestsList.innerHTML = "<li>No requests yet</li>";
    } else {
      requestsSnapshot.forEach(doc => {
        const req = doc.data();
        const li = document.createElement("li");
        li.textContent = `${req.studentName} requested ${req.subject}`;
        requestsList.appendChild(li);
      });
    }

    // Load messages
    const messagesSnapshot = await getDocs(collection(db, "messages"));
    const messagesList = document.getElementById("messagesList");
    messagesList.innerHTML = "";
    if (messagesSnapshot.empty) {
      messagesList.innerHTML = "<li>No messages yet</li>";
    } else {
      messagesSnapshot.forEach(doc => {
        const msg = doc.data();
        const li = document.createElement("li");
        li.textContent = `${msg.from}: ${msg.text}`;
        messagesList.appendChild(li);
      });
    }

  } else {
    // Redirect to login if not logged in
    window.location.href = "login.html";
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
