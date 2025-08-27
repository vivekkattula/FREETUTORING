import { auth, db } from .firebase-config.js;
import { onAuthStateChanged, signOut } from httpswww.gstatic.comfirebasejs10.12.2firebase-auth.js;
import { doc, getDoc, collection, getDocs, addDoc } from httpswww.gstatic.comfirebasejs10.12.2firebase-firestore.js;

 🔹 Load user data
onAuthStateChanged(auth, async (user) = {
  if (user) {
    document.getElementById(studentEmail).textContent = user.email;

     Load profile
    const userRef = doc(db, users, user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      document.getElementById(studentName).textContent = data.name  Student;
      if (data.photoURL) {
        document.getElementById(profilePic).src = data.photoURL;
      }
    }

     Load tutors
    const tutorsRef = collection(db, tutors);
    const tutorsSnap = await getDocs(tutorsRef);
    let tutorList = ;
    tutorsSnap.forEach(doc = {
      const t = doc.data();
      tutorList += `li${t.name} - ${t.subject}li`;
    });
    document.getElementById(tutorsList).innerHTML = tutorList  liNo tutors yetli;
  } else {
    window.location.href = login.html;  redirect if not logged in
  }
});

 🔹 Request Tutor (demo version)
async function requestTutor() {
  const user = auth.currentUser;
  if (!user) return alert(Please login);

  const requestRef = collection(db, requests);
  await addDoc(requestRef, {
    studentId user.uid,
    timestamp new Date(),
    status pending
  });

  alert(Tutor request sent ✅);
  location.reload();
}
window.requestTutor = requestTutor;

 🔹 Logout
function logout() {
  signOut(auth).then(() = {
    window.location.href = login.html;
  });
}
window.logout = logout;
