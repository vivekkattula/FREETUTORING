import { auth, db } from "./firebase.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Show user info
auth.onAuthStateChanged(async (user) => {
  if (user) {
    document.getElementById("userEmail").innerText = user.email;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      document.getElementById("userName").innerText = data.name || "No Name";
      document.getElementById("status").innerText = data.status || "Your profile is under review ✅";
    } else {
      document.getElementById("userName").innerText = "New User";
      document.getElementById("status").innerText = "Please complete your profile.";
    }

    // Fetch class requests
    const classRequestsSnap = await getDocs(collection(db, "classRequests"));
    let classRequestsHTML = "";
    classRequestsSnap.forEach((doc) => {
      const req = doc.data();
      classRequestsHTML += `<li>${req.studentName} - ${req.subject} (${req.status})</li>`;
    });
    document.getElementById("classRequests").innerHTML = classRequestsHTML || "<li>No requests yet.</li>";

    // Fetch messages
    const messagesSnap = await getDocs(collection(db, "messages"));
    let messagesHTML = "";
    messagesSnap.forEach((doc) => {
      const msg = doc.data();
      messagesHTML += `<li><b>${msg.from}</b>: ${msg.text}</li>`;
    });
    document.getElementById("messages").innerHTML = messagesHTML || "<li>No messages yet.</li>";
  } else {
    window.location.href = "login.html"; // Redirect if not logged in
  }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});
