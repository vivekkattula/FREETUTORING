// Firebase
const auth = firebase.auth();
const storage = firebase.storage();

auth.onAuthStateChanged((user) => {
  const navLinks = document.getElementById("navLinks");
  const profileDropdown = document.getElementById("profileDropdown");
  const profilePic = document.getElementById("profilePic");
  const logoutBtn = document.getElementById("logoutBtn");
  const changePhoto = document.getElementById("changePhoto");
  const uploadPhoto = document.getElementById("uploadPhoto");

  if (user) {
    // Logged in
    navLinks.innerHTML = "";
    profileDropdown.style.display = "block";

    // Profile picture
    profilePic.src = user.photoURL || "default-avatar.png";

    // Toggle dropdown
    profilePic.onclick = () => {
      profileDropdown.classList.toggle("active");
    };

    // Upload new photo
    changePhoto.addEventListener("click", () => {
      uploadPhoto.click();
    });

    uploadPhoto.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const storageRef = storage.ref(`profilePictures/${user.uid}`);
      await storageRef.put(file);
      const photoURL = await storageRef.getDownloadURL();

      await user.updateProfile({ photoURL });
      profilePic.src = photoURL;
      alert("Profile picture updated!");
    });

    // Logout
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        window.location.href = "login.html";
      });
    });
  } else {
    // Not logged in
    navLinks.innerHTML = `
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">Register</a></li>
    `;
    profileDropdown.style.display = "none";
  }
});
